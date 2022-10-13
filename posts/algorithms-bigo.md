---
title: 'Big O Notation'
---

Big O is a way to categorize your algorithms time or memory requirements based on input. It is not meant to be an exact measurement. It will not tell you how many CPU cycles it takes, instead it is meant to generalize the growth of your algorithm.

Often it will help us make decisions about what data structures and algorithms to use. Knowing how they will perform can greatly help create the best possible program out there.

Important concept - growith is with respect to input

Example code:

```
function sum_char_codes(n: string): number {
    let sum = 0;
    for (let i = 0; i < n.length; ++i) {
        sum += n.charCodeAt(i);
    }

    return sum;
}
```

Here we have an ==N== relationship, or ==O(N) time complexity==.

For every 50% growth in the input (length of the string), we will have a 50% reduction in speed of the function.
