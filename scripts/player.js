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
 * Gets the row and column that the player is currently inside of
 * @returns The row and column the player is in
 */
function getPlayerRowCol() {
  return {
    row: Math.floor(playerPos.y / TILE_SIZE),
    col: Math.floor(playerPos.x / TILE_SIZE),
  };
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
