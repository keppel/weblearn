const ndarray = require('ndarray')

module.exports = function (target) {
  // return a copy of an ndarray
  return ndarray(target.data.slice(), target.shape)
}