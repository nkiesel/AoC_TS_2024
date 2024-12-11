import run from "aocrunner"
import { sum } from "lodash-es"

const parseInput = (rawInput: string) =>
  rawInput.split(" ").map((n) => parseInt(n))

const part1 = (rawInput: string) => combined(parseInput(rawInput), 25)

const part2 = (rawInput: string) => combined(parseInput(rawInput), 75)

const add = (m: Map<number, number>, n: number, i: number): void => {
  m.set(n, (m.get(n) ?? 0) + i)
}

const combined = (stones: number[], blinks: number): number => {
  var counts = new Map<number, number>()
  for (const n of stones) {
    add(counts, n, 1)
  }
  for (let b = 0; b < blinks; b++) {
    const next = new Map<number, number>()
    for (const [stone, count] of counts.entries()) {
      const inc = (n: number) => add(next, n, count)
      const ss = stone.toString()
      if (stone === 0) {
        inc(1)
      } else if (ss.length % 2 === 0) {
        inc(parseInt(ss.slice(0, ss.length / 2)))
        inc(parseInt(ss.slice(ss.length / 2)))
      } else {
        inc(stone * 2024)
      }
    }
    counts = next
  }
  return sum([...counts.values()])
}

const sample1 = `125 17`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 55312,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
