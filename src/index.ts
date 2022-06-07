export interface Slicer {
  calc(chunk: ArrayBuffer, start: number, end: number): number
}

export function *cuttingBuffer(buf: ArrayBuffer, slicer: Slicer, deepCopy: boolean = false) {
  let start = 0
  let end = buf.byteLength

  while (start < end) {
    let sliceLen = slicer.calc(buf, start, end)

    // sliceLen Range = 1 ~ end
    if (sliceLen <= 0) {
      throw Error(`Slicer Range Error buf=${buf} start=${start} end=${end}, calcResult=${sliceLen}`)
    }
    else if (sliceLen > end) {
      sliceLen = end
    }

    let cutEnd = start+sliceLen

    if (deepCopy) {
      yield new Int8Array(buf.slice(start, (cutEnd > end) ? end : cutEnd)) // start ~ end
    }
    else {
      yield new Int8Array(buf, start, (cutEnd > end) ? end-start : sliceLen) // offset len
    }
    start += sliceLen
  }  
}