import run from "aocrunner"
import { CharArea, Point, PointSet } from "../utils/CharArea.js"

const parseInput = (rawInput: string) => new CharArea(rawInput)

const part1 = (rawInput: string) => combined(rawInput, antidotes1)

const part2 = (rawInput: string) => combined(rawInput, antidotes2)

const combined = (
  rawInput: string,
  part: (area: CharArea, point: Point[]) => PointSet,
) => {
  const area: CharArea = parseInput(rawInput)
  const antennas = area.groups((c) => c != ".")
  const antidotes = new PointSet()
  Object.values(antennas).forEach((a) =>
    antidotes.addAll(part(area, a))
  )
  return antidotes.size
}

function antidotes1(area: CharArea, points: Point[]): PointSet {
  const list = new PointSet()
  points.forEach((a, i) => {
    points.slice(i + 1).forEach((b) => {
      const dx = a.x - b.x
      const dy = a.y - b.y
      const p1 = a.moveXY(dx, dy)
      if (area.contains(p1)) list.add(p1)
      const p2 = b.moveXY(-dx, -dy)
      if (area.contains(p2)) list.add(p2)
    })
  })
  return list
}

function antidotes2(area: CharArea, points: Point[]): PointSet {
  const list = new PointSet()
  points.forEach((a, i) => {
    points.slice(i + 1).forEach((b) => {
      const dx = a.x - b.x
      const dy = a.y - b.y
      let p1 = a
      while (area.contains(p1)) {
        list.add(p1)
        p1 = p1.moveXY(dx, dy)
      }
      p1 = b
      while (area.contains(p1)) {
        list.add(p1)
        p1 = p1.moveXY(-dx, -dy)
      }
    })
  })
  return list
}

const sample1 = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`

const sample2 = `
        T.........
        ...T......
        .T........
        ..........
        ..........
        ..........
        ..........
        ..........
        ..........
        ..........
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample2,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
