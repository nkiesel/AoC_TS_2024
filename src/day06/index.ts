import run from "aocrunner"
import { CharArea, Direction, Point, right90 } from "../utils/CharArea.js"
import { uniq } from "lodash-es"

const part1 = (rawInput: string) => {
  const area = new CharArea(rawInput)
  const start = area.first("^")
  return walkToExit(area, start)!.length
}

const part2 = (rawInput: string) => {
  let area = new CharArea(rawInput)
  const start = area.first("^")
  const candidates = walkToExit(area, start).filter((p) => !p.equals(start))
  return [...candidates].filter((c) => {
    area.set(c, "#")
    const loop = walkToExit(area, start) === undefined
    area.set(c, ".")
    return loop
  }).length
}

function walkToExit(area: CharArea, start: Point): Point[] | undefined {
  const visited: Set<string> = new Set()
  let dir = Direction.N
  let p = start
  const key = (p: Point): string => `${p}:${dir}`
  visited.add(key(p))
  while (true) {
    const n = p.move(dir)
    if (!area.contains(n))
      return uniq(Array.from(visited).map((v) => v.slice(0, -2))).map((v) =>
        Point.fromString(v),
      )
    if (area.get(n) === "#") {
      dir = right90(dir)
    } else {
      p = n
      const pos = key(p)
      if (visited.has(pos)) return undefined
      visited.add(pos)
    }
  }
}

const sample1 = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample1,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
