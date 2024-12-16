import run from "aocrunner"
import { CharArea, Direction, fromChar, Point } from "../utils/CharArea.js"
import { sum } from "lodash-es"

type Data = {
  area: CharArea
  moves: Direction[]
}

const parseInput = (rawInput: string): Data => {
  const input = rawInput.split("\n\n")
  return {
    area: new CharArea(input[0]),
    moves: input[1]
      .replaceAll("\n", "")
      .split("")
      .map((c) => fromChar(c)),
  }
}

const part1 = (rawInput: string) => {
  const { area, moves } = parseInput(rawInput)
  let robot = area.first("@")
  area.set(robot, ".")

  moves.forEach((d) => {
    const n = robot.move(d)
    if (area.get(n) === ".") {
      robot = n
    } else if (area.get(n) === "O") {
      let b = n
      while (area.get(b) === "O") b = b.move(d)
      if (area.get(b) === ".") {
        area.set(n, ".")
        area.set(b, "O")
        robot = n
      }
    }
  })

  return sum(area.tiles((c) => c === "O").map((p) => p.y * 100 + p.x))
}

const part2 = (rawInput: string) => {
  const { area: orig, moves } = parseInput(rawInput)
  const area = widen(orig)
  let robot = area.first("@")
  area.set(robot, ".")

  moves.forEach((d) => {
    const n = robot.move(d)
    if (area.get(n) === ".") {
      robot = n
    } else if (area.get(n) !== "#") {
      switch (d) {
        case Direction.E:
        case Direction.W: {
          const west = d === Direction.W
          const [c, dx] = west ? ["]", -2] : ["[", 2]
          let b = n
          while (area.get(b) === c) b = b.moveXY(dx, 0)
          if (area.get(b) === ".") {
            area.set(n, ".")
            const [s, e] = west ? [b.x, n.x] : [n.x + 1, b.x]
            for (let x = s; x < e; x += 2) {
              area.setXY(x, n.y, "[")
              area.setXY(x + 1, n.y, "]")
            }
            robot = n
          }
          break
        }
        case Direction.N:
        case Direction.S: {
          if (push(area, n, d, false)) {
            push(area, n, d, true)
            robot = n
          }
          break
        }
      }
    }
  })

  return sum(area.tiles((c) => c === "[").map((p) => p.y * 100 + p.x))
}

function widen(orig: CharArea): CharArea {
  const area = new CharArea(
    Array(orig.maxY + 1)
      .fill(".".repeat((orig.maxX + 1) * 2))
      .join("\n"),
  )
  orig
    .tiles((c) => c !== ".")
    .forEach((t) => {
      const p1 = new Point(t.x * 2, t.y)
      const p2 = new Point(t.x * 2 + 1, t.y)
      switch (orig.get(t)) {
        case "#":
          area.set(p1, "#")
          area.set(p2, "#")
          break
        case "O":
          area.set(p1, "[")
          area.set(p2, "]")
          break
        case "@":
          area.set(p1, "@")
          break
      }
    })
  return area
}

function push(
  area: CharArea,
  p: Point,
  d: Direction,
  update: boolean,
): boolean {
  const l = area.get(p) === "]" ? p.moveXY(-1, 0) : p
  const r = l.moveXY(1, 0)
  const nl = l.move(d)
  const nr = r.move(d)
  if (area.get(nl) === "#" || area.get(nr) === "#") return false
  const ok =
    (area.get(nl) === "." || push(area, nl, d, update)) &&
    (area.get(nr) === "." || push(area, nr, d, update))
  if (ok && update) {
    area.set(nl, "[")
    area.set(nr, "]")
    area.set(l, ".")
    area.set(r, ".")
  }
  return ok
}

const sample1 = `
        ########
        #..O.O.#
        ##@.O..#
        #...O..#
        #.#.O..#
        #...O..#
        #......#
        ########

        <^^>>>vv<v>>v<<
`

const sample2 = `
        #######
        #...#.#
        #.....#
        #..OO@#
        #..O..#
        #.....#
        #######

        <vv<<^^<<^^
`

const sample3 = `
        ##########
        #..O..O.O#
        #......O.#
        #.OO..O.O#
        #..O@..O.#
        #O#..O...#
        #O..O..O.#
        #.OO.O.OO#
        #....O...#
        ##########

        <vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
        vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
        ><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
        <<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
        ^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
        ^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
        >^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
        <><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
        ^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
        v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 2028,
      },
      {
        input: sample3,
        expected: 10092,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample2,
        expected: 618,
      },
      {
        input: sample3,
        expected: 9021,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
