const STATE_MAIN_MENU = 0;
const STATE_PLAYING = 1;
const STATE_GAME_OVER = 2;
const STATE_WIN = 3;

const player = new Player({
  keyMapping: {
    up: KEY_W,
    down: KEY_S,
    left: KEY_A,
    right: KEY_D,
  },
});

const ENEMY_SPAWN_PERCENTAGE = 40;

let enemies = [];
let world = generateMaze(ROWS, COLS, ENEMY_SPAWN_PERCENTAGE);
let gameState = STATE_MAIN_MENU;

/**
 * Responsible for updating the game
 * @param {Number} deltaTime the time in milliseconds since the last frame
 */
function update(deltaTime) {
  spawnPlayer();

  player.update(deltaTime);

  for (const enemy of enemies) {
    enemy.update(deltaTime);
  }

  if (player.health <= 0) {
    lose();
  }

  const playerRowCol = player.getRowCol();

  if (world[playerRowCol.y][playerRowCol.x] === FINISH) {
    win();
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
 * Starts the game
 */
function start() {
  clickSound.play();

  mainMenu.classList.add("hidden");

  countdownSound.play();
}

/**
 * Goes to the game over screen
 */
function lose() {
  music.pause();
  deathSound.play();

  gameOver.classList.remove("hidden");

  gameState = STATE_GAME_OVER;
}

/**
 * Goes to the win screen
 */
function win() {
  music.pause();
  winSound.play();

  finish.classList.remove("hidden");

  gameState = STATE_WIN;
}

/**
 * Resets the game
 */
function reset() {
  clickSound.play();

  gameOver.classList.add("hidden");
  finish.classList.add("hidden");

  for (const enemy of enemies) {
    enemy.destroy();
  }

  enemies = [];

  player.health = PLAYER_MAX_HEALTH;
  world = generateMaze(ROWS, COLS, ENEMY_SPAWN_PERCENTAGE);

  update(10);
  draw();

  countdownSound.play();
}

/**
 * The main gameloop. Computes the deltatime and passes it to the update function.
 * Calls draw and update.
 * @param {Date} timestamp the current timestamp
 */
function loop(timestamp) {
  const deltaTime = timestamp - prevTime;

  if (gameState === STATE_PLAYING) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    update(deltaTime);
    draw();

    showFps(deltaTime);
    showHealth(player);
  }

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
