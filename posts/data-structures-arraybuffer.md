---
title: 'Array Buffer'
---

In an array list, 0 is our `head` and length is our `tail`. Instead, we can have an indexed based head or tail.

![arraybuffer](/images/arraybuffer.jpeg)

In an array buffer, we can set the head and tail to any indexed items in the array. 

Its also a ring buffer, because we can set the tail before the head, instead of creating a new array to extend it.

Using the modulo operator (`%`), we can say ==this.tail % 5==. If our length is 10, and we set something at 12, then we can say 12 % 10 = 2, and we can set the tail at 2.


