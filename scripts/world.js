const TILE_SIZE = 20;

/**
 * Draws the tile at the row and column
 * @param {Number} tile the tile to draw
 * @param {Number} row the row to draw the tile at
 * @param {Number} col the column to draw the tile at
 */
function drawTile(tile, row, col) {
  switch (tile) {
    case AIR:
      break;
    case SPAWN:
      movePlayerToRowCol(row, col);
      currentLevel[row][col] = AIR;
      break;
    case WALL:
      drawWall(row, col);
      break;
    default:
  }
}

/**
 * Draws a wall at the specified row and column
 * @param {Number} row the row to draw the wall at
 * @param {Number} col the column to draw the wall at
 */
function drawWall(row, col) {
  const wallColor = "black";
  const lines = [];

  for (let xOffset = 0; xOffset <= 1; xOffset++) {
    for (let yOffset = 0; yOffset <= 1; yOffset++) {
      const x1 = (col + xOffset) * TILE_SIZE;
      const y1 = (row + yOffset) * TILE_SIZE;

      const slope = (y1 - playerPos.y) / (x1 - playerPos.x);
      const intercept = y1 - slope * x1;

      let x2, y2;

      if (playerPos.x === x1) {
        x2 = x1;

        if (playerPos.y > y1) {
          y2 = HEIGHT;
        } else {
          y2 = 0;
        }
      } else if (playerPos.x > x1) {
        x2 = 0;
        y2 = slope * x2 + intercept;
      } else {
        x2 = WIDTH;
        y2 = slope * x2 + intercept;
      }

      lines.push({
        p1: { x: x1, y: y1 },
        p2: { x: x2, y: y2 },
      });
    }
  }

  lines.sort(
    (a, b) =>
      distanceSquared(a.p1, playerPos) - distanceSquared(b.p1, playerPos)
  );

  polygon(wallColor, lines[0].p1, lines[0].p2, lines[3].p2, lines[3].p1);
  polygon(wallColor, lines[1].p1, lines[1].p2, lines[2].p2, lines[2].p1);

  rect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE, wallColor);
}

/**
 * Draws the specified level
 * @param {Number[][]} level the level to draw
 */
function drawWorld(level) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      drawTile(level[row][col], row, col);
    }
  }
}
