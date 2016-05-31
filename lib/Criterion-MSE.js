'use strict'
const Tensor = require('./Tensor.js')
const Criterion = require('./Criterion.js')
const _ = require('lodash')

class MSECriterion extends Criterion {
  constructor(sizeAverage) {
    super()
    this.sizeAverage = typeof sizeAverage === 'undefined' ? true : sizeAverage 
  }

  updateOutput(input, target) {
    let sum = 0
    const i = _.flattenDeep(input.values)
    const t = _.flattenDeep(target.values)

    i.forEach((val, key)=>{
      const diff = i[key] - t[key]
      sum += diff * diff
    })

    if(this.sizeAverage){
      sum /= input.size(0)
    }
    this.output = sum
    return this.output
  }

  updateGradInput(input, target) {
    // note: implement sizeAverage
    const norm = 2
    this.gradInput = new Tensor(input.values.map((v, k)=>{
      return norm * (v - target.values[k])
    }))
    return this.gradInput
  }
}

module.exports = MSECriterion