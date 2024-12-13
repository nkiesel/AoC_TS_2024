import run from "aocrunner"
import { parseInt, sum } from "lodash-es"

type Machine = {
  a: number[]
  b: number[]
  p: number[]
}

const tokens = (m: Machine, d: number): number => {
  const [ax, ay] = m.a
  const [bx, by] = m.b
  const [px, py] = [m.p[0] + d, m.p[1] + d]
  const na = Math.floor((py * bx - px * by) / (ay * bx - ax * by))
  const nb = Math.floor((px - ax * na) / bx)
  return na * ax + nb * bx == px && na * ay + nb * by == py ? na * 3 + nb : 0
}

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n")
  let i = 0
  const machines: Machine[] = []
  let regExp = /(\d+).+?(\d+)/
  while (i < lines.length) {
    const a = lines[i++].match(regExp)
    const b = lines[i++].match(regExp)
    const p = lines[i++].match(regExp)
    machines.push({
      a: [parseInt(a[1]), parseInt(a[2])],
      b: [parseInt(b[1]), parseInt(b[2])],
      p: [parseInt(p[1]), parseInt(p[2])],
    })
    i++ // skip empty line
  }
  return machines
}

const part1 = (rawInput: string) => {
  return sum(parseInput(rawInput).map((m) => tokens(m, 0)))
}

const part2 = (rawInput: string) => {
  return sum(parseInput(rawInput).map((m) => tokens(m, 10000000000000)))
}

const sample1 = `
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 480,
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
