# 🎄 Advent of Code 2024 - day 6 🎄

## Info

Task description: [link](https://adventofcode.com/2024/day/6)

## Notes

Slowly re-creating my Kotlin CharArea in TypeScript...

Otherwise, basically nothing done here but re-coding my Kotlin solution in TypeScript.

The one issue I ran into was that for part 2, I forgot to add the visited point + direction
to the visited set because the Kotlin `Set::add` returns `true` if added and `false` if not added,
while the TS Set add operation returns the updated set. Thus, I had to use `visited.has` and
then forgot to call `visted.add`, resulting in non-terminating loop.

Finally bit the bullet and implemented CharArea in TypeScript. Still suffering a little bit because
of some TypeScript limitations like not being able to add methods to enums or overriding `equals`
for classes. But made the code more readable, and pretty sure this class will again be useful later
this year.
