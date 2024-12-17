# 🎄 Advent of Code 2024 - day 17 🎄

## Info

Task description: [link](https://adventofcode.com/2024/day/17)

## Notes

Oh man, this conversion from Kotlin to TypeScript was a pain.  The issue was that while in Kotlin I used Long, here I
used number. However, while long values can easily be represented as numbers, bitwise operations like ^ or >> do not
produce the same results because these numbers are then internally not represented as 64 bit integers. So I had to
switch to BigInt. After that, it worked, although IntelliJ flags the bigint operations as errors.