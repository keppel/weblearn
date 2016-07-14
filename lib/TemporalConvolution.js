'use strict'
const Tensor = require('./Tensor.js')
const Module = require('./Module.js')

class TemporalConvolution extends Module {
  constructor(inputFrameSize, outputFrameSize, kW, dW){
    super()
    dW = dW || 1

    this.inputFrameSize = inputFrameSize
    this.outputFrameSize = outputFrameSize
    this.kW = kW
    this.dW = dW

    this.weight = new Tensor(outputFrameSize, inputFrameSize*kW)
    this.bias = new Tensor(outputFrameSize)
    this.gradWeight = new Tensor(outputFrameSize, inputFrameSize*kW)
    this.gradBias = new Tensor(outputFrameSize)

    this.reset()
  }

  reset(stdv){
    if(stdv){
      stdv = stdv * Math.sqrt(3)
    } else {
      stdv = 1/Math.sqrt(this.kW*this.inputFrameSize)
    }

    this.weight.uniform(-stdv, stdv)
    this.bias.uniform(-stdv, stdv)
  }

  updateOutput(input) {
    // this will update the data in this.output:
    _updateOutput(input, this.output, this.weight, this.bias, 
      this.kW, this.dW, this.inputFrameSize, this.outputFrameSize)

    return this.output
  }

}

function _updateOutput(input, output, weight, bias, kW, dW, inputFrameSize, outputFrameSize) {
  // adapted from THNN's C function for TemporalConvolution.updateOutput

  let dimS = 0 // sequence dimension
  let dimF = 1 // feature dimension

  // check there are either 2 or 3 (for batches) dimensions
  console.assert(input.dim() === 2 || input.dim() === 3, '2d or 3d (batch mode) tensor expected')

  if(input.dim() === 3){
    dimS = 1
    dimF = 2
  }

  console.assert(input.size()[dimF] === inputFrameSize, 'invalid input frame size')
  console.assert(input.size()[dimS] >= kW, 'input sequence smaller than kernel size')

  const outputWindow = new Tensor()
  const inputWindow = new Tensor()

  const nInputFrame = input.size()[dimS]
  const nOutputFrame = (nInputFrame - kW) / dW + 1

  if(input.dim() === 2){
    // this replaced a resize operation
    output = new Tensor(nOutputFrame, outputFrameSize)

    // bias first
    for(let k = 0; k < nOutputFrame; k++){
      // resume here
    }

  }


}

module.exports = TemporalConvolution