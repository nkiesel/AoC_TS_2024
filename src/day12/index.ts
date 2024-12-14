import run from "aocrunner"
import { CharArea, Direction, PointSet } from "../utils/CharArea.js"
import { sum } from "lodash-es"

const parseInput = (rawInput: string) => new CharArea(rawInput)

const part1 = (rawInput: string) => combined(rawInput, sides1)

const part2 = (rawInput: string) => combined(rawInput, sides2)

function combined(
  rawInput: string,
  sides: (area: CharArea, c: string, region: PointSet) => number,
): number {
  const area = parseInput(rawInput)
  const seen = new PointSet()
  return sum(
    area.tiles().map((p) => {
      const c = area.get(p)
      const region = new PointSet()
      const queue = [p]
      while (queue.length > 0) {
        const next = queue.shift()
        if (seen.add(next)) {
          region.add(next)
          queue.push(
            ...area
              .neighbors4(next)
              .filter((it) => !seen.has(it) && area.get(it) === c),
          )
        }
      }
      return region.size * sides(area, c, region)
    }),
  )
}

function sides1(area: CharArea, c: string, region: PointSet): number {
  return sum(
    region.items.map(
      (p) => 4 - area.neighbors4(p).filter((it) => area.get(it) === c).length,
    ),
  )
}

function sides2(_a: CharArea, _b: string, region: PointSet): number {
  const corner = (a: boolean, ab: boolean, b: boolean) =>
    (a && ab && b) || (!a && ab && !b) || (a && !ab && b) ? 1 : 0
  return sum(
    region.items.map((p) => {
      const [n, e, s, w, ne, se, sw, nw] = [
        Direction.N,
        Direction.E,
        Direction.S,
        Direction.W,
        Direction.NE,
        Direction.SE,
        Direction.SW,
        Direction.NW,
      ].map((it) => !region.has(p.move(it)))
      return (
        corner(n, ne, e) +
        corner(n, nw, w) +
        corner(s, se, e) +
        corner(s, sw, w)
      )
    }),
  )
}

const sample1 = `
        AAAA
        BBCD
        BBCC
        EEEC
    `

const sample3 = `
        RRRRIICCFF
        RRRRIICCCF
        VVRRRCCFFF
        VVRCCCJFFF
        VVVVCJJCFE
        VVIVCCJJEE
        VVIIICJJEE
        MIIIIIJJEE
        MIIISIJEEE
        MMMISSJEEE
    `

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 140,
      },
      {
        input: sample3,
        expected: 1930,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample1,
        expected: 80,
      },
      {
        input: sample3,
        expected: 1206,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
