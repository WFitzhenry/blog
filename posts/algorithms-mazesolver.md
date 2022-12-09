---
title: 'Recursive Maze Solver'
---

We'll use recursion to find path through a matrix of string values.The simplest way to think of recursion is a function that calls itself until the problem is solved. This usually
involves what is referred to as a 'base case'. A base case is the point in which the problem is solved at.

Simple recursive example

```js
function foo(n: number): number {
  // base case
  if (n === 1) {
    return 1
  }

  // recurse
  return n + foo(n - 1)
}
```

Recursion can be broken down into 3 steps:

1. pre (do something before you recurse -> n + )
2. recurse (calling of function)
3. post

## Using recursion to solve a maze

Find the correct path through the maze.

```js
const maze = [
  'xxxxxxxxxx x',
  'x        x x',
  'x        x x',
  'x xxxxxxxx x',
  'x          x',
  'x xxxxxxxxxx',
]
```

// Base case: 1. Its a wall 2. off the map 3. its the end 4. if we have seen it

```js
// Recursive step
// Go in all directions

const dir = [
[-1,0],
[1,0],
[0,-1],
[0,1]
]

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
// 1. base case
// off the map
if (curr.x < 0 || curr.x >= maze[0].length ||
curr.y < 0 || curr.y >= maze.length){
return false
}
// on a wall
if (maze[curr.y][curr.x] === wall){
return false
}

    // reached the end
    if (curr.x === end.x && curr.y === end.y){
        path.push(end)
        return true
    }

    if (seen[curr.y][curr.x]){
        return false
    }

    // 2. recurse
    // pre, recurse, post

    // pre
    seen[curr.y][curr.x] = true
    path.push(curr);

    // recurse
    for (let i = 0; i < dir.length; ++i){
        const [x,y] = dir[i];
        if (walk(maze, wall, {
            x: curr.x + x,
            y: curr.y - y
        }, end, seen, path )){
            return true
        }
    }

    // post
    path.pop()

    return false

}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
/_
const maze = [
"xxxxxxxxxx x",
"x x x",
"x x x",
"x xxxxxxxx x",
"x x",
"x xxxxxxxxxx",
];
_/

const seen: boolean[][] = []
const path: Point[] = []

for (let i = 0; i < maze.length; ++i){
seen.push(new Array(maze[i].length).fill(false))
}

walk(maze, wall, start, end, seen, path)

return path
}
```

```

```
