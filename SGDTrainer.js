'use strict'
const _ = require('lodash')

class SGDTrainer {
  constructor(args) {
    this.net = args.net
    this.criterion = args.criterion
    this.learningRate = args.learningRate || .01
    this.learningRateDecay = args.learningRateDecay || 0
    this.maxIteration = args.maxIteration || 25
    this.shuffleIndices = typeof args.shuffleIndices === 'undefined' ? true : args.shuffleIndices 
    this.verbose = typeof args.verbose === 'undefined' ? true : args.verbose 
  }

  train(dataset) {
    let iteration = 0
    let currentLearningRate = this.learningRate
    const mod = this.net
    const criterion = this.criterion

    let indices = _.range(dataset.length)
    if(this.shuffleIndices) indices = _.shuffle(indices)
    console.log('# SGD: training')

    while(true) {
      let currentError = 0
      for (let t = 0;t < dataset.length; t++) {
        const example = dataset[indices[t]]
        const input = example[0]
        const target = example[1]
        const error = criterion.forward(mod.forward(input), target)
        currentError += error
        const gradInput = criterion.updateGradInput(mod.output, target)
        mod.updateGradInput(input, gradInput)
        mod.accUpdateGradParameters(input, criterion.gradInput, currentLearningRate)
      }

      currentError /= dataset.length
      if(this.verbose){
        console.log('# current error = ' + currentError)
      }

      iteration++
      currentLearningRate = this.learningRate / (1 + iteration * this.learningRateDecay)
      if(this.maxIteration > 0 && iteration > this.maxIteration){
        console.log('# finished training with error = ' + currentError)
        break
      }
    }
  }
}

module.exports = SGDTrainer