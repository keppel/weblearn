const ndarray = require('ndarray')
const fill = require('ndarray-fill')
const pack = require('ndarray-pack')
const zeros = require('zeros')
const gaussian = require('gaussian')
const old = require('old')

class Linear {
  constructor(inputSize, outputSize, hasBias = true) {
    this.inputSize = inputSize
    this.outputSize = outputSize
    this.hasBias = hasBias
    this.weight = ndarray([], [outputSize, inputSize])

    let distribution = gaussian(0, 1) // mean 0, variance 1. (standard normal)
    fill(this.weight, () => distribution.ppf(Math.random()) / Math.sqrt(inputSize)) 
    if(hasBias){
      this.bias = fill(ndarray([], [outputSize]), () => 0)
      this.gradBias = zeros([outputSize])
    }

    this.gradWeight = zeros([outputSize, inputSize])
    this.gradInput = zeros([inputSize])

    this.output = fill(ndarray([], [outputSize]), () => 0)
  }

  forward(input) {
    this.input = input
    fill(this.output, ()=>0)
    for(let i = 0; i < this.outputSize; i++){
      let sum = 0
      if(this.hasBias){
        sum = this.bias.get(i)
      }
      for(let j = 0; j < this.inputSize; j++){
        sum += this.weight.get(i, j) * input.get(j)
      }
      this.output.set(i, sum)
    }
    return this.output
  }

  backward(gradOutput) {
    for(let i = 0; i < this.inputSize; i++){
      let gradInputSum = 0
      for(let j = 0; j < this.outputSize; j++) {
        gradInputSum += this.weight.get(j, i) * gradOutput.get(j)
        this.gradWeight.set(j, i, this.gradWeight.get(j, i) + this.input.get(i) * gradOutput.get(j))
        if(this.hasBias){
          this.gradBias.set(j, this.gradBias.get(j) + gradOutput.get(j))
        }
      }
      this.gradInput.set(i, this.gradInput.get(i) + gradInputSum)
    }


    return this.gradInput
  }
}

module.exports = old(Linear)
