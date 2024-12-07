import run from "aocrunner"
import { sum } from "lodash-es"

type Data = {
  r: number
  n: number[]
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const s = line.split(": ")
    return {
      r: parseInt(s[0], 10),
      n: s[1].split(/\s+/).map((i) => parseInt(i, 10)),
    }
  })

const part1 = (rawInput: string) => {
  return combined(rawInput, false)
}

const part2 = (rawInput: string) => {
  return combined(rawInput, true)
}

const combined = (rawInput: string, withConcat: boolean) => {
  const input = parseInput(rawInput)
  return sum(input.filter((l) => valid(l, withConcat)).map((l) => l.r))
}

function valid(d: Data, withConcat: boolean): boolean {
  const [a, b] = d.n
  if (d.n.length === 1) return d.r === a
  if (d.r < a) return false
  const heads = [a + b, a * b]
  if (withConcat) heads.push(parseInt(`${a}${b}`, 10))
  const tail = d.n.slice(1)
  return heads.some((v) => {
    tail[0] = v
    return valid({ r: d.r, n: tail }, withConcat)
  })
}

const sample1 = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample1,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
