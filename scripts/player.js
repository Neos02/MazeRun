const PLAYER_SPEED = 0.1;

class Player {
  constructor({ keyMapping }) {
    this.keyMapping = keyMapping;

    this.pos = {
      x: -1000,
      y: -1000,
    };

    this.vel = {
      x: 0,
      y: 0,
    };

    this.keyStates = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }

  /**
   * Updates the player
   */
  update = (deltaTime) => {
    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;

    if (this.keyStates.up && !this.keyStates.down) {
      this.vel.y = -PLAYER_SPEED;
    } else if (this.keyStates.down && !this.keyStates.up) {
      this.vel.y = PLAYER_SPEED;
    } else {
      this.vel.y = 0;
    }

    if (this.keyStates.left && !this.keyStates.right) {
      this.vel.x = -PLAYER_SPEED;
    } else if (this.keyStates.right && !this.keyStates.left) {
      this.vel.x = PLAYER_SPEED;
    } else {
      this.vel.x = 0;
    }
  };

  /**
   * Draws the player
   */
  draw = () => {
    rect(
      this.pos.x - TILE_SIZE / 4,
      this.pos.y - TILE_SIZE / 4,
      TILE_SIZE / 2,
      TILE_SIZE / 2,
      "red"
    );
  };

  /**
   * Moves the player to the center of a row and column
   * @param {Number} row the row to move the player to
   * @param {Number} col the column to move the player to
   */
  moveToRowCol = (row, col) => {
    this.pos.x = col * TILE_SIZE + TILE_SIZE / 2;
    this.pos.y = row * TILE_SIZE + TILE_SIZE / 2;
  };

  /**
   * Gets the row and column that the player is currently inside of
   * @returns The row and column the player is in
   */
  getRowCol = () => {
    return {
      row: Math.floor(this.pos.y / TILE_SIZE),
      col: Math.floor(this.pos.x / TILE_SIZE),
    };
  };
}
