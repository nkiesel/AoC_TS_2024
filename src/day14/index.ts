import run from "aocrunner"
import { parseInt } from "lodash-es"

type Robot = {
  px: number
  py: number
  vx: number
  vy: number
}

const parseInput = (rawInput: string): Robot[] => {
  return rawInput.split("\n").map((l) => {
    const d = l.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/)
    return {
      px: parseInt(d[1]),
      py: parseInt(d[2]),
      vx: parseInt(d[3]),
      vy: parseInt(d[4]),
    }
  })
}

const part1 = (rawInput: string) => {
  const robots = parseInput(rawInput)
  const [wx, wy] = robots.length < 15 ? [11, 7] : [101, 103]
  for (let i = 0; i < 100; i++) {
    robots.forEach((r) => {
      r.px = (r.px + r.vx + wx) % wx
      r.py = (r.py + r.vy + wy) % wy
    })
  }
  const count = [0, 0, 0, 0]
  const [bx, by] = [Math.floor(wx / 2), Math.floor(wy / 2)]
  robots.forEach((r) => {
    if (r.px < bx && r.py < by) count[0]++
    if (r.px > bx && r.py < by) count[1]++
    if (r.px < bx && r.py > by) count[2]++
    if (r.px > bx && r.py > by) count[3]++
  })
  return count[0] * count[1] * count[2] * count[3]
}

const part2 = (rawInput: string) => {
  const robots = parseInput(rawInput)
  const [wx, wy] = robots.length < 15 ? [11, 7] : [101, 103]
  for (let i = 1; true; i++) {
    const s = new Set<string>()
    robots.forEach((r) => {
      r.px = (r.px + r.vx + wx) % wx
      r.py = (r.py + r.vy + wy) % wy
      s.add(`${r.px},${r.py}`)
    })
    if (robots.some((r) => verticalLine(r, 10, s))) return i
  }
}

function verticalLine(r: Robot, d: number, s: Set<string>): boolean {
  for (let y = r.py + 1; y <= r.py + d; y++) {
    if (!s.has(`${r.px},${y}`)) return false
  }
  return true
}

const sample1 = `
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 12,
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
