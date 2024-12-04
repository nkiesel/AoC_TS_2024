# 🎄 Advent of Code 2024 - day 4 🎄

## Info

Task description: [link](https://adventofcode.com/2024/day/4)

## Notes

The one issue I ran into was that I first used a Set<number[]>, but `Set.has` returns false
in the following code
```typescript
const s: Set<number[]> = new Set()
s.add([1,2])
s.has([1,2])
```

I therefore implemented a `point` function which converts `[1,2]` into `"1-2"`.
