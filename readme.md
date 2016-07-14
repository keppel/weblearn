# WebLearn

Modular neural networks for node.js and the browser.

WebLearn borrows almost all of its abstractions and API conventions from [Torch], making it straightforward to translate pretty much anything written in Torch to run on the web.


### example

```js
// supervised learning of the xor function with manual parameter updates

const {Sequential, Linear, MSECriterion, ReLU, Tensor} = require('weblearn')


const mlp = Sequential()
mlp
  .add(Linear(2, 10))
  .add(ReLU())
  .add(Linear(10, 1))


const criterion = MSECriterion()

for(let i = 0; i < 2000; i++){
  
  // generate an input for our xor function
  const input = Tensor([Math.round(Math.random()), Math.round(Math.random())])
  // input is a tensor containing [0, 0], [0, 1], [1, 0], or [1, 1]
  
  const target = Tensor([input.values[0] !== input.values[1] ? 1 : 0])
  // target is a tensor of either [0] or [1]. label for our xor function.

  // now do a forward pass
  const output = mlp.forward(input)

  // calculate our error using some criteria
  criterion.forward(output, target)
  const err = criterion.backward(output, target)

  // zero the gradients from the last backward pass
  mlp.zeroGradParameters()

  // compute gradients with respect to input
  mlp.backward(input, err)

  // apply gradients to parameters with learning rate .1
  mlp.updateParameters(.1)
}

let out = mlp.forward(Tensor([0, 0]))
console.log(out.values) // [ 0 ]
out = mlp.forward(Tensor([0, 1]))
console.log(out.values) // [ 1 ]
out = mlp.forward(Tensor([1, 0]))
console.log(out.values) // [ 1 ]
out = mlp.forward(Tensor([1, 1]))
console.log(out.values) // [ 0 ]


```

### Why JavaScript?

JS has some unique advantages for training neural nets:

 - community: lots of people know JavaScript and use npm. This makes it easier to develop a healthy ecosystem of WebLearn modules for you to use.

 - runtime availability: bundle your neural net into a single .js file and deploy it to your users! No installations, permissions, etc. Let your users bring their own compute to the deep learning-enabled features in your app.

 - novel architectures: p2p neural networks over WebRTC? Distributed stochastic gradient descent without data ever needing to leave a user's device for increased privacy? Some new  kinds of mad science become possible when your neural networks are in JavaScript.

### modules

#### layers
| name | version | description |
| ---- | ------- | ----------- |
| weblearn-layer-linear | [![][weblearn-layer-linear-ni]][weblearn-layer-linear-nu] | Simple fully-connected layer |
| weblearn-layer-relu | [![][weblearn-layer-relu-ni]][weblearn-layer-relu-nu] | Rectified linear unit non-linearity |
| weblearn-layer-sigmoid | [![][weblearn-layer-sigmoid-ni]][weblearn-layer-sigmoid-nu] | Sigmoid activation layer |

#### containers
| name | version | description |
| ---- | ------- | ----------- |
| weblearn-container-sequential | [![][weblearn-container-sequential-ni]][weblearn-container-sequential-nu] | Compute child layers in sequence |

#### criteria
| name | version | description |
| ---- | ------- | ----------- |
| weblearn-criterion-mse | [![][weblearn-criterion-mse-ni]][weblearn-criterion-mse-nu] | Compute child layers in sequence |

#### tensors
| name | version | description |
| ---- | ------- | ----------- |
| weblearn-tensor | [![][weblearn-tensor-ni]][weblearn-tensor-nu] | Single-process CPU tensor class |


[weblearn-layer-linear-ni]: https://img.shields.io/npm/v/weblearn-layer-linear.svg
[weblearn-layer-linear-nu]: https://www.npmjs.com/package/weblearn-layer-linear

[weblearn-layer-relu-ni]: https://img.shields.io/npm/v/weblearn-layer-relu.svg
[weblearn-layer-relu-nu]: https://www.npmjs.com/package/weblearn-layer-relu

[weblearn-layer-sigmoid-ni]: https://img.shields.io/npm/v/weblearn-layer-sigmoid.svg
[weblearn-layer-sigmoid-nu]: https://www.npmjs.com/package/weblearn-layer-sigmoid

[weblearn-container-sequential-ni]: https://img.shields.io/npm/v/weblearn-container-sequential.svg
[weblearn-container-sequential-nu]: https://www.npmjs.com/package/weblearn-container-sequential

[weblearn-criterion-mse-ni]: https://img.shields.io/npm/v/weblearn-criterion-mse.svg
[weblearn-criterion-mse-nu]: https://www.npmjs.com/package/weblearn-criterion-mse

[Torch]: http://torch.ch/docs/package-docs.html

### writing a module (layer)

Check out the [torch docs here](https://github.com/torch/nn/blob/master/doc/module.md) and look at the Linear layer. More docs coming soon.