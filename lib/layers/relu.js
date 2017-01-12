const ops = require('ndarray-ops')
const ndarray = require('ndarray')
const old = require('old')

class ReLU {
  constructor(threshold = 0) {
    this.threshold = threshold
  }

  forward(input) {
    this.output = ndarray(input.data.map(v => Math.max(v, this.threshold)), input.shape)
    return this.output
  }

  backward(gradOutput) {
    this.gradInput = ndarray(gradOutput.data.map((v, k) => {
      return this.output.data[k] > 0 ? v : 0
    }, gradOutput.shape))

    return this.gradInput
  }
}

module.exports = old(ReLU)