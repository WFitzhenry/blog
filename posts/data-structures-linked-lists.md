---
title: 'Linked Lists'
---

A series of values organized is such a way that if you visit one node, it will point to the next node.

In typescript we can think of a node as a container around an item.

For a generic value T, we can wrap it in a container that points to another node.

For a single linked list (a points to b, b points to c...)

![singlelinkedlist](/images/singlelinkedlist.jpeg)

```js
node<T> {
 val: T;
 next?: node<T>;
}
```

A doubly linked lists will be bi-directional.

```js
node<T> {
 val: T;
 next?: node<T>;
 prev?: node<T>;
}
```

What about insertion and deletion?

==a->b->c->d==

If we wanted to insert f into the position that b is in?

`a` needs to point to `f`  
`f` needs to point to `a`  
`b` needs to point to `f`  
`f` needs to point to `b`

That's it, we had to set a bunch of `next` and `prev` - nothing to do with the length of the entire list.
If you set a piece of memory on an object, its constant time.
Therefore to insert inside of a linked list is ==O(1)==

Similarly for deletion, we reset the previous `next` value and the following `prev` value.

`b.next = c.next`  
`c.prev = c.prev`  
`c.prev = n.next = null`

There is no index -> you can traverse nodes by looking at their `next` and `prev` values.

## Linked List complexity

To get a value, we can't just call an index, we'd have to walk the list.

Get head/tail -> pointers that point to the first and last node.

Weakness -> deletion in the middle can be costly - we have to traverse to the middle point before doing our operations.

A general API:

```js
interface LinkedList<T> {
  get length(): number;
  insertAt(item: T, index: number): void;
  remove(item: T): T | undefined;
  removeAt(index: number): T | undefined;
  append(item: T): void;
  prepend(item: T): void;
  get(index: number): T | undefined;
}
```
