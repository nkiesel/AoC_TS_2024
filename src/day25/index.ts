import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const locks: number[][] = []
  const keys: number[][] = []
  let nums: number[]
  input.forEach((line) => {
    if (nums === undefined) {
      const isLock = line === "#####"
      nums = Array(5).fill(isLock ? 0 : -1)
      ;(isLock ? locks : keys).push(nums)
    } else if (line.length === 0) {
      nums = undefined
    } else {
      line.split("").forEach((c, i) => (nums[i] += c === "#" ? 1 : 0))
    }
  })

  let count = 0
  for (const lock of locks) {
    for (const key of keys) {
      if (lock.every((l, i) => l + key[i] < 6)) count++
    }
  }
  return count
}

const sample1 = `
        #####
        .####
        .####
        .####
        .#.#.
        .#...
        .....

        #####
        ##.##
        .#.##
        ...##
        ...#.
        ...#.
        .....

        .....
        #....
        #....
        #...#
        #.#.#
        #.###
        #####

        .....
        .....
        #.#..
        ###..
        ###.#
        ###.#
        #####

        .....
        .....
        .....
        #....
        #.#..
        #.#.#
        #####
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 3,
      },
    ],
    solution: part1,
  },
  trimTestInputs: true,
  onlyTests: false,
})
