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
      player.moveToRowCol(row, col);
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

  let gameCorner;

  // Add shadow effect to walls
  for (let xOffset = 0; xOffset <= 1; xOffset++) {
    for (let yOffset = 0; yOffset <= 1; yOffset++) {
      const x1 = (col + xOffset) * TILE_SIZE;
      const y1 = (row + yOffset) * TILE_SIZE;

      const slope = (y1 - player.pos.y) / (x1 - player.pos.x);
      const intercept = y1 - slope * x1;

      let x2, y2;

      if (player.pos.x === x1) {
        x2 = x1;
      } else if (player.pos.x > x1) {
        x2 = -WIDTH;
      } else {
        x2 = 2 * WIDTH;
      }

      y2 = slope * x2 + intercept;

      if ((player.pos.x === x1 && player.pos.y > y1) || y2 < 0) {
        y2 = Math.max(y2, -HEIGHT);
      } else if ((player.pos.x === x1 && player.pos.y < y1) || y2 > HEIGHT) {
        y2 = Math.min(y2, 2 * HEIGHT);
      }

      x2 = (y2 - intercept) / slope;

      lines.push({
        p1: { x: x1, y: y1 },
        p2: { x: x2, y: y2 },
      });
    }
  }

  lines.sort(
    (a, b) =>
      distanceSquared(a.p1, player.pos) - distanceSquared(b.p1, player.pos)
  );

  // Draw polygons for shadow effect
  polygon(wallColor, lines[0].p1, lines[0].p2, lines[1].p2, lines[1].p1);
  polygon(wallColor, lines[0].p1, lines[0].p2, lines[2].p2, lines[2].p1);
  polygon(wallColor, lines[1].p2, lines[0].p2, lines[2].p2, lines[3].p2);

  rect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE, wallColor);
}

/**
 * Draws the world
 */
function drawWorld() {
  const tileQueue = [];
  const playerRowCol = player.getRowCol();

  // Because of wall shadows, the tiles need to be drawn in descending order of
  // distance from the player
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      tileQueue.push({ type: currentLevel[row][col], y: row, x: col });
    }
  }

  // Draw tiles further from the player first
  tileQueue.sort(
    (a, b) =>
      distanceSquared(b, playerRowCol) - distanceSquared(a, playerRowCol)
  );

  for (const tile of tileQueue) {
    drawTile(tile.type, tile.y, tile.x);
  }
}

function playerWallCollision(nextPosition) {
  // Iterate through corners in the order:
  // top left
  // bottom left
  // top right
  // bottom right
  for (let i = 0; i <= 1; i++) {
    for (let j = 0; j <= 1; j++) {
      const cornerRow = Math.floor(
        (nextPosition.y + PLAYER_HEIGHT * (-0.5 + j)) / TILE_SIZE
      );
      const cornerCol = Math.floor(
        (nextPosition.x + PLAYER_WIDTH * (-0.5 + i)) / TILE_SIZE
      );

      if (
        isInBounds(currentLevel, cornerRow) &&
        isInBounds(currentLevel[cornerRow], cornerCol) &&
        currentLevel[cornerRow][cornerCol] === WALL
      ) {
        return true;
      }
    }
  }

  return false;
}
