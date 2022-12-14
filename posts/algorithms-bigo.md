---
title: 'Big O Notation'
socialImage: images/quicksort.jpeg
topLevel: true
topLeveLTitle: 'Algorithms'
---

Big O is a way to categorize your algorithms time or memory requirements based on input. It is not meant to be an exact measurement. It will not tell you how many CPU cycles it takes, instead it is meant to generalize the growth of your algorithm.

Often it will help us make decisions about what data structures and algorithms to use. Knowing how they will perform can greatly help create the best possible program out there.

Important concept - growith is with respect to input

Example code:

```js
function sum_char_codes(n: string): number {
  let sum = 0
  for (let i = 0; i < n.length; ++i) {
    sum += n.charCodeAt(i)
  }

  return sum
}
```

Here we have an ==N== relationship, or ==O(N) time complexity==.

For every 50% growth in the input (length of the string), we will have a 50% reduction in speed of the function.

A simple trick is to look for loops - where do you loop over the input?

If the previous was ==O(N)==, then what is this?

```js
function sumCharCodes(n: string): number {
  let sum = 0
  for (let i = 0; i < n.length; ++i) {
    sum += n.charCodeAt(i)
  }

  for (let i = 0; i < n.length; ++i) {
    sum += n.charCodeAt(i)
  }

  return sum
}
```

Here we basically have ==O(2N)==, but we can drop the constant of 2 because we are interested in the growth of the algorithm, not necessarily what is actually happening.

```js
function sumCharCodes(n: string): number {
  let sum = 0
  for (let i = 0; i < n.length; ++i) {
    const charCode = n.charCodeAt(i)
    // Capital E
    if (charCode === 69) {
      return sum
    }

    sum += charCode
  }

  return sum
}
```

We terminate whenever a string has an E in it, which is likely, but it's still ==O(N)== because we consider the worst case scenario.

::: info
_Important Concepts_

1. Growth is with respect to the input
2. Constants are dropped
3. Worst case is usually the way we measure
   :::

![bigo](/images/bigo.jpeg)

Some more examples:

==O(N^2)==

```js
function sumCharCodes(n: string): number {
  let sum = 0
  for (let i = 0; i < n.length; ++i) {
    for (let j = 0; j < n.length; ++j) {
      sum += charCode
    }
  }

  return sum
}
```

==O(N^3)==

```js
function sumCharCodes(n: string): number {
  let sum = 0
  for (let i = 0; i < n.length; ++i) {
    for (let j = 0; j < n.length; ++j) {
      for (let k = 0; k < n.length; ++k) {
        sum += charCode
      }
    }
  }
  return sum
}
```

==O(n log n)==
quicksort

==O(log n)==
binary tree search
