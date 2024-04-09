const TILE_SIZE = 150;
const ROWS = 31;
const COLS = 41;

const AIR = 0;
const SPAWN = 1;
const WALL = 2;
const FINISH = 3;
const ENEMY_SPAWN = 4;

const WALL_COLOR_TOP_BOTTOM = "rgb(30, 30, 40)";
const WALL_COLOR_LEFT_RIGHT = "rgb(40, 40, 50)";
const GROUND_COLOR = "lightgray";

/**
 * Draws the tile at the row and column
 * @param {Number} tile the tile to draw
 * @param {Number} row the row to draw the tile at
 * @param {Number} col the column to draw the tile at
 */
function handleTile(tile, row, col) {
  switch (tile) {
    case AIR:
      break;
    case WALL:
      drawWall(row, col);
      break;
    case FINISH:
      rect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE, "blue");
      break;
    case ENEMY_SPAWN:
      spawnEnemy(row, col);
      break;
    default:
  }
}

/**
 * Draws the world
 */
function drawWorld() {
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
    handleTile(tile.type, tile.y, tile.x);
  }
}

/**
 * Draws a wall at the specified row and column
 * @param {Number} row the row to draw the wall at
 * @param {Number} col the column to draw the wall at
 */
function drawWall(row, col) {
  const lines = [];
  const minY = -ROWS * TILE_SIZE;
  const maxY = 2 * ROWS * TILE_SIZE;
  const minX = -COLS * TILE_SIZE;
  const maxX = 2 * COLS * TILE_SIZE;

  // Add shadow effect to walls
  for (let xOffset = 0; xOffset <= 1; xOffset++) {
    for (let yOffset = 0; yOffset <= 1; yOffset++) {
      const x1 = (col + xOffset) * TILE_SIZE;
      const y1 = (row + yOffset) * TILE_SIZE;

      let x2, y2;

      if (player.pos.x === x1) {
        x2 = x1;

        y2 = player.pos.y > y1 ? minY : maxY;
      } else {
        const slope = (y1 - player.pos.y) / (x1 - player.pos.x);
        const intercept = y1 - slope * x1;

        x2 = player.pos.x > x1 ? minX : maxX;
        y2 = Math.max(Math.min(slope * x2 + intercept, maxY), minY);

        if (slope === 0) {
          x2 = player.pos.x > x1 ? -ROWS * TILE_SIZE : 2 * ROWS * TILE_SIZE;
        } else {
          x2 = (y2 - intercept) / slope;
        }
      }

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
  rect(
    col * TILE_SIZE,
    row * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE,
    WALL_COLOR_TOP_BOTTOM
  );
  polygon(
    lines[0].p1.x === lines[2].p1.x
      ? WALL_COLOR_LEFT_RIGHT
      : WALL_COLOR_TOP_BOTTOM,
    lines[0].p1,
    lines[0].p2,
    lines[2].p2,
    lines[2].p1
  );
  polygon(
    lines[0].p1.x === lines[2].p1.x
      ? WALL_COLOR_TOP_BOTTOM
      : WALL_COLOR_LEFT_RIGHT,
    lines[0].p1,
    lines[0].p2,
    lines[1].p2,
    lines[1].p1
  );
}

function drawGround() {
  rect(0, 0, COLS * TILE_SIZE, ROWS * TILE_SIZE, GROUND_COLOR);
}

/**
 * Spawns the player in
 */
function spawnPlayer() {
  // Spawn player in
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (world[row][col] === SPAWN) {
        playerStartCoords = {
          x: col,
          y: row,
        };

        player.moveToRowCol(row, col);
        world[row][col] = AIR;
      }
    }
  }
}

/**
 * Handles enemy spawning for a tile
 * @param {Number} row the row of the tile
 * @param {Number} col the spawn of the  tile
 */
function spawnEnemy(row, col) {
  if (
    world[row][col] === ENEMY_SPAWN &&
    !enemies.filter((e) => e.spawnPos.x === col && e.spawnPos.y === row).length
  ) {
    const newEnemy = new Enemy(
      {
        x: col * TILE_SIZE + TILE_SIZE / 2,
        y: row * TILE_SIZE + TILE_SIZE / 2,
      },
      player,
      true
    );

    enemies.push(newEnemy);
  }
}

function wallCollision(nextPosition, radius) {
  // Iterate through corners in the order: top left, bottom left, top right, bottom right
  for (let i = 0; i <= 1; i++) {
    for (let j = 0; j <= 1; j++) {
      const cornerRow = Math.floor(
        (nextPosition.y + radius * (-0.5 + j)) / TILE_SIZE
      );
      const cornerCol = Math.floor(
        (nextPosition.x + radius * (-0.5 + i)) / TILE_SIZE
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
