---
title: 'Array vs Linked List'
---

Contrasting `array` and a `linked list`

Compare using:

- usability
- time
- space

Array

- indice accessing
- easy to allocate memory
- there is no literal insert, only write
- have to manually adjust/offset array when trying to insert/delete
- fast performance to get/overwrite a value O(1)

Linked List

- always a linear search to get an item - no binary search - have to walk all of it
- better for when you just need to pop/push onto a queue/stack, not great for random access
  to traverse a linked lists you would have to do something like:

```js
get(idx: number): {
    let curr = this.head
    for (let i = 0; i < idx && curr; ++i){
        curr = curr.next
    }

    return curr?.value
}

```
