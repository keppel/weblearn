'use strict'
const Module = require('./Module.js')
const _ = require('lodash')

class Container extends Module {
  constructor(args) {
    super()
    this.modules = []
  }

  add(module) {
    this.modules.push(module)
    return this
  }

  get(index) {
    return this.modules[index]
  }

  size() {
    return this.modules.length
  }

  applyToModules(func) {
    this.modules.forEach((module)=>{
      func(module)
    })
  }

  zeroGradParameters() {
    this.applyToModules(module=>{
      module.zeroGradParameters()
    })
  }

  updateParameters(learningRate) {
    this.applyToModules(module=>{
      module.updateParameters(learningRate)
    })
  }

  training() {
    this.applyToModules(module=>{
      module.training()
    })
    super.training()
  }

  evaluate() {
    this.applyToModules(module=>{
      module.evaluate()
    })
    super.evaluate()
  }

  reset(stdv) {
    this.applyToModules(module=>{
      module.reset(stdv)
    })
  }

  parameters() {
    let weight = []
    let gradWeight = []

    this.modules.forEach((module)=>{
      const params = module.parameters() // {weight, gradWeight, bias, gradBias} 
      if(!params) return false
      if(params.weight){
        weight.push(params.weight)
        gradWeight.push(params.gradWeight)
      }
      if(params.bias){ 
        weight.push(params.bias)
        gradWeight.push(params.gradBias)
      }
    })

    return {weight, gradWeight}
  }
}

module.exports = Container