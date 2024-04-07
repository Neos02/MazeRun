const player = new Player({
  keyMapping: {
    up: KEY_W,
    down: KEY_S,
    left: KEY_A,
    right: KEY_D,
  },
});

const enemies = [];
const ENEMY_SPAWN_PERCENTAGE = 40;

const world = generateMaze(ROWS, COLS, ENEMY_SPAWN_PERCENTAGE);

/**
 * Responsible for updating the game
 * @param {Number} deltaTime the time in milliseconds since the last frame
 */
function update(deltaTime) {
  player.update(deltaTime);

  for (const enemy of enemies) {
    enemy.update(deltaTime);
  }
}

/**
 * Responsible for drawing items to the screen
 */
function draw() {
  ctx.save();
  ctx.translate(-cameraPos.x, -cameraPos.y);

  drawGround();

  player.draw();

  for (const enemy of enemies) {
    enemy.draw();
  }

  drawWorld();

  ctx.restore();
}

/**
 * The main gameloop. Computes the deltatime and passes it to the update function.
 * Calls draw and update.
 * @param {Date} timestamp the current timestamp
 */
function loop(timestamp) {
  const deltaTime = timestamp - prevTime;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  update(deltaTime);
  draw();

  showFps(deltaTime);
  showHealth(player);

  prevTime = timestamp;

  window.requestAnimationFrame(loop);
}

/**
 * Computes and displays the FPS
 * @param {Number} deltaTime the time in milliseconds since the last frame
 */
function showFps(deltaTime) {
  ctx.fillStyle = "gray";
  ctx.fontWeight = 20;
  ctx.fillText(`FPS: ${Math.round(1000 / deltaTime)}`, 20, 13);
}

/**
 * Displays the player's health
 * @param {Player} player the player to show health for
 */
function showHealth(player) {
  ctx.fillStyle = "gray";
  ctx.fontWeight = 20;
  ctx.fillText(`Health: ${player.health}`, 100, 13);
}
