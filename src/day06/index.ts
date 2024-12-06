import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")

enum Direction {
  N,
  S,
  E,
  W,
}

const right = (dir: Direction): Direction => {
  switch (dir) {
    case Direction.N:
      return Direction.E
    case Direction.E:
      return Direction.S
    case Direction.S:
      return Direction.W
    case Direction.W:
      return Direction.N
  }
}

const point = (p: number[]): string => `${p[0]},${p[1]}`

const tniop = (p: string): number[] =>
  p.split(",").map((it) => parseInt(it, 10))

const inArea = (area: string[], n: number[]) =>
  n[0] >= 0 && n[0] < area[0].length && n[1] >= 0 && n[1] < area.length

const get = (area: string[], n: number[]): string => area[n[1]][n[0]]

const set = (area: string[], p: string, c: string): string[] => {
  const [x, y] = tniop(p)
  const r = [...area]
  r[y] = r[y].substring(0, x) + c + r[y].substring(x + 1)
  return r
}

const move = (p: number[], d: Direction): number[] => [
  p[0] + (d === Direction.E ? 1 : d === Direction.W ? -1 : 0),
  p[1] + (d === Direction.N ? -1 : d === Direction.S ? 1 : 0),
]

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const startY = input.findIndex((row) => row.includes("^"))
  const startX = input[startY].indexOf("^")
  const start = point([startX, startY])
  return path(input, start).size
}

function path(area: string[], start: string): Set<string> {
  const visited: Set<string> = new Set()
  visited.add(start)
  let p = tniop(start)
  let dir = Direction.N
  while (true) {
    const n = move(p, dir)
    if (!inArea(area, n)) return visited
    if (get(area, n) === "#") {
      dir = right(dir)
    } else {
      p = n
      visited.add(point(p))
    }
  }
}

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput)
  const startY = input.findIndex((row) => row.includes("^"))
  const startX = input[startY].indexOf("^")
  const start = point([startX, startY])
  const candidates = path(input, start)
  candidates.delete(start)
  return [...candidates].filter((c) => {
    input = set(input, c, "#")
    const l = loop(input, start)
    input = set(input, start, "^")
    input = set(input, c, ".")
    return l
  }).length
}

function loop(area: string[], start: string): boolean {
  const visited: Set<string> = new Set()
  let dir = Direction.N
  visited.add(start + dir)
  let p = tniop(start)
  while (true) {
    const n = move(p, dir)
    if (!inArea(area, n)) return false
    if (get(area, n) === "#") {
      dir = right(dir)
    } else {
      p = n
      let pos = point(p) + dir
      if (visited.has(pos)) return true
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
