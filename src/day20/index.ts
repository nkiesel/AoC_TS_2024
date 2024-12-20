import run from "aocrunner"
import { CharArea, Point } from "../utils/CharArea.js"

const parseInput = (rawInput: string) => new CharArea(rawInput)

const part1 = (rawInput: string) => combined(rawInput, 100, 2)

const part2 = (rawInput: string) => combined(rawInput, 100, 20)

const combined = (rawInput: string, threshold: number, picoseconds: number) => {
  const area = parseInput(rawInput)
  const start = area.first("S")
  const end = area.first("E")
  area.set(end, ".")

  const steps = new Map<string, number>()
  let p = start
  let i = 0
  let pre: Point = undefined
  do {
    steps.set(p.toString(), i++)
    const n = area
      .neighbors4(p, (c) => c === '.')
      .find((it) => !it.equals(pre))
    pre = p
    p = n
  } while (!end.equals(p))
  steps.set(end.toString(), i)

  const cheats = new Set<string>()
  steps.forEach((s, ps) => {
    const p = Point.fromString(ps)
    const pc = steps.get(ps)
    area
      .manhattan(p, picoseconds, (c) => c === '.')
      .forEach((t) => {
        const ts = t.toString()
        if (steps.get(ts) - pc - p.manhattanDistance(t) >= threshold)
          cheats.add(`${ps},${ts}`)
      })
  })
  return cheats.size
}

run({
  part1: {
    tests: [],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
