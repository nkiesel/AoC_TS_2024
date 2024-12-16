import run from "aocrunner"
import {
  CharArea,
  Direction,
  left90,
  Point,
  right90,
} from "../utils/CharArea.js"
import { min, uniq } from "lodash-es"

const parseInput = (rawInput: string) => new CharArea(rawInput)

type Step = {
  p: Point
  d: Direction
  cost: number
  path: string[]
}

const part1 = (rawInput: string) => {
  return combined(rawInput)[0].cost
}
const part2 = (rawInput: string) => {
  return uniq(combined(rawInput).flatMap(s => s.path)).length
}

const combined = (rawInput: string) => {
  const area = parseInput(rawInput)
  const start = area.first("S")
  const end = area.first("E").toString()
  const seen = new Map<string, number>()
  const toEnd: Step[] = []
  const queue: Step[] = [
    { p: start, d: Direction.E, cost: 0, path: [start.toString()] },
  ]
  while (queue.length > 0) {
    const s = queue.shift()
    if (s.p.toString() === end) {
      toEnd.push(s)
    } else {
      [s.d, left90(s.d), right90(s.d)]
        .map((d) => ({ p: s.p.move(d), d }))
        .filter((c) => area.get(c.p) !== "#")
        .forEach(({p, d}) => {
          const cost = s.cost + 1 + (d !== s.d ? 1000 : 0)
          const ps = `${p.toString()},${s.d}`
          const prev = seen.get(ps)
          if (prev === undefined || cost <= prev) {
            seen.set(ps, cost)
            if (ps !== end)
              queue.push({ p, d, cost, path: s.path.concat(p.toString()) })
          }
        })
    }
  }
  const bestCost = min(toEnd.map((s) => s.cost))
  return toEnd.filter(s => s.cost === bestCost)
}

const sample1 = `
        ###############
        #.......#....E#
        #.#.###.#.###.#
        #.....#.#...#.#
        #.###.#####.#.#
        #.#.#.......#.#
        #.#.#####.###.#
        #...........#.#
        ###.#.#####.#.#
        #...#.....#.#.#
        #.#.#.###.#.#.#
        #.....#...#.#.#
        #.###.#.#.#.#.#
        #S..#.....#...#
        ###############
`

const sample2 = `
        #################
        #...#...#...#..E#
        #.#.#.#.#.#.#.#.#
        #.#.#.#...#...#.#
        #.#.#.#.###.#.#.#
        #...#.#.#.....#.#
        #.#.#.#.#.#####.#
        #.#...#.#.#.....#
        #.#.#####.#.###.#
        #.#.#.......#...#
        #.#.###.#####.###
        #.#.#...#.....#.#
        #.#.#.#####.###.#
        #.#.#.........#.#
        #.#.#.#########.#
        #S#.............#
        #################
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 7036,
      },
      {
        input: sample2,
        expected: 11048,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample1,
        expected: 45,
      },
      {
        input: sample2,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
