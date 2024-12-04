import run from "aocrunner"

const point = (x: number, y: number): string => `${x},${y}`
const tniop = (p: string): number[] => p.split(",").map((it) => parseInt(it, 10))

const parseInput = (rawInput: string): Set<string>[] => {
  const allX = new Set<string>()
  const allM = new Set<string>()
  const allA = new Set<string>()
  const allS = new Set<string>()
  rawInput.split("\n").forEach((row, y) =>
    row.split("").forEach((c, x) => {
      const p = point(x, y)
      switch (c) {
        case "X": allX.add(p); break
        case "M": allM.add(p); break
        case "A": allA.add(p); break
        case "S": allS.add(p); break
      }
    }),
  )
  return [allX, allM, allA, allS]
}

const part1 = (rawInput: string) => {
  const [allX, allM, allA, allS] = parseInput(rawInput)
  let count = 0
  allX.forEach((p) => {
    const [x, y] = tniop(p)
    for (const [dx, dy] of [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]) {
      if (
        allM.has(point(x + dx * 1, y + dy * 1)) &&
        allA.has(point(x + dx * 2, y + dy * 2)) &&
        allS.has(point(x + dx * 3, y + dy * 3))
      )
        count++
    }
  })
  return count
}

const part2 = (rawInput: string) => {
  const [_, allM, allA, allS] = parseInput(rawInput)
  let count = 0
  allA.forEach((p) => {
    const [x, y] = tniop(p)
    const tl = point(x - 1, y - 1)
    const tr = point(x + 1, y - 1)
    const bl = point(x - 1, y + 1)
    const br = point(x + 1, y + 1)
    if ((allM.has(tl) && allS.has(br) || allS.has(tl) && allM.has(br)) &&
      (allM.has(tr) && allS.has(bl) || allS.has(tr) && allM.has(bl))) count++
  })
  return count
}

const sample1 = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample1,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
