# 🎄 Advent of Code 2024 - day 1 🎄

## Info

Task description: [link](https://adventofcode.com/2024/day/1)

## Notes

Algorithm of course was very simple, but I struggled with the "count number of occurrences of a value in an array".
Lodash has a countBy, but that is more acting like a group counting, and returns NaN instead of 0 if none of the
items is the searched value.

After learning about unzip in Kotlin, I now learned that lodash also has an unzip method. Thus, updated the
parseInput to use that.

And finally replaced the complicated countBy with .filter().length, making the code now very similar to my Kotlin 
solution.
