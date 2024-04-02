const player = new Player({
  keyMapping: {
    up: KEY_W,
    down: KEY_S,
    left: KEY_A,
    right: KEY_D,
  },
});

/**
 * Responsible for updating the game
 * @param {Number} deltaTime the time in milliseconds since the last frame
 */
function update(deltaTime) {
  player.update(deltaTime);
}

/**
 * Responsible for drawing items to the screen
 */
function draw() {
  drawWorld(currentLevel);
  player.draw();
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

  prevTime = timestamp;

  window.requestAnimationFrame(loop);
}

/**
 * Computes and displays the FPS
 * @param {Number} deltaTime the time in milliseconds since the last frame
 */
function showFps(deltaTime) {
  ctx.fillStyle = "black";
  ctx.fontWeight = 20;
  ctx.fillText(`FPS: ${Math.round(1000 / deltaTime)}`, 0, 10);
}
