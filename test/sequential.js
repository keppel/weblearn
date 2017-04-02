let test = require('tape')
let { Sequential, Linear, ReLU } = require('../')
let ndarray = require('ndarray')

test('parameters method on sequential model', t => {
  t.plan(2)
  let model = Sequential()
  model.add(Linear(2, 10))
  model.add(ReLU())
  model.add(Linear(10, 1))

  // get params:
  let params = model.parameters()
  t.ok(params.length === 41)

  let x = ndarray([1, 1])

  let out1 = model.forward(x)

  // set params:
  model.parameters(params)
  let out2 = model.forward(x)

  t.deepEqual(out1.data, out2.data)
})
