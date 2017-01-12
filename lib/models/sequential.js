const old = require('old')
const fill = require('ndarray-fill')
const ndarray = require('ndarray')
const copy = require('../utils/nd-copy.js')
const ProgressBar = require('progress')
const { EventEmitter } = require('events')

class Sequential extends EventEmitter {
  constructor(opts) {
    super()
    this.layers = []
    this.optimizer = opts.optimizer
    this.criterion = opts.loss || opts.criterion
    this.metrics = opts.metrics || []
  }

  forward(input) {
    let currentOutput = input
    for(let i = 0; i < this.layers.length; i++) {
      currentOutput = this.layers[i].forward(currentOutput)
    }
    this.output = currentOutput
    this.emit('forward')
    return copy(currentOutput)
  }

  backward(gradOutput) {
    let currentGradOutput = gradOutput
    let gradWeight = []
    for(let i = this.layers.length - 1; i >= 0; i--){
      const gradInput = this.layers[i].backward(currentGradOutput)
      currentGradOutput = gradInput
    }
    this.emit('backward')
    return currentGradOutput
  }

  update(optimizer) {
    optimizer = optimizer || this.optimizer
    for(let i = 0; i < this.layers.length; i++){
      if(this.layers[i].weight){
        optimizer(this.layers[i].weight, this.layers[i].gradWeight)
        fill(this.layers[i].gradWeight, ()=>0)
      }
      if(this.layers[i].bias){
        optimizer(this.layers[i].bias, this.layers[i].gradBias)
        fill(this.layers[i].gradBias, ()=>0)
      }
      if(this.layers[i].gradInput){
        fill(this.layers[i].gradInput, ()=>0)
      }
    }
    this.emit('update')
  }

  save () {
    return this.layers.map(layer => {
      return {weight: layer.weight, bias: layer.bias}
    }) 
  }

  load(saved) {
    saved.forEach((layer, index) => {
      if(layer.weight) {
        this.layers[index].weight = ndarray(layer.weight.data, layer.weight.shape)
      }
      if(layer.bias) {
        this.layers[index].bias = ndarray(layer.bias.data, layer.bias.shape)
      }
    })
  }

  add(layer) {
    this.layers.push(layer)
    return this
  }

  fit(dataset, opts={}) {
    let barFmtString = '[:bar] (:current/:total) :percent :etas loss: :loss'
    let verbose = opts.verbose || false
    let totalLoss = 0
    let tickCount = 0
    let metricTotals = {}
    
    if(!this.optimizer){
      throw new Error('No optimizer specified')
    }

    if(!this.criterion){
      throw new Error('No loss function supplied')
    }

    let metricNames = this.metrics.map(m => m.name)
    metricNames.forEach(name => barFmtString += ` ${name}: :${name}`)
    // configure epoch totals
    metricNames.forEach(name => metricTotals[name] = 0)

    let bar = new ProgressBar(barFmtString, {total: dataset.length, width: 50})
    dataset.forEach(([x, y]) => {
      let output = this.forward(x)
      let [loss, gradInputs] = this.criterion(output, y)
      this.backward(gradInputs)
      this.update()
      totalLoss += loss
      this.metrics
        .forEach(({measure, name}) => metricTotals[name] += measure(output, y))
      tickCount++

      if(verbose){
        let tickOpts = {}
        this.metrics.forEach(({name})=>
          tickOpts[name] = Number(metricTotals[name] / tickCount).toFixed(8))
        tickOpts.loss = Number(totalLoss / tickCount).toFixed(8)
        bar.tick(tickOpts)
      }
    }) 
    return this
  }

}

module.exports = old(Sequential)