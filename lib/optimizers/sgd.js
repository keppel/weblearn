const ops = require('ndarray-ops')
const ndarray = require('ndarray')
const zeros = require('zeros')

module.exports = function (lr) {
  return function sgd(parameters, gradients) {
    let deltas = ndarray(gradients.data.slice(), gradients.shape)
    ops.mulseq(deltas, -lr)
    ops.addeq(parameters, deltas)
  }
}