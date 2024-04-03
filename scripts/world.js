const TILE_SIZE = 100;
const ROWS = 31;
const COLS = 41;

const AIR = 0;
const SPAWN = 1;
const WALL = 2;

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
        x2 = -ROWS * TILE_SIZE;
      } else {
        x2 = 2 * ROWS * TILE_SIZE;
      }

      y2 = slope * x2 + intercept;

      if ((player.pos.x === x1 && player.pos.y > y1) || y2 < 0) {
        y2 = Math.max(y2, -ROWS * TILE_SIZE);
      } else if ((player.pos.x === x1 && player.pos.y < y1) || y2 > HEIGHT) {
        y2 = Math.min(y2, 2 * ROWS * TILE_SIZE);
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
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (world[row][col] === SPAWN) {
        player.moveToRowCol(row, col);
        world[row][col] = AIR;
      }
    }
  }

  const tileQueue = [];
  const playerRowCol = player.getRowCol();
  const minRowCol = {
    x: Math.floor(cameraPos.x / TILE_SIZE),
    y: Math.floor(cameraPos.y / TILE_SIZE),
  };
  const maxRowCol = {
    x: minRowCol.x + Math.floor(WIDTH / TILE_SIZE) + 2,
    y: minRowCol.y + Math.floor(HEIGHT / TILE_SIZE) + 2,
  };

  // Because of wall shadows, the tiles need to be drawn in descending order of
  // distance from the player
  for (let row = minRowCol.y; row < maxRowCol.y; row++) {
    for (let col = minRowCol.x; col < maxRowCol.x; col++) {
      if (isInBounds(world, row) && isInBounds(world[row], col)) {
        tileQueue.push({ type: world[row][col], y: row, x: col });
      }
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
        isInBounds(world, cornerRow) &&
        isInBounds(world[cornerRow], cornerCol) &&
        world[cornerRow][cornerCol] === WALL
      ) {
        return true;
      }
    }
  }

  return false;
}
