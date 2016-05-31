'use strict'

const Module = require('./Module.js')
const Tensor = require('./Tensor.js')


class ReLU extends Module {
  constructor(args) {
    super()
  }

  updateOutput(input) {
    let output = new Tensor(input.values)
    output.apply((x)=>{
      return Math.max(0, x)
    })
    this.output = output
    return this.output
  }

  updateGradInput(input, gradOutput) {
    this.gradInput = new Tensor(gradOutput.values.map((x, index)=>{
      if(this.output.values[index] > 0){
        return x
      } else {
        return 0
      }
    }))
    return this.gradInput
  }
}

module.exports = ReLU