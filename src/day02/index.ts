import run from "aocrunner"
import { countBy } from "lodash-es"

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((it) => it.split(/\s+/).map((it) => parseInt(it, 10)))

function isValid(nums: number[]): boolean {
  const descending = Math.sign(nums[0] - nums[1])
  for (let i = 1; i < nums.length; i++) {
    const d = nums[i - 1] - nums[i]
    if (d === 0 || Math.abs(d) > 3 || Math.sign(d) != descending) return false
  }
  return true
}

function isValid2(nums: number[]): boolean {
  if (isValid(nums)) return true
  for (let i = 0; i < nums.length; i++) {
    if (isValid(nums.toSpliced(i, 1))) return true
  }
  return false
}

const part1 = (rawInput: string) => countBy(parseInput(rawInput), isValid).true

const part2 = (rawInput: string) => countBy(parseInput(rawInput), isValid2).true

const sample = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`

run({
  part1: {
    tests: [
      {
        input: sample,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
