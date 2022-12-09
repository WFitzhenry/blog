---
title: 'Binary Search'
socialImage: images/22-09-2021.jpg
---

Once an array is ordered, we can take advantage of certain algorithms for searching.

Binary search is an efficient algorithm for finding an item from a sorted list of items.

If the input halves at each step, its likely to be ==O(logN)== or ==O(NlogN)==.

```js
function binarySearch(haystack: number[], needle: number): boolean {
  // Low is inclusive index
  let low = 0
  // High is exclusive index
  let high = haystack.length

  do {
    // Find the midpoint index
    const m = Math.floor(low + (high - low) / 2)
    // Get the midpoint value
    const v = haystack[m]

    if (v === needle) {
      // We have found the needle.
      return true
    } else if (v > needle) {
      // Our needle has a lower value than the midpoint.
      // Set high to the current midpoint index (exclusive).
      high = m
    } else {
      // Our needle has a higher value than the midpoint.
      // Set low to the current midpoint + 1
      // as low is inclusive we have already checked it.
      low = m + 1
    }
  } while (low < high)

  return false
}
```
