const ENEMY_SPEED = 0.125;
const ENEMY_TRACKING_DISTANCE = 1;
const ENEMY_RADIUS = 10;
const ENEMY_COOLDOWN_SECONDS = 1;

class Enemy {
  constructor(pos, playerToTrack, active = true) {
    this.pos = pos ?? {
      x: -1000,
      y: -1000,
    };

    this.active = active;
    this.player = playerToTrack;
    this.spawnPos = this.getRowCol();
    this.cooldown = null;

    this.vel = {
      x: 0,
      y: 0,
    };
  }

  /**
   * Updates the enemy
   */
  update = (deltaTime) => {
    if (!this.active) {
      return;
    }

    const nextPosX = {
      x: this.pos.x + this.vel.x * deltaTime,
      y: this.pos.y,
    };
    const nextPosY = {
      x: this.pos.x,
      y: this.pos.y + this.vel.y * deltaTime,
    };

    let hasEnemyCollisionX = false;
    let hasEnemyCollisionY = false;

    for (const enemy of enemies) {
      if (enemy !== this) {
        if (this.enemyCollision(nextPosX, enemy)) {
          hasEnemyCollisionX = true;
        }

        if (this.enemyCollision(nextPosY, enemy)) {
          hasEnemyCollisionY = true;
        }
      }
    }

    if (!wallCollision(nextPosX, ENEMY_RADIUS) && !hasEnemyCollisionX) {
      this.pos.x = nextPosX.x;
    }

    if (!wallCollision(nextPosY, ENEMY_RADIUS) && !hasEnemyCollisionY) {
      this.pos.y = nextPosY.y;
    }

    if (
      distanceSquared(this.pos, this.player.pos) <=
        (ENEMY_RADIUS + PLAYER_RADIUS) ** 2 &&
      !this.cooldown
    ) {
      this.player.damage(1);
      this.cooldown = setTimeout(
        () => (this.cooldown = null),
        ENEMY_COOLDOWN_SECONDS * 1000
      );
    }

    if (
      distanceSquared(this.getRowCol(), this.player.getRowCol()) <=
      ENEMY_TRACKING_DISTANCE ** 2
    ) {
      // Calculate speed to head directly towards the player
      const deltaX = Math.abs(this.pos.x - this.player.pos.x);
      const deltaY = Math.abs(this.pos.y - this.player.pos.y);

      let speedX, speedY;

      if (deltaX >= deltaY) {
        const slope = deltaY / deltaX;

        speedX = ENEMY_SPEED;
        speedY = speedX * slope;
      } else {
        const inverseSlope = deltaX / deltaY;

        speedY = ENEMY_SPEED;
        speedX = speedY * inverseSlope;
      }

      if (Math.abs(this.pos.x - this.player.pos.x) < ENEMY_RADIUS) {
        this.vel.x = 0;
      } else if (this.pos.x > this.player.pos.x) {
        this.vel.x = -speedX;
      } else if (this.pos.x < this.player.pos.x) {
        this.vel.x = speedX;
      } else {
        this.vel.x = 0;
      }

      if (Math.abs(this.pos.y - this.player.pos.y) < ENEMY_RADIUS) {
        this.vel.y = 0;
      } else if (this.pos.y > this.player.pos.y) {
        this.vel.y = -speedY;
      } else if (this.pos.y < this.player.pos.y) {
        this.vel.y = speedY;
      } else {
        this.vel.y = 0;
      }
    }
  };

  /**
   * Draws the enemy
   */
  draw = () => {
    if (!this.active) {
      return;
    }

    circle(this.pos.x, this.pos.y, ENEMY_RADIUS, "red");
  };

  /**
   * Destroys the enemy
   */
  destroy = () => {
    if (this.cooldown) {
      clearTimeout(this.cooldown);
    }
    this.active = false;
  };

  /**
   * Moves the enemy to the center of a row and column
   * @param {Number} row the row to move the player to
   * @param {Number} col the column to move the player to
   */
  moveToRowCol = (row, col) => {
    this.pos.x = col * TILE_SIZE + TILE_SIZE / 2;
    this.pos.y = row * TILE_SIZE + TILE_SIZE / 2;
  };

  /**
   * Gets the row and column that the enemy is currently inside of
   * @returns The row and column the enemy is in
   */
  getRowCol = () => {
    return {
      x: Math.floor(this.pos.x / TILE_SIZE),
      y: Math.floor(this.pos.y / TILE_SIZE),
    };
  };

  /**
   * Detects if this enemy is colliding with another
   * @param {Object} nextPos the next position of this enemy
   * @param {Number} enemy the enemy to check for a collision with
   * @returns true if collision, otherwise false
   */
  enemyCollision = (nextPos, enemy) => {
    return distanceSquared(nextPos, enemy.pos) < (2 * ENEMY_RADIUS) ** 2;
  };
}
