---
title: 'Array List'
---

We can make our own implementation of array list, which has all the functionality of a linked list, but the underlying data structure is an array.

Growing the array, or pushing in values that are longer than the capacity of the array, means we will have to create a new array and copy the existing values across.

`[a, b, c, d]`, with a length of 4 and capacity of, say, 6. Pushing in 3 extra values, will means we need to create a new array with a higher capacity.

Doing an `enqueue`, we can't just write over the initial value. We need to move over 1 each item, before we insert at the front of the list.

`[e, a, b, c, d]`.

For `dequeue`, we have to do a similar operation by moving each item to the left.

`[b, c, d]`

Array lists are good for `push` and `pop`, but not good for `enqueue` and `dequeue`.

You do get random access with an array list (give me index 3).

Using `shift`, `unshift` for a Javascript array for example - it means you are fundamentally having to shift everything in the array into a new array.
