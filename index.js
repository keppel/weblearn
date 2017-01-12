module.exports = {
  // layers
  Linear: require('./lib/layers/linear.js'),
  ReLU: require('./lib/layers/relu.js'),

  // loss functions
  MSE: require('./lib/losses/mse.js'),

  // optimizers
  SGD: require('./lib/optimizers/sgd.js'),
  RMSProp: require('./lib/optimizers/rmsprop.js'),

  // models
  Sequential: require('./lib/models/sequential.js'),

  // metrics
  CategoricalAccuracy: require('./lib/metrics/categorical-accuracy.js')
}