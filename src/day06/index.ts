import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((r) => r.split(""))

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

const inArea = (area: string[][], p: number[]) =>
  p[0] >= 0 && p[0] < area[0].length && p[1] >= 0 && p[1] < area.length

const get = (area: string[][], p: number[]): string => area[p[1]][p[0]]

const set = (area: string[][], p: string, c: string): void => {
  const [x, y] = tniop(p)
  area[y][x] = c
}

const move = (p: number[], d: Direction): number[] => [
  p[0] + (d === Direction.E ? 1 : d === Direction.W ? -1 : 0),
  p[1] + (d === Direction.N ? -1 : d === Direction.S ? 1 : 0),
]

const first = (area: string[][], c: string): number[] => {
  const y = area.findIndex((row) => row.includes("^"))
  const x = area[y].indexOf(c)
  return [x, y]
}

const part1 = (rawInput: string) => {
  const area = parseInput(rawInput)
  const start = point(first(area, "^"))
  return path(area, start).size
}

function path(area: string[][], start: string): Set<string> {
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
  let area = parseInput(rawInput)
  const start = point(first(area, "^"))
  const candidates = path(area, start)
  candidates.delete(start)
  return [...candidates].filter((c) => {
    set(area, c, "#")
    const l = loop(area, start)
    set(area, start, "^")
    set(area, c, ".")
    return l
  }).length
}

function loop(area: string[][], start: string): boolean {
  const visited: Set<string> = new Set()
  let dir = Direction.N
  let p = tniop(start)
  const key = (p: number[]): string => `${p[0]},${p[1]},${dir}`
  visited.add(key(p))
  while (true) {
    const n = move(p, dir)
    if (!inArea(area, n)) return false
    if (get(area, n) === "#") {
      dir = right(dir)
    } else {
      p = n
      const pos = key(p)
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
