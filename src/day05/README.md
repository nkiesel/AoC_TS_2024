# 🎄 Advent of Code 2024 - day 5 🎄

## Info

Task description: [link](https://adventofcode.com/2024/day/5)

## Notes

Ran into another TypeScript issue: the following function

```typescript
function broken(a: number[]) {
  a.forEach(v => { if (v < 0) return false })
  return true
}
```

always returns true. Thus, had to switch to
```typescript
function working(a: number[]) {
  for (let i = 0; i < a.length; i++) {
    const v = a[i]
    if (v < 0) return false
  }
  return true
}
```
