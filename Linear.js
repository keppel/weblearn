'use strict'
const Tensor = require('./Tensor.js')
const Module = require('./Module.js')

class Linear extends Module {
  constructor(inputSize, outputSize, hasBias){
    super(arguments)
    this.inputSize = inputSize
    this.outputSize = outputSize

    const bias = typeof hasBias === 'undefined' ? true : args.bias 

    this.weight = new Tensor(this.outputSize, this.inputSize)
    this.gradWeight = new Tensor(this.outputSize, this.inputSize)

    if(bias){
      this.bias = new Tensor(this.outputSize)
      this.gradBias = new Tensor(this.outputSize)
    }

    this.reset()
  }

  reset(stdv){
    if(stdv){
      stdv = stdv * Math.sqrt(3)
    } else {
      stdv = 1 / Math.sqrt(this.weight.size(1))
    }
    // reset to random weights
    this.weight.uniform(-stdv, stdv)
    if(this.bias){
      this.bias.uniform(-stdv, stdv)
    }

    return this
  }

  updateOutput(input) {
    if(input.dim() === 1){
      this.output.resizeAs(new Tensor(this.weight.size(0)))
      if(this.bias){
        this.output.copy(this.bias)
      } else{
        this.output.zero()
      }
      this.output.addmv(1, this.weight, input)
    } else {
      // minibatch support
    }
    return this.output
  }

  updateGradInput(input, gradOutput) {
    if(this.gradInput){
      const nElement = this.gradInput.nElement()
      this.gradInput.resizeAs(input)
      if(this.gradInput.nElement() !== nElement){
        this.gradInput.zero()
      }
      if(input.dim() === 1) {
        this.gradInput.addmv(0, 1, this.weight.t(), gradOutput)
      }
      else if(input.dim() === 2) {
        // minibatch support
        throw new Error('minibatches are not yet supported')
      }
      return this.gradInput
    }
  }

  accGradParameters(input, gradOutput, scale) {
    scale = scale || 1
    if(input.dim() === 1){
      this.gradWeight.addr(scale, gradOutput, input)
      if(this.bias){
        this.gradBias.add(scale, gradOutput)
      }
    }
    else if(input.dim() === 2) {
      // support bias
      throw new Error('minibatches not yet supported')
    } else {
      throw new Error('invalid dimensionality')
    }
  }

  clearState() {
    if(this.addBuffer){
      this.addBuffer.set()
    }
    return super.clearState()
  }
}

function updateAddBuffer(self, input) {
  const nframe = input.size(1)
  self.addBuffer = self.addBuffer || input.new()
  if(self.addBuffer.nElement() !== nframe){
    self.addBuffer.resize(nframe).fill(1)
  }
}

module.exports = Linear