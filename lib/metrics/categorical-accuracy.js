const argmax = require('../utils/nd-argmax.js')

module.exports = {
  name: 'accuracy',
  measure: (output, label) => argmax(output) === argmax(label) ? 1 : 0
}
