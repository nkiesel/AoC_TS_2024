import run from "aocrunner"
import { countBy, sum, unzip, zip } from "lodash-es"

const parseInput = (rawInput: string) => {
  return unzip(
    rawInput.split("\n").map((l) => l.split(/\s+/).map((n) => parseInt(n, 10))),
  )
}

const part1 = (rawInput: string) => {
  const [left, right] = parseInput(rawInput).map(it => it.sort((a, b) => a - b))
  return sum(zip(left, right).map(([l, r]) => Math.abs(l - r)))
}

const part2UsingCountBy = (rawInput: string) => {
  const [left, right] = parseInput(rawInput)
  return sum(
    left.map((l) => {
      const count = countBy(right, (n) => n === l).true
      return l * (isNaN(count) ? 0 : count)
    }),
  )
}

const part2 = (rawInput: string) => {
  const [left, right] = parseInput(rawInput)
  return sum(left.map((l) => l * right.filter((r) => r === l).length))
}

const sample1 = `
3   4
4   3
2   5
1   3
3   9
3   3
`
run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample1,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
