---
title: 'Queue'
---

A queue uses a `first in first out` method.

For ==a->b->c->d==, with `a` as the head (next item out of the queue) and `d` as the tail (last item added to queue).

If we wanted to add `e` to the queue, the current tail will point to `e`, and the `tail` pointer will now point to `e`.

```js
this.tail.next = e // current tail d now points to e
this.tail = e // update our tail pointer to e
```

==a->b->c->d->e==

Doing a `pop` operation is similar, we move the `head` pointer to the next value

```js
h = head // the current head a
head = head.next // the head moves onto the next item b
h.next = null // remove the reference from the item we removed
return h.val
```

Implementation of a queue in TypeScript

```js
// Create our node container
type Node<T> = {
  value: T,
  next?: Node<T>
}

export default class Queue<T> {
public length: number;
private head?: Node<T>
private tail?: Node<T>

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0
    }


    enqueue(item: T): void {
        const node = {value: item} as Node<T>
        // Increase the count of items
        this.length++;

        // If we don't have any items, then create one
        if (!this.tail){
            this.tail = this.head = node
            return;
        }

        // There is a tail already, update to now point to new tail
        this.tail.next = node;
        this.tail = node;
    }

    deque(): T | undefined {
        if (!this.head){
            return undefined
        }

        // Keep track of how many items we have
        this.length--;

        // Get a reference to the current head
        const head = this.head;

        // Update the head to point to the next item.
        this.head = this.head.next;

        // Javascript garbage collector should collect this as there are no more pointers to it.
        head.next = undefined

        // Return out the head value
        return head.value;
    }

```
