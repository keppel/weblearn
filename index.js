const old = require('old')

module.exports = {
  // activations
  ReLU: require('weblearn-layer-relu'),
  Sigmoid: require('weblearn-layer-sigmoid'),

  // simple layers
  Module: old(require('./lib/Module.js')),
  Linear: require('weblearn-layer-linear'),

  // containers
  Container: old(require('./lib/Container.js')),
  Sequential: require('weblearn-container-sequential'),
  
  // criteria
  Criterion: old(require('./lib/Criterion.js')),
  MSECriterion: require('weblearn-criterion-mse'),

  Tensor: require('weblearn-tensor'),

  // convolutions
  TemporalConvolution: old(require('./lib/TemporalConvolution.js'))
}