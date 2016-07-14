'use strict'
const Tensor = require('./Tensor.js')
const Module = require('./Module.js')
class Tensorify extends Module {
  constructor(){
    super(arguments) 
  }
  updateOutput(input) {
    this.output = input
    if(!input.values){
      this.output = new Tensor(input)
    }
    return this.output
  }


}

module.exports = Tensorify  