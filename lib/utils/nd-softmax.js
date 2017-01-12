const ndarray = require('ndarray')

module.exports = function (nd) {
  let expSum = 0
  nd.data.forEach(n => {
    expSum += Math.exp(n)
  })

  let softmaxedValues = nd.data.map(n => Math.exp(n) / expSum)
  return ndarray(softmaxedValues)
}