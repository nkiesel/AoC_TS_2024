import run from "aocrunner"
import { isEmpty, sum } from "lodash-es"

const parseInput = (rawInput: string) => {
  const orders: number[][] = []
  const updates: number[][] = []
  for (const line of rawInput.split("\n")) {
    if (line.includes("|")) {
      orders.push(line.split("|").map((i) => parseInt(i, 10)))
    } else if (line.includes(",")) {
      updates.push(line.split(",").map((i) => parseInt(i, 10)))
    }
  }
  return [orders, updates]
}

const part1 = (rawInput: string) => {
  const [orders, updates] = parseInput(rawInput)
  return sum(
    updates
      .filter((u) => isValid(u, orders))
      .map((u) => u[Math.floor(u.length / 2)]),
  )
}

const part2 = (rawInput: string) => {
  const [orders, updates] = parseInput(rawInput)
  return sum(
    updates
      .filter((u) => !isValid(u, orders))
      .map((u) => fixed(u, orders))
      .map((u) => u[Math.floor(u.length / 2)]),
  )
}

function isValid(update: number[], orders: number[][]): boolean {
  for (let i = 0; i < update.length; i++) {
    const page = update[i]
    const mustBeBefore = orders.filter((o) => o[1] === page).map((o) => o[0])
    if (!update.slice(0, i).every((it) => mustBeBefore.includes(it)))
      return false
  }
  return true
}

function fixed(update: number[], orders: number[][]): number[] {
  const fixed: number[] = []
  let lastCandidates: number[] = [...update]
  while (!isEmpty(lastCandidates)) {
    const last = lastCandidates.find(
      (i) => !orders.some((o) => o[0] === i && lastCandidates.includes(o[1])),
    )
    fixed.push(last)
    lastCandidates.splice(lastCandidates.indexOf(last), 1)
  }
  return fixed.reverse()
}

const sample1 = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample1,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
