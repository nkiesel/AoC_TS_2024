import assert from "node:assert"

export enum Direction {
  N,
  S,
  E,
  W,
  NE,
  NW,
  SE,
  SW,
}

const r90: Map<Direction, Direction> = new Map([
  [Direction.N, Direction.E],
  [Direction.E, Direction.S],
  [Direction.S, Direction.W],
  [Direction.W, Direction.N],
  [Direction.NE, Direction.SE],
  [Direction.NW, Direction.NE],
  [Direction.SW, Direction.NW],
  [Direction.SE, Direction.SW],
])

const l90: Map<Direction, Direction> = new Map([
  [Direction.E, Direction.N],
  [Direction.S, Direction.E],
  [Direction.W, Direction.S],
  [Direction.N, Direction.W],
  [Direction.SE, Direction.NE],
  [Direction.NE, Direction.NW],
  [Direction.NW, Direction.SW],
  [Direction.SW, Direction.SE],
])

const step: Map<Direction, number[]> = new Map([
  [Direction.N, [0, -1]],
  [Direction.E, [1, 0]],
  [Direction.S, [0, 1]],
  [Direction.W, [-1, 0]],
  [Direction.NE, [1, -1]],
  [Direction.NW, [-1, -1]],
  [Direction.SW, [-1, 1]],
  [Direction.SE, [1, 1]],
])

const urdl: Map<string, Direction> = new Map([
  ["^", Direction.N],
  [">", Direction.E],
  ["v", Direction.S],
  ["<", Direction.W],
])

export const right90 = (dir: Direction): Direction => {
  return r90.get(dir)
}

export const left90 = (dir: Direction): Direction => {
  return l90.get(dir)
}

export const fromChar = (c: string): Direction => urdl.get(c)

export class Point {
  public constructor(readonly x: number, readonly y: number) {}

  static fromString(s: string): Point {
    const [x, y] = s.split(",").map((n) => parseInt(n, 10))
    return new Point(x, y)
  }

  toString(suffix?: unknown): string {
    return suffix === undefined
      ? `${this.x},${this.y}`
      : `${this.x},${this.y},${suffix}`
  }

  equals(p: Point | undefined): boolean {
    return p !== undefined && this.x === p.x && this.y === p.y
  }

  moveXY(dx: number, dy: number, n?: number) {
    n ??= 1
    return new Point(this.x + dx * n, this.y + dy * n)
  }

  move(dir: Direction, n?: number) {
    const [dx, dy] = step.get(dir)
    return this.moveXY(dx, dy, n)
  }

  manhattanDistance(p: Point): number {
    return Math.abs(this.x - p.x) + Math.abs(this.y - p.y)
  }
}

export const point = (s: string) => Point.fromString(s)

export class PointSet {
  private set = new Set<string>()

  has(p: Point): boolean {
    return this.set.has(p.toString())
  }

  add(p: Point): boolean {
    const ps = p.toString()
    if (this.set.has(ps)) return false
    this.set.add(ps)
    return true
  }

  addAll(points: PointSet): number {
    let added = 0
    points.set.forEach((p) => {
      if (!this.set.has(p)) {
        this.set.add(p)
        added++
      }
    })
    return added
  }

  get size() {
    return this.set.size
  }

  get items() {
    return [...this.set].map((ps) => Point.fromString(ps))
  }
}

export class CharArea {
  private readonly area: string[][] = []
  readonly maxX: number
  readonly maxY: number

  constructor(s: string) {
    this.area = s.split("\n").map((l) => l.split(""))
    this.maxX = this.area[0].length - 1
    this.maxY = this.area.length - 1
  }

  static create(mx: number, my: number, c: string): CharArea {
    return new CharArea(Array(mx).fill(".".repeat(my)).join("\n"))
  }

  contains(p: Point) {
    return p.x >= 0 && p.x <= this.maxX && p.y >= 0 && p.y <= this.maxY
  }

  get(p: Point): string {
    return this.area[p.y][p.x]
  }

  set(p: Point, c: string) {
    assert(c.length === 1, "value must be a single char")
    this.area[p.y][p.x] = c
  }

  setXY(x: number, y: number, c: string) {
    assert(c.length === 1, "value must be a single char")
    this.area[y][x] = c
  }

  first(c: string): Point {
    assert(c.length === 1, "value must be a single char")
    const y = this.area.findIndex((row) => row.includes(c))
    const x = this.area[y].indexOf(c)
    return new Point(x, y)
  }

  ok(p: Point, condition?: (c: string) => boolean) {
    return condition === undefined || condition(this.get(p))
  }

  tiles(condition?: (c: string) => boolean): Point[] {
    const list: Point[] = []
    for (let y = 0; y <= this.maxY; y++) {
      for (let x = 0; x <= this.maxX; x++) {
        const p = new Point(x, y)
        if (this.ok(p, condition)) {
          list.push(p)
        }
      }
    }
    return list
  }

  groups(condition?: (c: string) => boolean): { [key: string]: Point[] } {
    return this.tiles(condition).reduce((acc, point) => {
      ;(acc[this.get(point)] ||= []).push(point)
      return acc
    }, {} as { [key: string]: Point[] })
  }

  neighbors4(p: Point, condition?: (c: string) => boolean): Point[] {
    return [
      p.move(Direction.N),
      p.move(Direction.E),
      p.move(Direction.S),
      p.move(Direction.W),
    ].filter((p) => this.contains(p) && this.ok(p, condition))
  }

  manhattan(
    p: Point,
    max: number,
    condition?: (c: string) => boolean,
  ): Point[] {
    const points: Point[] = []
    for (let x = -max; x <= max; x++) {
      for (let y = -max; y <= max; y++) {
        const n = p.moveXY(x, y)
        const d = p.manhattanDistance(n)
        if (this.contains(n) && d > 0 && d <= max && this.ok(n, condition))
          points.push(n)
      }
    }
    return points
  }
}
