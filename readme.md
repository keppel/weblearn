<h1 align="center">
  <br>
  <a href="https://github.com/keppel/weblearn"><img src="https://cloud.githubusercontent.com/assets/1269291/16877097/92525c16-4a9e-11e6-9e7d-d78dcf924ff7.png" alt="WebLearn" width="200"></a>
  <br>
  WebLearn
  <br>
  <br>
</h1>

<h4 align="center">Modular neural networks for node.js and the browser.</h4>

<p align="center">
  <a href="https://travis-ci.org/keppel/weblearn">
    <img src="https://img.shields.io/travis/keppel/weblearn/master.svg"
         alt="Travis Build">
  </a>
  <a href="https://www.npmjs.com/package/weblearn">
    <img src="https://img.shields.io/npm/dm/weblearn.svg"
         alt="NPM Downloads">
  </a>
  <a href="https://www.npmjs.com/package/weblearn">
    <img src="https://img.shields.io/npm/v/weblearn.svg"
         alt="NPM Version">
  </a>
</p>
<br>

**WebLearn** makes it super easy to write and train deep neural networks in JavaScript!

Since WebLearn is written completely in JavaScript, you can run the exact same code in the browser with browserify or in node.js.

WebLearn is extremely modular. The core WebLearn package is tiny, but it's been carefully designed to spawn a rich ecosystem of modules and tools. You can drop in new types of layers, visualizations, criteria, etc-- all with a simple `require()`

We borrow most of our abstractions and API conventions from [Torch] and [Keras]. Translating programs written with Torch to run on the web with WebLearn is especially straightforward.

It's basically the [WebTorrent] or [Webcoin] of neural networks.

If you're a JavaScript hacker, you may be aware that Deep Learning™ is a big deal, but maybe you've never actually used a neural network. WebLearn is for you. It's just JavaScript-- read the source and watch the mysticism around machine learning disappear. Or just snap together some layers from npm and don't give it a second thought!

AI will belong to the hackers / tinkerers of the world, and there's no larger community of tinkerers than npm / JavaScript users. **WebLearn** is a hackable-to-the-core pure JavaScript machine learning framework-- go forth and use it in the name of science!

## v2.x

In version 2, WebLearn eschews using its own tensor class and instead uses [ndarrays] and functions that operate on them.

## Usage

```
npm install weblearn
```

```js
const ndarray = require('ndarray')
const { ReLU, Linear, MSE, SGD, Sequential } = require('weblearn')

let model = Sequential({
  optimizer: SGD(.01),
  loss: MSE()
})

model.add(Linear(2, 20))
  .add(ReLU())
  .add(Linear(20, 1))

// [ input, target ] (both ndarrays)

const data = [
  [ndarray([0, 0]), ndarray([0])],
  [ndarray([0, 1]), ndarray([1])],
  [ndarray([1, 0]), ndarray([1])],
  [ndarray([1, 1]), ndarray([0])]
]
for(let i = 0; i < 1000; i++) {
  model.fit(data, { verbose: false })
}

data.forEach(d => {
  console.log(model.forward(d[0]))
})
```

## Why JavaScript?

JS has some unique advantages for training neural nets:

 - **Runtime availability**: bundle your neural net into a single .js file and deploy it to your users! No installations, permissions, etc. Let your users bring their own compute to the deep learning-enabled features in your app.

 - **Speed**: when it comes to doing math on a CPU, JavaScript is actually very fast. It can also talk to the host's GPU to do math there!

 - **Portability**: you can run the exact same model in your user's browser and on your own servers with node. You can train your net on the client, pass the parameters to the server, and sample from it there. Or vice versa!

 - **Community**: lots of people know JavaScript and use npm. This makes it easier to develop a healthy ecosystem of WebLearn modules for you to use.

 - **Novel architectures**: p2p neural networks over WebRTC? Distributed stochastic gradient descent without data ever needing to leave a user's device for increased privacy? Some new  kinds of mad science become possible when your neural networks are in JavaScript.

##  Modules
The main WebLearn package is simply a curated map of useful modules. Most of WebLearn's functionality lives in other modules in repositories listed here.

To add a module to this list, simply publish it on npm as `weblearn-{layer,container,criterion,tensor}-yourmodulename` and it will appear here when the next version of WebLearn is published.


| name | version | tests | issues | description |
|---|---|---|---|---|
| [weblearn-layer-linear][weblearn-layer-linear] | [![][weblearn-layer-linear-ni]][weblearn-layer-linear-nu] | [![][weblearn-layer-linear-ti]][weblearn-layer-linear-tu]|[![][weblearn-layer-linear-ii]][weblearn-layer-linear-iu] | Simple fully-connected layer |
| [weblearn-layer-relu][weblearn-layer-relu] | [![][weblearn-layer-relu-ni]][weblearn-layer-relu-nu] | [![][weblearn-layer-relu-ti]][weblearn-layer-relu-tu]|[![][weblearn-layer-relu-ii]][weblearn-layer-relu-iu] | Rectified linear unit non-linearity |
| [weblearn-layer-sigmoid][weblearn-layer-sigmoid] | [![][weblearn-layer-sigmoid-ni]][weblearn-layer-sigmoid-nu] | [![][weblearn-layer-sigmoid-ti]][weblearn-layer-sigmoid-tu]|[![][weblearn-layer-sigmoid-ii]][weblearn-layer-sigmoid-iu] | Sigmoid activation layer |
| [weblearn-container-sequential][weblearn-container-sequential] | [![][weblearn-container-sequential-ni]][weblearn-container-sequential-nu] | [![][weblearn-container-sequential-ti]][weblearn-container-sequential-tu]|[![][weblearn-container-sequential-ii]][weblearn-container-sequential-iu] | Compute child layers in sequence |
| [weblearn-criterion-mse][weblearn-criterion-mse] | [![][weblearn-criterion-mse-ni]][weblearn-criterion-mse-nu] | [![][weblearn-criterion-mse-ti]][weblearn-criterion-mse-tu]|[![][weblearn-criterion-mse-ii]][weblearn-criterion-mse-iu] | Mean squared error criterion |
| [weblearn-tensor][weblearn-tensor] | [![][weblearn-tensor-ni]][weblearn-tensor-nu] | [![][weblearn-tensor-ti]][weblearn-tensor-tu]|[![][weblearn-tensor-ii]][weblearn-tensor-iu] | Single-process CPU tensor class |
| [weblearn-module][weblearn-module] | [![][weblearn-module-ni]][weblearn-module-nu] | [![][weblearn-module-ti]][weblearn-module-tu]|[![][weblearn-module-ii]][weblearn-module-iu] | Base class for layers |
| [weblearn-container][weblearn-container] | [![][weblearn-container-ni]][weblearn-container-nu] | [![][weblearn-container-ti]][weblearn-container-tu]|[![][weblearn-container-ii]][weblearn-container-iu] | Base class for containers |
| [weblearn-criterion][weblearn-criterion] | [![][weblearn-criterion-ni]][weblearn-criterion-nu] | [![][weblearn-criterion-ti]][weblearn-criterion-tu]|[![][weblearn-criterion-ii]][weblearn-criterion-iu] | Base class for criteria |




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

[weblearn-criterion]: https://github.com/keppel/weblearn-criterion
[weblearn-criterion-ni]: https://img.shields.io/npm/v/weblearn-criterion.svg
[weblearn-criterion-nu]: https://www.npmjs.com/package/weblearn-criterion
[weblearn-criterion-ti]: https://img.shields.io/travis/keppel/weblearn-criterion.svg
[weblearn-criterion-tu]: https://travis-ci.org/keppel/weblearn-criterion
[weblearn-criterion-ii]: https://img.shields.io/github/issues-raw/keppel/weblearn-criterion.svg
[weblearn-criterion-iu]: https://github.com/keppel/weblearn-criterion/issues

[weblearn-container]: https://github.com/keppel/weblearn-container
[weblearn-container-ni]: https://img.shields.io/npm/v/weblearn-container.svg
[weblearn-container-nu]: https://www.npmjs.com/package/weblearn-container
[weblearn-container-ti]: https://img.shields.io/travis/keppel/weblearn-container.svg
[weblearn-container-tu]: https://travis-ci.org/keppel/weblearn-container
[weblearn-container-ii]: https://img.shields.io/github/issues-raw/keppel/weblearn-container.svg
[weblearn-container-iu]: https://github.com/keppel/weblearn-container/issues

[weblearn-module]: https://github.com/keppel/weblearn-module
[weblearn-module-ni]: https://img.shields.io/npm/v/weblearn-module.svg
[weblearn-module-nu]: https://www.npmjs.com/package/weblearn-module
[weblearn-module-ti]: https://img.shields.io/travis/keppel/weblearn-module.svg
[weblearn-module-tu]: https://travis-ci.org/keppel/weblearn-module
[weblearn-module-ii]: https://img.shields.io/github/issues-raw/keppel/weblearn-module.svg
[weblearn-module-iu]: https://github.com/keppel/weblearn-module/issues

### Writing a module

Check out the [Torch docs here](https://github.com/torch/nn/blob/master/doc/module.md) and look at [WebLearn's Linear layer](https://github.com/keppel/weblearn-layer-linear) as an example. More docs coming soon.

[weblearn-ni]: https://img.shields.io/npm/v/weblearn.svg
[weblearn-nu]: https://www.npmjs.com/package/weblearn
[weblearn-ti]: https://img.shields.io/travis/keppel/weblearn.svg
[weblearn-tu]: https://travis-ci.org/keppel/weblearn
[weblearn-ni]: https://img.shields.io/npm/v/weblearn.svg
[weblearn-nu]: https://www.npmjs.com/package/weblearn

[Torch]: http://torch.ch/docs/package-docs.html
[Keras]: https://keras.io
[ndarrays]: https://github.com/scijs/ndarray
[WebTorrent]: https://github.com/feross/webtorrent
[Webcoin]: https://github.com/mappum/webcoin