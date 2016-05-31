'use strict'

const Tensor = require('./Tensor.js')
const Module = require('./Module.js')

class Sigmoid extends Module {
  constructor(args) {
    super()
  }

  updateOutput(input) {
    let output = new Tensor(input.values)
    output.apply((x)=>{
      return 1 / (1 + Math.exp(-x))
    })
    this.output = output
    return this.output
  }

  updateGradInput(input, gradOutput) {
    this.gradInput = new Tensor(gradOutput.values.map((x, i)=>{
      return x * (1 - this.output.values[i]) * this.output.values[i] // fix this
    }))
    return this.gradInput
  }
}

module.exports = Sigmoid