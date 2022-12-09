---
title: 'Stack'
---

A stack is a singly linked list in which you only add and remove the head.

==a<-b<-c<-d== with `d` as the `head`, or the last item that was pushed into the stack.

Can think of this as:

![stack](/images/stack.jpeg)

```js
type Node<T> {
    value: T;
    prev?: Node<T>
}

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;



    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const node = {value: item} as Node<T>

        // Update the length
        this.length++

        // If we don't have a head, set it
        if (!this.head){
            this.head = node;
            return;
        }
        // new head points to prev head
        node.prev = this.head
        // update head pointer to new head
        this.head = node;
    }
    pop(): T | undefined {
        this.length = Math.max(0, this.length -1)

        if (this.length === 0 ){
            const head = this.head;
            this.head = undefined;
            return head?.value;
        }

        const head = this.head as Node<T>;
        this.head = head.prev;
        return head.value;
    }
    // what is at the head?
    peek(): T | undefined {
        return this.head?.value;
    }
}
```
