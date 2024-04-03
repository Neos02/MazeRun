function generateMaze(rows, cols) {
  const grid = new Array(rows).fill().map(() => new Array(cols).fill(WALL));
  const maze = [];
  const frontier = [];

  const mazeRows = Math.floor(rows / 2);
  const mazeCols = Math.floor(cols / 2);

  maze.push({
    x: Math.floor(Math.random() * mazeCols),
    y: Math.floor(Math.random() * mazeRows),
  });

  frontier.push(...getSurrounding(mazeRows, mazeCols, maze[0].y, maze[0].x));

  while (frontier.length > 0) {
    const index = Math.floor(Math.random() * frontier.length);
    const cell = frontier.splice(index, 1)[0];
    const surrounding = getSurrounding(mazeRows, mazeCols, cell.y, cell.x);

    maze.push(cell);

    const neighbors = maze.filter((value) =>
      surrounding.some((item) => comparePoints(item, value))
    );
    const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

    if (neighbors.length) {
      maze.push({
        x: (cell.x + neighbor.x) / 2,
        y: (cell.y + neighbor.y) / 2,
      });
    }

    for (const surroundingCell of surrounding) {
      if (
        !maze.some((item) => comparePoints(item, surroundingCell)) &&
        !frontier.some((item) => comparePoints(item, surroundingCell))
      ) {
        frontier.push(surroundingCell);
      }
    }
  }

  for (const cell of maze) {
    grid[cell.y * 2 + 1][cell.x * 2 + 1] = SPAWN;
  }

  return grid;
}

function getSurrounding(mazeRows, mazeCols, row, col) {
  const surrounding = [
    { y: row - 1, x: col },
    { y: row + 1, x: col },
    { y: row, x: col - 1 },
    { y: row, x: col + 1 },
  ];

  for (let i = 0; i < surrounding.length; i++) {
    if (
      surrounding[i].y < 0 ||
      surrounding[i].y >= mazeRows ||
      surrounding[i].x < 0 ||
      surrounding[i].x >= mazeCols
    ) {
      surrounding.splice(i, 1);
      i--;
    }
  }

  return surrounding;
}
