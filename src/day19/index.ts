import run from "aocrunner"
import { sum } from "lodash-es"

const parseInput = (rawInput: string) => {
  const [p, d] = rawInput.split("\n\n")
  return [p.split(", "), d.split("\n")]
}

const part1 = (rawInput: string) => combined(rawInput, 1)

const part2 = (rawInput: string) => combined(rawInput, 2)

const combined = (rawInput: string, part: 1 | 2): number => {
  const [patterns, designs] = parseInput(rawInput)
  return sum(
    designs.map((design) => {
      const l = design.length
      const counts: number[] = Array(l + 1).fill(0)
      counts[0] = 1
      for (let i = 0; i < l; i++) {
        const ci = counts[i]
        if (ci == 0) continue
        for (const p of patterns) {
          const pi = i + p.length
          if (pi <= l && design.slice(i, pi) === p) counts[pi] += ci
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
