/**
 * Generates a maze
 * @param {Number} rows the number of rows in the maze grid
 * @param {Number} cols the number of columns in the maze grid
 * @param {Number} enemySpawnPercentage the percentage of tiles that should be enemy spawns from 0-100
 * @returns a 2d array representing the maze
 */
function generateMaze(rows, cols, enemySpawnPercentage) {
  for (const enemy of enemies) {
    enemy.destroy();
  }

  enemies = [];

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
    grid[cell.y * 2 + 1][cell.x * 2 + 1] = AIR;
  }

  // // Generate start and end
  const sides = ["top", "left", "bottom", "right"];
  const startSide = Math.floor(Math.random() * sides.length);

  if (startSide === "top" || startSide === "bottom") {
    const startCol = randomInt(0, Math.floor(grid[0].length / 2) - 1) * 2 + 1;
    const finishCol = randomInt(0, Math.floor(grid[0].length / 2) - 1) * 2 + 1;

    if (startSide === "top") {
      grid[1][startCol] = SPAWN;
      grid[grid.length - 2][finishCol] = FINISH;
    } else {
      grid[grid.length - 2][startCol] = SPAWN;
      grid[1][finishCol] = FINISH;
    }
  } else {
    const startRow = randomInt(0, Math.floor(grid.length / 2)) * 2 + 1;
    const finishRow = randomInt(0, Math.floor(grid.length / 2)) * 2 + 1;

    if (startSide === "left") {
      grid[startRow][1] = SPAWN;
      grid[finishRow][grid[0].length - 2] = FINISH;
    } else {
      grid[startRow][grid[0].length - 2] = SPAWN;
      grid[finishRow][1] = FINISH;
    }
  }

  let enemySpawnerCount = Math.round(
    mazeRows * mazeCols * (enemySpawnPercentage / 100)
  );
  while (maze.length && enemySpawnerCount > 0) {
    const tileIndex = Math.floor(Math.random() * maze.length);
    const tile = maze.splice(tileIndex, 1)[0];
    const row = tile.y * 2 + 1;
    const col = tile.x * 2 + 1;

    if (grid[row][col] === AIR) {
      grid[row][col] = ENEMY_SPAWN;
      enemySpawnerCount--;
    }
  }

  return grid;
}

/**
 * Gets the coordinates of the surrounding tile and ensures they are
 * in bounds
 * @param {Number} mazeRows the number of rows in the maze
 * @param {Number} mazeCols the number of cols in the maze
 * @param {Number} row the row of the current cell
 * @param {Number} col the col of the current cell
 * @returns
 */
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
