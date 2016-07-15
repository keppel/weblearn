<h1 align="center">
  <br>
  <a href="https://github.com/keppel/weblearn"><img src="https://cloud.githubusercontent.com/assets/1269291/16877097/92525c16-4a9e-11e6-9e7d-d78dcf924ff7.png" alt="WebLearn" width="200"></a>
  <br>
  WebTorrent
  <br>
  <br>
</h1>

<h4 align="center">Modular neural networks for node.js and the browser.</h4>

WebLearn borrows almost all of its abstractions and API conventions from [Torch], making it straightforward to translate pretty much anything written in Torch to run on the web.

It's basically the [WebTorrent] or [Webcoin] of neural networks.

## Usage

```
npm install weblearn
```

```js
// supervised learning of the xor function with manual parameter updates

const { Sequential, Linear, MSECriterion, ReLU, Tensor } = require('weblearn')


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

## Why JavaScript?

JS has some unique advantages for training neural nets:

 - **Runtime availability**: bundle your neural net into a single .js file and deploy it to your users! No installations, permissions, etc. Let your users bring their own compute to the deep learning-enabled features in your app.

 - **Speed**: when it comes to doing math on a CPU, JavaScript is actually very fast. It can also talk to the host's GPU to do math there!

 - **Portability**: you can run the exact same model in your user's browser and on your own servers with node. You can train your net on the client, pass the parameters to the server, and sample from it there. Or vice versa!

 - **Community**: lots of people know JavaScript and use npm. This makes it easier to develop a healthy ecosystem of WebLearn modules for you to use.

 - **Novel architectures**: p2p neural networks over WebRTC? Distributed stochastic gradient descent without data ever needing to leave a user's device for increased privacy? Some new  kinds of mad science become possible when your neural networks are in JavaScript.

##  Modules
The main `weblearn` module contains only a few abstract classes that other modules will extend. Most of WebLearn's functionality lives in other modules in repositories listed here.

To add a module to this list, simply publish it on npm as `weblearn-{layer,container,criterion,tensor}-yourmodulename` and it will appear here when the next version of WebLearn is published.


| name | version | tests | issues | description |
|---|---|---|---|---|
| [weblearn-layer-linear][weblearn-layer-linear] | [![][weblearn-layer-linear-ni]][weblearn-layer-linear-nu] | [![][weblearn-layer-linear-ti]][weblearn-layer-linear-tu]|[![][weblearn-layer-linear-ii]][weblearn-layer-linear-iu] | Simple fully-connected layer |
| [weblearn-layer-relu][weblearn-layer-relu] | [![][weblearn-layer-relu-ni]][weblearn-layer-relu-nu] | [![][weblearn-layer-relu-ti]][weblearn-layer-relu-tu]|[![][weblearn-layer-relu-ii]][weblearn-layer-relu-iu] | Rectified linear unit non-linearity |
| [weblearn-layer-sigmoid][weblearn-layer-sigmoid] | [![][weblearn-layer-sigmoid-ni]][weblearn-layer-sigmoid-nu] | [![][weblearn-layer-sigmoid-ti]][weblearn-layer-sigmoid-tu]|[![][weblearn-layer-sigmoid-ii]][weblearn-layer-sigmoid-iu] | Sigmoid activation layer |
| [weblearn-container-sequential][weblearn-container-sequential] | [![][weblearn-container-sequential-ni]][weblearn-container-sequential-nu] | [![][weblearn-container-sequential-ti]][weblearn-container-sequential-tu]|[![][weblearn-container-sequential-ii]][weblearn-container-sequential-iu] | Compute child layers in sequence |
| [weblearn-criterion-mse][weblearn-criterion-mse] | [![][weblearn-criterion-mse-ni]][weblearn-criterion-mse-nu] | [![][weblearn-criterion-mse-ti]][weblearn-criterion-mse-tu]|[![][weblearn-criterion-mse-ii]][weblearn-criterion-mse-iu] | Mean squared error criterion |
| [weblearn-tensor][weblearn-tensor] | [![][weblearn-tensor-ni]][weblearn-tensor-nu] | [![][weblearn-layer-linear-ti]][weblearn-layer-linear-tu]|[![][weblearn-layer-linear-ii]][weblearn-layer-linear-iu] | Single-process CPU tensor class |


[weblearn-layer-linear]: https://github.com/keppel/weblearn-layer-linear
[weblearn-layer-linear-ni]: https://img.shields.io/npm/v/weblearn-layer-linear.svg
[weblearn-layer-linear-nu]: https://www.npmjs.com/package/weblearn-layer-linear
[weblearn-layer-linear-ti]: https://img.shields.io/travis/keppel/weblearn-layer-linear.svg
[weblearn-layer-linear-tu]: https://travis-ci.org/keppel/weblearn-layer-linear
[weblearn-layer-linear-ii]: https://img.shields.io/github/issues-raw/keppel/weblearn-layer-linear.svg
[weblearn-layer-linear-iu]: https://github.com/keppel/weblearn-layer-linear/issues

[weblearn-layer-relu]: https://github.com/keppel/weblearn-layer-relu
[weblearn-layer-relu-ni]: https://img.shields.io/npm/v/weblearn-layer-relu.svg
[weblearn-layer-relu-nu]: https://www.npmjs.com/package/weblearn-layer-relu
[weblearn-layer-relu-ti]: https://img.shields.io/travis/keppel/weblearn-layer-relu.svg
[weblearn-layer-relu-tu]: https://travis-ci.org/keppel/weblearn-layer-relu
[weblearn-layer-relu-ii]: https://img.shields.io/github/issues-raw/keppel/weblearn-layer-relu.svg
[weblearn-layer-relu-iu]: https://github.com/keppel/weblearn-layer-relu/issues

[weblearn-layer-sigmoid]: https://github.com/keppel/weblearn-layer-sigmoid
[weblearn-layer-sigmoid-ni]: https://img.shields.io/npm/v/weblearn-layer-sigmoid.svg
[weblearn-layer-sigmoid-nu]: https://www.npmjs.com/package/weblearn-layer-sigmoid
[weblearn-layer-sigmoid-ti]: https://img.shields.io/travis/keppel/weblearn-layer-sigmoid.svg
[weblearn-layer-sigmoid-tu]: https://travis-ci.org/keppel/weblearn-layer-sigmoid
[weblearn-layer-sigmoid-ii]: https://img.shields.io/github/issues-raw/keppel/weblearn-layer-sigmoid.svg
[weblearn-layer-sigmoid-iu]: https://github.com/keppel/weblearn-layer-sigmoid/issues

[weblearn-container-sequential]: https://github.com/keppel/weblearn-container-sequential
[weblearn-container-sequential-ni]: https://img.shields.io/npm/v/weblearn-container-sequential.svg
[weblearn-container-sequential-nu]: https://www.npmjs.com/package/weblearn-container-sequential
[weblearn-container-sequential-ti]: https://img.shields.io/travis/keppel/weblearn-container-sequential.svg
[weblearn-container-sequential-tu]: https://travis-ci.org/keppel/weblearn-container-sequential
[weblearn-container-sequential-ii]: https://img.shields.io/github/issues-raw/keppel/weblearn-container-sequential.svg
[weblearn-container-sequential-iu]: https://github.com/keppel/weblearn-container-sequential/issues

[weblearn-criterion-mse]: https://github.com/keppel/weblearn-criterion-mse
[weblearn-criterion-mse-ni]: https://img.shields.io/npm/v/weblearn-criterion-mse.svg
[weblearn-criterion-mse-nu]: https://www.npmjs.com/package/weblearn-criterion-mse
[weblearn-criterion-mse-ti]: https://img.shields.io/travis/keppel/weblearn-criterion-mse.svg
[weblearn-criterion-mse-tu]: https://travis-ci.org/keppel/weblearn-criterion-mse
[weblearn-criterion-mse-ii]: https://img.shields.io/github/issues-raw/keppel/weblearn-criterion-mse.svg
[weblearn-criterion-mse-iu]: https://github.com/keppel/weblearn-criterion-mse/issues

[weblearn-tensor]: https://github.com/keppel/weblearn-tensor
[weblearn-tensor-ni]: https://img.shields.io/npm/v/weblearn-tensor.svg
[weblearn-tensor-nu]: https://www.npmjs.com/package/weblearn-tensor
[weblearn-tensor-ti]: https://img.shields.io/travis/keppel/weblearn-tensor.svg
[weblearn-tensor-tu]: https://travis-ci.org/keppel/weblearn-tensor
[weblearn-tensor-ii]: https://img.shields.io/github/issues-raw/keppel/weblearn-tensor.svg
[weblearn-tensor-iu]: https://github.com/keppel/weblearn-tensor/issues

### Writing a module

Check out the [Torch docs here](https://github.com/torch/nn/blob/master/doc/module.md) and look at [WebLearn's Linear layer](https://github.com/keppel/weblearn-layer-linear) as an example. More docs coming soon.

[Torch]: http://torch.ch/docs/package-docs.html
[WebTorrent]: https://github.com/feross/webtorrent
[Webcoin]: https://github.com/mappum/webcoin