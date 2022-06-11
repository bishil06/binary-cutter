# binary-cutter
binary cutter

## install
```shell
npm i binary-cutter
```

## example

```js
const { cuttingBuffer } = require('binary-cutter')

const slicer = { calc() { return 2 }}
const buf = new Uint8Array([1, 2, 3, 4, 5, 6]).buffer
for (const b of cuttingBuffer(buf, slicer)) {
  console.log(b)
}
// [1, 2]
// [3, 4]
// [5, 6]
```

```js
const { cuttingBuffer } = require('binary-cutter')

const slicer = { 
  count: 0,
  calc() { return (this.count+=1, this.count) }
}
const buf = new Uint8Array([1, 2, 3, 4, 5, 6]).buffer
for (const b of cuttingBuffer(buf, slicer)) {
  console.log(b)
}
// [1]
// [2, 3]
// [4, 5, 6]
```