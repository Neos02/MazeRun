const cameraPos = { x: 0, y: 0 };

/**
 * Sets the camera to follow the specified player
 * @param {Player} player
 */
function cameraFollow(player) {
  cameraPos.x = player.pos.x - WIDTH / 2;
  cameraPos.y = player.pos.y - HEIGHT / 2;
}
