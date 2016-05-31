'use strict'
/*
  supervised learning of the xor function
*/

const {Sequential, Linear, MSECriterion, ReLU, SGDTrainer, Tensor, Tanh, Sigmoid} = require('../../index.js')


const mlp = Sequential()
const layer0 = Linear(2, 10)
mlp
  .add(layer0)
  .add(ReLU())
  .add(Linear(10, 1))


const criterion = MSECriterion()
for(let i = 0; i < 2000; i++){
  const input = Tensor([Math.round(Math.random()), Math.round(Math.random())])
  const target = Tensor([input.values[0] !== input.values[1] ? 1 : 0])
  const output = mlp.forward(input)
  mlp.zeroGradParameters()
  criterion.forward(output, target)
  // const err = Tensor([output.values[0] - target.values[0]])
  const err = criterion.backward(output, target)

  mlp.backward(input, err)
  mlp.updateParameters(.1)
}
// now test the model
layer0.weight.print('l0 weights')
let out = mlp.forward(Tensor([0, 0]))
console.log(`[ 0, 0 ]  ->  ${out.values[0]}`)
out = mlp.forward(Tensor([0, 1]))
console.log(`[ 0, 1 ]  ->  ${out.values[0]}`)
out = mlp.forward(Tensor([1, 0]))
console.log(`[ 1, 0 ]  ->  ${out.values[0]}`)
out = mlp.forward(Tensor([1, 1]))
console.log(`[ 1, 1 ]  ->  ${out.values[0]}`)


// const mlp = Sequential()
// const layer = Linear({inputs:2, outputs: 1})
// mlp.add(layer)

// for(let i = 0; i < 200; i++){
//   const input = Tensor([0, 1])
//   const output = mlp.forward(input)
//   mlp.zeroGradParameters()
//   mlp.backward(input, Tensor([output.values[0] - 1]))
//   // layer.weight.print('weight before')
//   mlp.updateParameters(.1)
//   // layer.weight.print('weight after')
//   const out2 = mlp.forward(input)
//   console.log('after update:')
//   console.log(out2)
// }