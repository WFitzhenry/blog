---
title: 'Trees'
---

A tree can be empty with no nodes, or a tree can be a strucure consisting of one node called the root and zero or more subtrees.

```js
Node<T>
 value: T
 children: []
```

Some terminology of trees:

- ==root== - the most parent node
- ==height== - the longest path from the root to the most child node
- ==binary tree== - a tree in which has at most 2 children, at least 0 children
- ==general tree== - a tree with 0 or more children
- ==binary search tree== - a tree which has a specific ordering to the nodes and at most 2 children leaves - a node without children
- ==leaves== - a node without children
- ==balanced tree== - a tree is perfectly balances when any nodes left and right children have the same height
- ==branching factor== - the amount of children a tree has.

A tree has nodes (containers of values) and edges (connecting lines). Relationships are parent-child. Bottom nodes (childless nodes) are leaves. Each parent has only one other node referencing it.

The top node is the root. The root is the only node from which you have a path to every other node. The root node is inherently the start of any tree.

Three important kinds of trees are:

- binary trees
- binary search trees
- heaps

In a ==binary tree==, each parent has zero, one or two nodes, i.e. each node has no more than two children, referred to as "left" and "right".

In a ==binary search tree==, each parent has zero, one or two nodes, and the value of any node is higher than the value of its left child and lower than the value of its right child. This BST relationship obtains for the whole tree and its subsections, allowing you to find a value without traversing the entire tree. While ordered arrays are just as fast as binary trees when searching data, binary trees are significantly faster when it comes to inserting and deleting data.

## Tree search and traversal

One way to search a tree is to do a ==breadth-first search (BFS)==. In a BFS you start with the root, move left to right across the second level, then move left to right across the third level, and so forth. A BFS uses additional memory because it is necessary to track the child nodes for all nodes on a given level while searching that level.

Another common way to search for a node is by using a ==depth-first search (DFS)==. A depth-first search follows one branch of the tree down as many levels as possible until the target node is found or the end is reached. When the search can't go down any farther, it is continued at the nearest ancestor with unexplored children. DFS has lower memory requirements than BFS because it is not necessary to store all the child pointers at each level.

If you have additional information on the likely location of your target node, one or the other of these algorithms may be more efficient. For instance, if your node is likely to be in the upper levels of the tree, BFS is most efficient. If the target node is likely to be in the lower levels of the tree, DFS has the advantage that it doesn't examine any single level last. (BFS always examines the lowest level last.)

A traversal is just like a search, except that instead of stopping when you find a particular target node, you visit every node in the tree. Often this is used to perform some operation on each node in the tree. The process of visiting every node in a data structure is known as "traversing" the data structure.

Two ways to traverse a tree:

Breadth-first traversal, also known as level-order traversal: We visit the nodes at a given level before going down to the nodes in the next level.

![bfs](/images/bfs.jpeg)

Depth-first traversal: We visit the child nodes before going to the next parent. It be pre-order, in-order or post-order traversal.

![dfs](/images/dfs.jpeg)

The three most common types of depth-first traversals for binary trees:

- **Pre-order**: Performs the operation first on the node itself, then on its left descendants, and finally on its right descendants. In other words, a node is always operated on before any of its descendants.
- **In-order**: Performs the operation first on the node's left descendants, then on the node itself, and finally on its right descendants. In other words, the left subtree is operated on first, then the node itself, and then the node's right subtree.
- **Post-order**: Performs the operation first on the node's left descendants, then on the node's right descendants, and finally on the node itself. In other words, a node is always operated on after all its descendants.

| Order      | Sequence          |
| ---------- | ----------------- |
| Pre-order  | root, left, right |
| In-order   | left, root, right |
| Post-order | left, right, root |

![predorder](/images/preorder.jpeg)
![indorder](/images/inorder.jpeg)
![postdorder](/images/postorder.jpeg)

## Tree traversals

We can visit all of the nodes on a tree using recursion.

```js
function walk(curr: BinaryNode<number> | null, path: number[]): void {
  if (!curr) {
    return
  }
  path.push(curr.value)
  walk(curr.left, path)
  walk(curr.right, path)
}

export default function in_order_search(head: BinaryNode<number>): number[] {
  const path: number[] = []
  walk(head, path)
  return path
}
```
