const ndarray = require('ndarray')
const { ReLU, Linear, MSE, SGD, Sequential } = require('../../index.js')

let model = Sequential({
  optimizer: SGD(.01),
  loss: MSE()
})

model.add(Linear(2, 20))
.add(ReLU())
.add(Linear(20, 1))



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