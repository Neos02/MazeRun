const TILE_SIZE = 20;

function drawTile(tile, row, col) {
  switch (tile) {
    case AIR:
      break;
    case SPAWN:
      rect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE, "red");
      break;
    case WALL:
      rect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE, "black");
      break;
    default:
  }
}

function drawWorld(level) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      drawTile(level[rowColToIndex(row, col)], row, col);
    }
  }
}

function rowColToIndex(row, col) {
  return row * COLS + col;
}
