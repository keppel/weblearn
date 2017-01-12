module.exports = function (learningRate=1e-4, decayRate=0.99) {
  let cache = []
  return function (parameters, gradients) {
    if(cache.length !== gradients.data.length){
      cache = Array(gradients.data.length).fill(0)
    }

    gradients.data.forEach((grad, key) => {
      cache[key] = decayRate * cache[key] + (1 - decayRate) * Math.pow(grad, 2)
      parameters.data[key] += -learningRate * grad / (Math.sqrt(cache[key]) + 1e-5)
    })

  }
}