'use strict'
const Tensor = require('./Tensor.js')

class Module {
  constructor(args) {
    this.gradInput = new Tensor(1)
    this.gradInput.zero()
    this.output = new Tensor()
  }

  parameters() {
    if(this.weight || this.bias){
      return {
        weight: this.weight,
        bias: this.bias,
        gradWeight: this.gradWeight,
        gradBias: this.gradBias
      }
    } else {
      return false
    }
  }

  updateOutput(input) {
    return this.output
  }

  forward(input) {
    return this.updateOutput(input)
  }

  backward(input, gradOutput, scale) {
    scale = scale || 1
    this.updateGradInput(input, gradOutput)
    this.accGradParameters(input, gradOutput, scale)
    return this.gradInput
  }

  backwardUpdate(input, gradOutput, lr) {
    this.updateGradInput(input, gradOutput) 
    this.accUpdateGradParameters(input, gradOutput, lr)
    return this.gradInput
  }

  updateGradInput(input, gradOutput) {
    return this.gradInput
  }

  accGradParameters(input, gradOutput, scale) {

  }
  
  accUpdateGradParameters(input, gradOutput, lr) {
   const gradWeight = this.gradWeight
   const gradBias = this.gradBias
   this.gradWeight = this.weight
   this.gradBias = this.bias
   this.accGradParameters(input, gradOutput, -lr)
   this.gradWeight = gradWeight
   this.gradBias = gradBias
  }

  sharedAccUpdateGradParameters(input, gradOutput, lr) {
    if(this.parameters()){
      this.zeroGradParameters()
      this.accGradParameters(input, gradOutput, 1)
      this.updateParameters(lr)
    }
  }

  zeroGradParameters() {
    const params = this.parameters()
    if(!params) return false
    if(params.gradWeight) {
      this.gradWeight.zero()
    }
    if(params.gradBias){
      this.gradBias.zero()
    }
  }
  
  updateParameters(learningRate) {
    if(this.weight){
      this.weight.add(-learningRate, this.gradWeight)
    }
    if(this.bias){
      this.bias.add(-learningRate, this.gradBias)
    }
  }

  training() {
    this.train = true
  }

  evaluate() {
    this.train = false
  }

}

module.exports = Module