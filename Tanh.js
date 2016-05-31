'use strict'

const Tensor = require('./Tensor.js')
const Module = require('./Module.js')

class Tanh extends Module {
  constructor(args) {
    super()
  }

  updateOutput(input) {
    let output = new Tensor(input.values)
    output.apply((x)=>{
      return 2 / (1 + Math.exp(-2 * x)) - 1
    })
    this.output = output
    return this.output
  }

  updateGradInput(input, gradOutput) {
    this.gradInput = new Tensor(gradOutput.values.map((x, i)=>{
      return 1 - Math.pow(this.output.values[i], 2)
    }))
    return this.gradInput
  }
}

module.exports = Tanh