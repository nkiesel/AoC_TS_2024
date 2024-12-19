import run from "aocrunner"
import { sum } from "lodash-es"

type Towels = {
  towels: string[]
  designs: string[]
}

const parseInput = (rawInput: string): Towels => {
  const [t, d] = rawInput.split("\n\n")
  return { towels: t.split(", "), designs: d.split("\n") }
}

const part1 = (rawInput: string) => {
  return combined(rawInput, 1)
}

const part2 = (rawInput: string) => {
  return combined(rawInput, 2)
}

const combined = (rawInput: string, part: 1 | 2): number => {
  const data = parseInput(rawInput)
  return sum(
    data.designs.map((design) => {
      const l = design.length
      const counts: number[] = Array(l + 1).fill(0)
      counts[0] = 1
      for (let i = 0; i < l; i++) {
        for (const t of data.towels) {
          const tl = i + t.length
          const n1 = tl <= l
          const n2 = design.slice(i, tl)
          if (tl <= l && design.slice(i, tl) === t) {
            counts[tl] += counts[i]
          }
        }
      }
      return part == 1 ? Math.sign(counts[l]) : counts[l]
    }),
  )
}

const sample1 = `
        r, wr, b, g, bwu, rb, gb, br

        brwrr
        bggr
        gbbr
        rrbgbr
        ubwu
        bwurrg
        brgr
        bbrgwb
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample1,
        expected: 16,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
