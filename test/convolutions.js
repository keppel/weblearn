const test = require('tape')
const {
  Tensor,
  TemporalConvolution
} = require('../index.js')

test('temporal convolutions', t =>{
  t.plan(2)
  const inp = 5  // dimensionality of one sequence element
  const outp = 3 // number of derived features for one sequence element
  const kw = 1   // kernel only operates on one sequence element per step
  const dw = 1   // we step once and go on to the next sequence element

  const mlp = TemporalConvolution(inp,outp,kw,dw)

  const x = Tensor(1, inp).fill(.5)

  mlp.bias.fill(.5)
  mlp.weight.fill(.5)

  let output = mlp.forward(x)
  t.deepEqual(output.values, [[1.75, 1.75, 1.75]])

  mlp.backward(x, Tensor([[1, 0, -1]]))
  mlp.updateParameters(.2)
  output = mlp.forward(x)
  t.deepEqual(output.values, [[1.3, 1.75, 2.2]])
})