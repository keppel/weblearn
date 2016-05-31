const test = require('tape')
const {Tensor, ReLU, Linear, Tanh, Sigmoid} = require('../index.js')

test('relu forward / backward passes', t=>{
  t.plan(2)
  const input = Tensor([1, -1, 0, .5])
  const layer = ReLU()
  const output = layer.forward(input)

  t.deepEqual(output.values, [1, 0, 0, .5])

  const grad = layer.backward(input, Tensor([-2, 1, 0, .7]))
  t.deepEqual(grad.values, [-2, 0, 0, .7])
})

test('tanh forward / backward passes', t=>{
  t.plan(2)
  const input = Tensor([1, -1, 0, .5])
  const layer = Tanh()
  const output = layer.forward(input)

  t.deepEqual(output.values.map(x=>+x.toFixed(2)),
   [.76, -.76, 0, .46])

  const grad = layer.backward(input, Tensor([1, 1, 1, 1]))
  t.deepEqual(grad.values.map(x=>+x.toFixed(2)), [0.42, 0.42, 1, .79])
})

test('sigmoid forward / backward passes', t=>{
  t.plan(2)
  const input = Tensor([1, -1, 0, .5])
  const layer = Sigmoid()
  const output = layer.forward(input)

  t.deepEqual(output.values.map(x=>+x.toFixed(2)),
    [.73, .27, 0.5, .62])

  const grad = layer.backward(input, Tensor([1, 1, 1, 1]))
  t.deepEqual(grad.values.map(x=>+x.toFixed(2)), [.2, .2, .25, .24])
})