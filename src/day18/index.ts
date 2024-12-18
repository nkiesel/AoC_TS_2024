import run from "aocrunner"
import { CharArea, Point, PointSet } from "../utils/CharArea.js"
import { min } from "lodash-es"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => Point.fromString(l))

type Step = {
  p: Point
  i: number
}

const part1 = (rawInput: string) => {
  const bytes = parseInput(rawInput)
  const [mx, my, count] = bytes.length < 100 ? [6, 6, 12] : [70, 70, 1024]
  const area = CharArea.create(mx + 1, my + 1, ".")
  const start = new Point(0, 0)
  const exit = new Point(mx, my)
  bytes.slice(0, count).forEach((b) => area.set(b, "#"))
  const queue: Step[] = [{ p: start, i: 0 }]
  const seen = new PointSet()
  seen.add(start)
  const exits: number[] = []
  while (queue.length > 0) {
    const { p, i } = queue.shift()
    if (p.equals(exit)) {
      exits.push(i)
    } else {
      area
        .neighbors4(p)
        .filter((n) => !seen.has(n) && area.get(n) != "#")
        .forEach((n) => {
          seen.add(n)
          queue.push({ p: n, i: i + 1 })
        })
    }
  }
  return min(exits)
}

const part2 = (rawInput: string) => {
  const bytes = parseInput(rawInput)
  const [mx, my, count] = bytes.length < 100 ? [6, 6, 12] : [70, 70, 1024]
  const area = CharArea.create(mx + 1, my + 1, ".")
  const start = new Point(0, 0)
  const exit = new Point(mx, my)
  return bytes.find((b, i) => {
    area.set(b, "#")
    if (i > count) {
      const queue: Step[] = [{ p: start, i: 0 }]
      const seen = new PointSet()
      seen.add(start)
      let noExit = true
      while (queue.length > 0) {
        const { p, i } = queue.shift()
        if (p.equals(exit)) {
          noExit = false
          break
        }
        area
          .neighbors4(p)
          .filter((n) => !seen.has(n) && area.get(n) != "#")
          .forEach((n) => {
            seen.add(n)
            queue.unshift({ p: n, i: i + 1 })
          })
      }
      if (noExit) return b
    }
  }).toString()
}

const sample1 = `
        5,4
        4,2
        4,5
        3,0
        2,1
        6,3
        2,4
        1,5
        0,6
        3,3
        2,6
        5,1
        1,2
        5,5
        2,5
        6,5
        1,4
        0,4
        6,4
        1,1
        6,1
        1,0
        0,5
        1,6
        2,0
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 22,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample1,
        expected: "6,1",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
