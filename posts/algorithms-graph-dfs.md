---
title: 'Depth First Search'
socialImage: images/22-09-2021.jpg
---

/i/https://codepen.io/brisad/embed/dmMoYw?default-tab=result&editable=true

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
