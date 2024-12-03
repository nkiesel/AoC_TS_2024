import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const matches = parseInput(rawInput).matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)
  let sum = 0
  for (const m of matches) {
    sum += parseInt(m[1], 10) * parseInt(m[2], 10)
  }
  return sum
}

const part2 = (rawInput: string) => {
  const matches = parseInput(rawInput).matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do(?:n't)?\(\)/g)
  let sum = 0
  let enabled = true
  for (const m of matches) {
    if (enabled && m[0].startsWith("mul")) {
      sum += parseInt(m[1], 10) * parseInt(m[2], 10)
    } else {
      enabled = m[0] === "do()"
    }
  }
  return sum
}

const sample1 = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`

const sample2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample2,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
