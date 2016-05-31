const test = require('tape')
const {Tensor, Linear} = require('../index.js')

test('weight and bias structure', t=>{
  t.plan(4)
  const layer = Linear(2, 10)

  // weights
  t.equal(layer.weight.size(0), 10)
  t.equal(layer.weight.size(1), 2)

  // biases
  t.equal(layer.bias.size(0), 10)
  t.throws(()=>{
    layer.size(1)
  })
})

test('forward / backward passes', t =>{
  t.plan(9)
  const layer = Linear(4, 2)
  const input = Tensor(4).fill(0.5)
  layer.weight = Tensor(2, 4).fill(0.5)
  layer.bias = Tensor(2).fill(0.5)

  const output = layer.forward(input)
  t.equal(output.values[0], 1.5)
  t.equal(layer.output.values[0], 1.5)

  // check that the gradients are 0
  t.deepEqual(layer.gradWeight.values, [[0, 0, 0, 0], [0, 0, 0, 0]])
  t.deepEqual(layer.gradBias.values, [0, 0])

  // do a backward pass with some arbitrary error signals
  layer.backward(input, Tensor([1, -1]))

  t.deepEqual(layer.gradWeight.values, [[0.5, 0.5, 0.5, 0.5], [-0.5, -0.5, -0.5, -0.5]])
  t.deepEqual(layer.gradBias.values, [1, -1])

  layer.updateParameters(.2)

  t.deepEqual(layer.weight.values, [[0.4, 0.4, 0.4, 0.4], [0.6, 0.6, 0.6, 0.6]])
  t.deepEqual(layer.bias.values, [0.3, 0.7])

  const learnedOutput = layer.forward(input)
  t.deepEqual(learnedOutput.values, [ 1.0999999999999999, 1.9000000000000001 ])
})

