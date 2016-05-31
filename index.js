const old = require('old')

module.exports = {
  // activations
  ReLU: old(require('./ReLU.js')),
  Tanh: old(require('./Tanh.js')),
  Sigmoid: old(require('./Sigmoid.js')),

  // simple layers
  Module: old(require('./Module.js')),
  Linear: old(require('./Linear.js')),

  // containers
  Container: old(require('./Container.js')),
  Sequential: old(require('./Container-Sequential.js')),
  
  // criteria
  Criterion: old(require('./Criterion.js')),
  MSECriterion: old(require('./Criterion-MSE.js')),

  Tensor: old(require('./Tensor.js'))
}