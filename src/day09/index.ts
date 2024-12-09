import run from "aocrunner"

type Block = {
  id: number
  length: number
  moveable: boolean
}

const freeBlock = (length: number): Block => ({
  id: -1,
  length,
  moveable: false,
})

const parseInput = (rawInput: string): Block[] => {
  return rawInput.split("").map((v, i) => ({
    id: i % 2 === 0 ? i / 2 : -1,
    length: parseInt(v, 10),
    moveable: true,
  }))
}

const part1 = (rawInput: string) => {
  const blocks = parseInput(rawInput)
  const ints: number[] = []
  blocks.forEach((b) => {
    for (let c = 0; c < b.length; c++) ints.push(b.id)
  })
  while (true) {
    const free = ints.findIndex((b) => b === -1)
    const file = ints.findLastIndex((b) => b !== -1)
    if (free > file) break
    const v = ints[free]
    ints[free] = ints[file]
    ints[file] = v
  }
  return ints.filter((i) => i !== -1).reduce((sum, v, idx) => sum + idx * v, 0)
}

const part2 = (rawInput: string) => {
  const blocks = parseInput(rawInput)
  while (true) {
    const moveable = blocks.findLastIndex((b) => b.id !== -1 && b.moveable)
    if (moveable === -1) break
    const b = blocks[moveable]
    b.moveable = false
    const free = blocks.findIndex((f) => f.id === -1 && f.length >= b.length)
    if (free !== -1 && free < moveable) {
      const delta = blocks[free].length - b.length
      blocks[free] = b
      blocks[moveable] = freeBlock(b.length)
      if (delta !== 0) {
        blocks.splice(free + 1, 0, freeBlock(delta))
      }
    }
  }

  let sum = 0
  let i = 0
  blocks.forEach((b) => {
    if (b.id === -1) {
      i += b.length
    } else {
      for (let c = 0; c < b.length; c++) sum += b.id * i++
    }
  })
  return sum
}

const sample1 = `2333133121414131402`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 1928,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample1,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
