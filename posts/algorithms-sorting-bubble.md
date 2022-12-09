---
title: 'Bubble Sort'
socialImage: images/22-09-2021.jpg
---

Bubble sort will do a pass through an array, starting at the 0th position. At each step, we check whether then next item is smaller than
the current item. If it is, we swap the values. The largest value will always be pushed to the end of the array.

For each iteration, a portion will be sorted (the end), and unsorted (the beginning), so we only iterate over the unsorted items.

This will be ==O(n^2)==.

```js
function bubbleSort(arr: number[]): void {
  // Iterate over each element in the array
  for (let i = 0; i < arr.length; i++) {
    // For each element, check if it is larger than the next one.
    // We also exclude values already sorted,
    // which happens for each outer loop (i).
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // If it is, then swap the values.
        const tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
      }
    }
  }
}
```
