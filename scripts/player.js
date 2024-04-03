const PLAYER_SPEED = 0.2;
const PLAYER_WIDTH = 10;
const PLAYER_HEIGHT = 10;

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
    const nextPosX = this.pos.x + this.vel.x * deltaTime;
    const nextPosY = this.pos.y + this.vel.y * deltaTime;

    if (!playerWallCollision({ x: nextPosX, y: this.pos.y })) {
      this.pos.x = nextPosX;
    } else {
      this.vel.x *= 0.05;
    }

    if (!playerWallCollision({ x: this.pos.x, y: nextPosY })) {
      this.pos.y = nextPosY;
    } else {
      this.vel.y *= 0.05;
    }

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

    cameraFollow(this);
  };

  /**
   * Draws the player
   */
  draw = () => {
    rect(
      this.pos.x - PLAYER_WIDTH / 2,
      this.pos.y - PLAYER_HEIGHT / 2,
      PLAYER_WIDTH,
      PLAYER_HEIGHT,
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
      x: Math.floor(this.pos.x / TILE_SIZE),
      y: Math.floor(this.pos.y / TILE_SIZE),
    };
  };
}
