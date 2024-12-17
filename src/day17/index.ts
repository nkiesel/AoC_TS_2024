import run from "aocrunner"

class Computer {
  a: bigint
  b: bigint
  c: bigint
  output: number[] = []
  instructionPointer = 0

  constructor(
    private initialA: bigint,
    private initialB: bigint,
    private initialC: bigint,
    public program: number[],
  ) {
    this.reset(initialA)
  }

  reset(a: bigint) {
    this.a = a
    this.b = this.initialB
    this.c = this.initialC
    this.instructionPointer = 0
    this.output = []
  }

  combo(operand: number): bigint {
    switch (operand) {
      case 4:
        return this.a
      case 5:
        return this.b
      case 6:
        return this.c
      default:
        return BigInt(operand)
    }
  }

  div(operand: number): bigint {
    return this.a >> this.combo(operand)
  }

  execute(na: bigint = this.initialA): string {
    this.reset(na)
    while (this.instructionPointer < this.program.length) {
      const opCode = this.program[this.instructionPointer]
      const operand = this.program[this.instructionPointer + 1]
      switch (opCode) {
        case 0:
          this.a = this.div(operand)
          break
        case 1:
          this.b = this.b ^ BigInt(operand)
          break
        case 2:
          this.b = this.combo(operand) % 8n
          break
        case 3:
          if (this.a !== 0n) this.instructionPointer = operand - 2
          break
        case 4:
          this.b = this.b ^ this.c
          break
        case 5:
          this.output.push(Number(this.combo(operand) % 8n))
          break
        case 6:
          this.b = this.div(operand)
          break
        case 7:
          this.c = this.div(operand)
          break
      }
      this.instructionPointer += 2
    }
    return this.output.join(",")
  }
}

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n")
  return new Computer(
    BigInt(lines[0].split(": ")[1]),
    BigInt(lines[1].split(": ")[1]),
    BigInt(lines[2].split(": ")[1]),
    lines[4]
      .split(": ")[1]
      .split(",")
      .map((n) => parseInt(n)),
  )
}

const part1 = (rawInput: string) => {
  const computer = parseInput(rawInput)
  return computer.execute()
}

const part2 = (rawInput: string) => {
  const computer = parseInput(rawInput)
  const ps = computer.program.join(",")
  let pi = ps.length - 1
  let a = 0n
  while (pi >= 0) {
    while (true) {
      const r = computer.execute(a)
      if (r === ps) {
        return Number(a)
      }
      let s = ps.substring(pi)
      if (r === s) {
        pi -= 2
        break
      }
      a++
    }
    a *= 8n
  }
  return -1
}

const sample1 = `
        Register A: 729
        Register B: 0
        Register C: 0

        Program: 0,1,5,4,3,0
`

const sample2 = `
        Register A: 2024
        Register B: 0
        Register C: 0

        Program: 0,3,5,4,3,0
`

run({
  part1: {
    tests: [
      {
        input: sample1,
        expected: "4,6,3,5,6,3,5,2,1,0",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample2,
        expected: 117440,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
