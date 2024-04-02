const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

const keyStates = {
  up: false,
  down: false,
  left: false,
  right: false,
};

/**
 * Sets a player's keyState for the provided keyCode to the specified value
 * @param {Number} keyCode the code of the key pressed
 * @param {Player} player the player to update
 * @param {Boolean} value the value to set
 */
function keySet(keyCode, player, value) {
  if (keyCode === player.keyMapping.up) {
    player.keyStates.up = value;
  }

  if (keyCode === player.keyMapping.down) {
    player.keyStates.down = value;
  }

  if (keyCode === player.keyMapping.left) {
    player.keyStates.left = value;
  }

  if (keyCode === player.keyMapping.right) {
    player.keyStates.right = value;
  }
}

/**
 * Event listener for keydown
 * @param {Event} evt Event generated on keydown
 */
function keyPressed(evt) {
  keySet(evt.keyCode, player, true);
}

/**
 * Event listener for keyup
 * @param {Event} evt Event generated on keyup
 */
function keyReleased(evt) {
  keySet(evt.keyCode, player, false);
}
