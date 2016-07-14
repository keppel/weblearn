const test = require('tape')
const {Tensor, Sequential, Linear, Tanh, ReLU} = require('../index.js')

test.skip('gradient flow', t=>{
  t.plan(1)
  const mlp = Sequential()
    .add(Linear(2, 4))
    .add(ReLU())
    .add(Linear(4, 2))

  const input = Tensor([1, 1])
  const output = mlp.forward(input)
  const target = [10, -10]
  const err = Tensor(target.map((v, i) => output.values[i] - v))
  mlp.backward(input, err)
  mlp.updateParameters(1)

  const correctedOutput = mlp.forward(input)
  console.log(correctedOutput)
})