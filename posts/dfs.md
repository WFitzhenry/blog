---
title: 'Depth First Search'
metaTitle: 'Next.js page options and how they work'
metaDesc: 'How to use pages in Next.js exploring the options'
socialImage: images/22-09-2021.jpg
date: '2021-09-22'
tags:
  - nextjs
key: 2
---


## Depth First Search in JavaScript

```js
function getAllNodesInTreee(startNode: string): string[] {
  const nodes: string[] = []

  function dfs(eventId: string): void {
    nodes.push(eventId)

    const initialSource = getSource(eventId)
    if (initialSource !== undefined) {
      initialSource.forEach((event) => {
        if (!sources.includes(event)) {
          dfs(event)
        }
      })
    }
  }

  getAllSourceEvents(id)

  return nodes
}
```
