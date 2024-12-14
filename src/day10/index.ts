import run from "aocrunner"
import { CharArea, Point, PointSet } from "../utils/CharArea.js"
import { sum } from "lodash-es"

const parseInput = (rawInput: string) => new CharArea(rawInput)

const part1 = (rawInput: string) => combined(rawInput, 1)

const part2 = (rawInput: string) => combined(rawInput, 2)

const combined = (rawInput: string, part: number) => {
  const area = parseInput(rawInput)
  return sum(
    area
      .tiles((c) => c === "0")
      .map((start) => {
        const path = walkArea(start, (p) =>
          area
            .neighbors4(p)
            .filter(
              (n) =>
                area.get(n) !== "." &&
                parseInt(area.get(n)) === parseInt(area.get(p)) + 1,
            ),
        )
        let count = 0
        const set = new PointSet()

        for (const p of path) {
          if (area.get(p) === "9") {
            count++
            set.add(p)
          }
        }
        return part === 1 ? set.size : count
      }),
  )
}

function* walkArea(
  start: Point,
  next: (value: Point) => Iterable<Point>,
): IterableIterator<Point> {
  const queue: Point[] = [start]
  while (queue.length > 0) {
    const a = queue.shift()!
    yield a
    for (const b of next(a)) {
      queue.unshift(b)
    }
  }
}

const sample1 = `
        0123
        1234
        8765
        9876
`

const sample2 = `
        89010123
        78121874
        87430965
        96549874
        45678903
        32019012
        01329801
        10456732
`

const sample3 = `
        .....0.
        ..4321.
        ..5..2.
        ..6543.
        ..7..4.
        ..8765.
        ..9....
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 1,
      },
      {
        input: sample2,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample3,
        expected: 3,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
