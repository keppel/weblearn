'use strict'

const Container = require('./Container.js')

class Sequential extends Container {
  constructor(args) {
    super(args)
  }

  add(module) {
    if(this.modules.length === 0) {
      this.gradInput = module.gradInput
    }
    this.modules.push(module)
    this.output = module.output
    return this
  }

  updateOutput(input) {
    let currentOutput = input
    this.modules.forEach((module, i)=>{
      currentOutput = module.updateOutput(currentOutput)
    })
    this.output = currentOutput

    return currentOutput
  }

  updateGradInput(input, gradOutput) {
    let currentGradOutput = gradOutput
    let currentModule = this.modules[this.modules.length - 1]
    for (let i = this.modules.length - 2; i >= 0; i--) {
      const previousModule = this.modules[i]
      currentGradOutput = currentModule.updateGradInput(previousModule.output, currentGradOutput)
      currentModule = previousModule
    }
    currentGradOutput = currentModule.updateGradInput(input, currentGradOutput)
    this.gradInput = currentGradOutput
    return currentGradOutput
  }

  accGradParameters(input, gradOutput, scale) {
    scale = scale || 1

    let currentGradOutput = gradOutput
    let currentModule = this.modules[this.modules.length - 1]
    for (let i = this.modules.length - 2; i >= 0; i--) {
      const previousModule = this.modules[i]
      currentModule.accGradParameters(previousModule.output, currentGradOutput, scale)
      currentGradOutput = currentModule.gradInput
      currentModule = previousModule
    }

    currentModule.accGradParameters(input, currentGradOutput, scale)
  }

  backward(input, gradOutput, scale) {
    scale = scale || 1
    let currentGradOutput = gradOutput
    let currentModule = this.modules[this.modules.length - 1]
    for (let i = this.modules.length - 2; i >= 0; i--) {
      const previousModule = this.modules[i]
      currentGradOutput = currentModule.backward(previousModule.output, currentGradOutput, scale)
      currentModule.gradInput = currentGradOutput
      currentModule = previousModule
    }

    currentModule.backward(input, currentGradOutput, scale)
    this.gradInput = currentGradOutput
    return currentGradOutput
  }

  accUpdateGradParameters(input, gradOutput, lr) {
    let currentGradOutput = gradOutput
    let currentModule = this.modules[this.modules.length - 1]

    for (let i = this.modules.length - 2; i >= 0; i--) {
      const previousModule = this.modules[i]
      currentModule.accUpdateGradParameters(previousModule.output, currentGradOutput, lr)
      currentGradOutput = currentModule.gradInput
      currentModule = previousModule
    }
    currentModule.accUpdateGradParameters(input, currentGradOutput, lr)
  }

}
  
module.exports = Sequential