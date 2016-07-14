'use strict'
const table = require('text-table')
const _ = require('lodash')

function Tensor() {
  const args = Array.prototype.slice.call(arguments)
  if(args[0] instanceof Array){
    this.values = _.cloneDeep(args[0])
    this.dimensions = getDimensions(this.values)
  } else {
    this.dimensions = args
    this.zero()
  }
}

Tensor.prototype.size = function (dim) {
  if(typeof dim === 'number'){
    const size = this.dimensions[dim]
    if(typeof size !== 'number'){
      throw new Error('Tried to check invalid dimension of tensor')
    }
    return size 
  } else {
    return this.dimensions
  }
}

Tensor.prototype.dim = function () {
  return this.dimensions.length
}

Tensor.prototype.zero = function () {
  this.values = generateMatrix(this.dimensions, ()=> 0)
  return this
}

Tensor.prototype.fill = function (value) {
  this.values = generateMatrix(this.dimensions, ()=> value)
  return this
}

Tensor.prototype.uniform = function (min, max) {
  this.values = generateMatrix(this.dimensions, ()=> Math.random() * (max - min) + min)
  return this
}

Tensor.prototype.nElement = function () {
  let result = 1
  this.dimensions.forEach(v=>result *= v)
  return result
}

Tensor.prototype.new = function () {
  return new Tensor()
}

Tensor.prototype.resize = function () {
  const args = Array.prototype.slice.call(arguments)
  this.dimensions = args
  this.zero()
  this.dimensions = getDimensions(this.values)
  return this
}

Tensor.prototype.resizeAs = function (t) {
  this.dimensions = t.dimensions
  this.zero()
}

Tensor.prototype.select = function (dim, index) {
  
}

Tensor.prototype.apply = function (func) {
  const step = (element) => {
    element.forEach((v, k)=>{
      if(v instanceof Array){
        step(v)
      } else {
        element[k] = func(v)
      }

    })
  }
  step(this.values)
}

Tensor.prototype.print = function (name) {
  const dims = getDimensions(this.values)
  let t
  if(dims.length === 1) {
    // vector
    t = table(this.values.map(v=>[v])) 
  } else if(dims.length === 2) {
    // matrix
    const tableRows = this.values.map(row=>row.map(val=>[val]))
    t = table(tableRows)
  } else {
    return console.log(name + ': ' + JSON.stringify(this.values))
  }
  console.log([t, '['+(name ? name + ': ' : '') + 'Tensor of dimensions (' + this.dimensions.join('x') + ')'+ ']', '\n\n'].join('\n'))
}

Tensor.prototype.transpose = Tensor.prototype.t = function () {
  if(this.dimensions.length === 1){
    this.dimensions[1] = 1
  }
  if(this.dimensions.length > 2) {
    throw new Error('Only a 2d matrix can be transposed')
  } 
  let result = []
 
  for(let i = 0; i < this.dimensions[1]; i++){
    result.push([])
  }
  for (let i = 0; i < this.dimensions[1]; i++) {
    for (let j = 0; j < this.dimensions[0]; j++) {
      result[i][j] = this.values[j] instanceof Array ? this.values[j][i] : this.values[j]
    }
  }
  return new Tensor(result)
}



Tensor.prototype.addmv = function () {
  const args = Array.prototype.slice.call(arguments)
  let beta = 1
  let scalar = 1
  let mat
  let vec2

  if(args.length === 2){
    mat = args[0]
    vec2 = args[1] 
  } 

  if(args.length === 3){
    scalar = args[0]
    mat = args[1]
    vec2 = args[2] 
  } 
  else if(args.length === 4) {
    beta = args[0]
    scalar = args[1]
    mat = args[2]
    vec2 = args[3] 
  }
  if(beta !== 1){
    this.values = this.values.map(v => v*=beta)
  }

  mat.values.forEach((row, rowIndex)=>{
    row.forEach((value, colIndex)=>{
      // use colIndex to figure out which value in the vector to multiply this mat value by
      this.values[rowIndex] += value * vec2.values[colIndex] * scalar
    })
  })

  return this
}

Tensor.prototype.addr = function () {
  const args = Array.prototype.slice.call(arguments)
  let vec1
  let vec2
  let v1 = 1
  let v2 = 1
  if(args.length === 2) {
    vec1 = args[0]
    vec2 = args[1]
  }
  if(args.length === 3) {
    v2 = args[0]
    vec1 = args[1]
    vec2 = args[2]
  }
  if(args.length === 4){
    v1 = args[0]
    v2 = args[1]
    vec1 = args[2]
    vec2 = args[3]
  }


  if(!sameValues(this.dimensions, [vec1.length, vec2.length])) {
    this.resize(vec1.length, vec2.length)
  }
  if(v1 !== 1){
    this.apply(v=>v*v1)
  }
  for (let i = 0; i < vec1.size(0); i++) {
    for (let j = 0; j < vec2.size(0); j++) {
      this.values[i][j] += vec1.values[i] * vec2.values[j] * v2
    } 
  }
}

Tensor.prototype.add = function (scalar, tensor2) {
  tensor2 = tensor2.copy()
  tensor2.apply(x=>scalar*x)
  let t2Values = _.flattenDeep(tensor2.values)
  let i = 0
  this.apply(x=>x+t2Values[i++])
}

Tensor.prototype.csub = function (y) {
  if(typeof y === 'number'){
    this.apply(x=>x - y)
  } else {
    // todo: this can be more efficient, no need to copy array
    const valuesToSubtract = _.flattenDeep(y.values)
    let index = 0
    this.apply(x=>{
      return x - valuesToSubtract[index++]
    })
  }
}

Tensor.prototype.copy = function (tensor) {
  if(!tensor){
    return new Tensor(this.values)
  }
  this.values = _.cloneDeep(tensor.values)
  this.dimensions = _.clone(tensor.dimensions)
  return this
}

function getDimensions(matrix) {
  const dig = (subMatrix, dims)=>{
    if(!(subMatrix instanceof Array)){
      return dims
    } else {
      return dig(subMatrix[0], dims.concat([subMatrix.length]))
    }
  }

  return dig(matrix, [])

}

function generateMatrix(dimensions, generator) {
  const build = (dims)=>{
    if(dims.length > 0){
      const size = dims[0]
      const rest = dims.slice(1)
      let result = []
      for (let i = 0; i < size; i++) {
        result[i] = build(rest)
      }
      return result
    } else {
      return generator() 
    }
  }
  return build(dimensions)
}


function sameValues(a, b) {
  let result = true
  a.forEach((v, k)=>{
    if(v !== b[k]) return false
  })
  return result
}

module.exports = Tensor
