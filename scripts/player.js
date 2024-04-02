let playerPos = {
  x: 0,
  y: 0,
};

/**
 * Moves the player to the center of a row and column
 * @param {Number} row the row to move the player to
 * @param {Number} col the column to move the player to
 */
function movePlayerToRowCol(row, col) {
  playerPos.x = col * TILE_SIZE + TILE_SIZE / 2;
  playerPos.y = row * TILE_SIZE + TILE_SIZE / 2;
}

/**
 * Draws the player
 */
function drawPlayer() {
  rect(
    playerPos.x - TILE_SIZE / 4,
    playerPos.y - TILE_SIZE / 4,
    TILE_SIZE / 2,
    TILE_SIZE / 2,
    "red"
  );
}
