import run from "aocrunner"
import { max, sum } from "lodash-es"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((v) => BigInt(v))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return sum(
    input.map((n) => {
      for (let i = 0; i < 2000; i++) {
        n = ((n * 64n) ^ n) % 16777216n
        n = ((n / 32n) ^ n) % 16777216n
        n = ((n * 2048n) ^ n) % 16777216n
      }
      return n
    }),
  )
}

class Ringbuffer {
  l: number[] = Array(4).fill(0)
  i: number = 0
  prev: number = 0

  add(n: number): void {
    this.l[this.i] = n - this.prev
    this.prev = n
    this.i = (this.i + 1) % 4
  }

  key(): string {
    return [
      this.l[this.i],
      this.l[(this.i + 1) % 4],
      this.l[(this.i + 2) % 4],
      this.l[(this.i + 3) % 4],
    ].join(",")
  }
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const mem: Map<string, number>[] = []
  const keys = new Set<string>()
  input.forEach((n, i) => {
    const m = new Map<string, number>()
    mem.push(m)
    const rb = new Ringbuffer()
    rb.add(Number(n % 10n))
    for (let r = 0; r < 2000; r++) {
      n = ((n * 64n) ^ n) % 16777216n
      n = ((n / 32n) ^ n) % 16777216n
      n = ((n * 2048n) ^ n) % 16777216n
      const p = Number(n % 10n)
      rb.add(p)
      if (r > 3) {
        const k = rb.key()
        keys.add(k)
        if (!m.has(k)) m.set(k, p)
      }
    }
  })
  return max([...keys].map((k) => sum(mem.map((m) => m.get(k) ?? 0))))
}

const sample1 = `
        1
        10
        100
        2024
`
const sample2 = `
        1
        2
        3
        2024
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 37327623n,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample2,
        expected: 23,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
