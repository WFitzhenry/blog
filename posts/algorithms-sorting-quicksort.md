---
title: 'QuickSort'
socialImage: images/22-09-2021.jpg
---

Quick sort uses a divide and conquer technique, and sorts items in place - ie. it doesn't create a new array.

The algorithm picks a pivot element and rearranges the array so elements smaller than the pivot move to the left side of the pivot, and those greater to the right side. The algorithm then recursively sorts the subarrays on the left and right of the pivot element.

The algorithm generally runs in ==O(logN)==, but can also be ==O(n^2)== in the worst case.

![quicksort](/images/quicksort.jpeg)

The invariant in this algorithm is that everything to the left of the pivot is less than or equal to the pivot.

```js
function qs(arr: number[], lo: number, hi: number): void {
  // Base case where have reached only one item.
  if (lo >= hi) {
    return
  }

  // Get the pivot index and do first split of array into two.
  const pivotIdx = partition(arr, lo, hi)

  // Dont include the pivot (lo and hi are inclusive), and then recursively sort.
  qs(arr, lo, pivotIdx - 1)
  qs(arr, pivotIdx + 1, hi)
}

// This function produces the pivot index and moves items that are <= to one side and
// >= to the other side
function partition(arr: number[], lo: number, hi: number): number {
  // Our pivot is the high position
  const pivot = arr[hi]
  // We put our pointer at the beginning of the array.
  let idx = lo - 1

  // Do a weak sort of the subarry from the low to the high, not including the high (as this is the pivot)
  for (let i = lo; i < hi; ++i) {
    // Compare items to the pivot and move any items less than the pivot to the beginning of the array.
    // We do this by swopping the item to the idx position, and the item that was in the idx position.
    if (arr[i] <= pivot) {
      idx++
      const tmp = arr[i]
      arr[i] = arr[idx]
      arr[idx] = tmp
    }
  }

  // Now that all the smaller elements are at the beginning of the arr, we put the pivot where our index is,
  // so that the items to the right are greater than the pivot.
  idx++
  arr[hi] = arr[idx]
  arr[idx] = pivot
  return idx
}

/*
The algorithm picks a pivot element and rearranges the array so elements smaller than the pivot move to the
left side of the pivot, and those greater to the right side. The algorithm then recursively sorts the
subarrays on the left and right of the pivot element.
*/
export default function quick_sort(arr: number[]): void {
  // The low and the high index are inclusive
  qs(arr, 0, arr.length - 1)
}
```
