const old = require('old')

module.exports = {
  Module: old(require('./lib/Module.js')),
  Container: old(require('./lib/Container.js')),
  Criterion: old(require('./lib/Criterion.js')),
}