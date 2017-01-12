const ndarray = require('ndarray')
const zeros = require('zeros')
const ops = require('ndarray-ops')

module.exports = ()=> {
  return function (input, target) {
    let errors = ndarray(input.data.map((v, k) => v - target.data[k]))
    let gradInput = errors
    let loss = errors.data.map(e => Math.pow(e, 2)).reduce((a, b)=>a+b) / errors.data.length
    return [loss, gradInput]
  }
}
