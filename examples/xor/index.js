'use strict'
/*
  supervised learning of the xor function
*/

const {Sequential, Linear, MSECriterion, ReLU, SGDTrainer, Tensor, Tanh, Sigmoid} = require('../../index.js')


const mlp = Sequential()
mlp
  .add(Linear(2, 10))
  .add(ReLU())
  .add(Linear(10, 1))


const criterion = MSECriterion()
for(let i = 0; i < 2000; i++){
  const input = Tensor([Math.round(Math.random()), Math.round(Math.random())])
  const target = Tensor([input.values[0] !== input.values[1] ? 1 : 0])
  const output = mlp.forward(input)
  mlp.zeroGradParameters()
  criterion.forward(output, target)
  const err = criterion.backward(output, target)

  mlp.backward(input, err)
  mlp.updateParameters(.1)
}

let out = mlp.forward(Tensor([0, 0]))
console.log(`[ 0, 0 ]  ->  ${out.values[0]}`)
out = mlp.forward(Tensor([0, 1]))
console.log(`[ 0, 1 ]  ->  ${out.values[0]}`)
out = mlp.forward(Tensor([1, 0]))
console.log(`[ 1, 0 ]  ->  ${out.values[0]}`)
out = mlp.forward(Tensor([1, 1]))
console.log(`[ 1, 1 ]  ->  ${out.values[0]}`)
