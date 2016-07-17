module.exports = {
  // layers
  Linear: require('weblearn-layer-linear'),
  ReLU: require('weblearn-layer-relu'),
  Sigmoid: require('weblearn-layer-sigmoid'),

  // criteria
  MSECriterion: require('weblearn-criterion-mse'),

  // containers
  Sequential: require('weblearn-container-sequential'),

  // other
  Tensor: require('weblearn-tensor')
}