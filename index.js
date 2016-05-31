const old = require('old')

module.exports = {
  // activations
  ReLU: old(require('./lib/ReLU.js')),
  Tanh: old(require('./lib/Tanh.js')),
  Sigmoid: old(require('./lib/Sigmoid.js')),

  // simple layers
  Module: old(require('./lib/Module.js')),
  Linear: old(require('./lib/Linear.js')),

  // containers
  Container: old(require('./lib/Container.js')),
  Sequential: old(require('./lib/Container-Sequential.js')),
  
  // criteria
  Criterion: old(require('./lib/Criterion.js')),
  MSECriterion: old(require('./lib/Criterion-MSE.js')),

  Tensor: old(require('./lib/Tensor.js'))
}