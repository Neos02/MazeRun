const PLAYER_SPEED = 0.4;
const PLAYER_RADIUS = 5;
const PLAYER_MAX_HEALTH = 10;

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

    this.health = PLAYER_MAX_HEALTH;
  }

  /**
   * Updates the player
   */
  update = (deltaTime) => {
    const nextPosX = this.pos.x + this.vel.x * deltaTime;
    const nextPosY = this.pos.y + this.vel.y * deltaTime;

    if (!wallCollision({ x: nextPosX, y: this.pos.y }, PLAYER_RADIUS)) {
      this.pos.x = nextPosX;
    }

    if (!wallCollision({ x: this.pos.x, y: nextPosY }, PLAYER_RADIUS)) {
      this.pos.y = nextPosY;
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
    circle(this.pos.x, this.pos.y, PLAYER_RADIUS, "blue");
  };

  /**
   * Damages the player
   * @param {Number} damage the amount of health to remove from the player
   */
  damage = (damage) => {
    this.health = Math.max(0, this.health - damage);
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
