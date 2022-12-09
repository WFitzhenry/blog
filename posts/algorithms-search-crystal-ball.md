---
title: 'Crystal Ball Problem'
socialImage: images/22-09-2021.jpg
---

Given two crystal balls that will break if dropped from a high enough distance, determine the exact spot in which they will break in the most optimized way.

(If you're on a 100 storey building and have two crystal balls, determine which storey they will break).

We can generalize - we have array of floors with a value of false, and at some point the value becomes true. We are trying to find where this point is. There is a storey from which any higher you go,
they will always break, and below they won't break.

We have an ordered array, and a constraint of having 2 balls that will break.

Using linear search or binary search will give us ==O(N)==.

For binary search we can go to the midpoint. But what if only 1 crystal ball breaks? Then we need to go back and do a linear search on 1/2 N, so we have ==O(1/2N)==.

We drop the constants, so even if we do ==1/2 N==, the notation is still ==O(N)== as the worst case.

In this case, we are jumping, not cutting N in half.

If we jump by the sqrt of N, then we only have to walk back over the sqrt of N. Even if we did this multiple times, our big O notatation is ==O(sqrtN)==, which is much faster than ==O(N)==.

![crystalball](/images/crystalball.jpeg)

```js
export default function two_crystal_balls(breaks: boolean[]): number {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length))
  let i = jumpAmount

  // Find an index where both balls break.
  for (; i < breaks.length; i += jumpAmount) {
    if (breaks[i]) {
      break
    }
  }

  // We have found an index where both balls break,
  // now go back and do a linear search from the last know point that they didn't break.
  i -= jumpAmount
  for (let j = 0; j < jumpAmount && i < breaks.length; ++j, ++i) {
    if (breaks[i]) {
      return i
    }
  }

  // The balls don't break
  return -1
}
```
