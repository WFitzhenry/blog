---
title: 'Linear Search'
socialImage: images/22-09-2021.jpg
---

A linear search will walk through an array until it finds what it is looking for.

It has ==O(N)== notation; the worst case is that it will have to go through all of the inputs.

```js
function linearSearch(haystack: number[], needle: number): boolean {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      return true
    }
  }
  return false
}
```
