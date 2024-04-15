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

const DIFFICULTIES = {
  easy: {
    mazeSize: 11,
    enemySpawnPercentage: 40,
  },
  medium: {
    mazeSize: 31,
    enemySpawnPercentage: 50,
  },
  hard: {
    mazeSize: 51,
    enemySpawnPercentage: 60,
  },
};

let difficulty = "easy";
let enemies = [];
let world = generateMaze(rows, cols, 40);
let gameState = STATE_MAIN_MENU;

let startTime;

/**
 * Responsible for updating the game
 * @param {Number} deltaTime the time in milliseconds since the last frame
 */
function update(deltaTime) {
  spawnEnemies();
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
 * Goes to the choose difficulty screen
 */
function chooseDifficulty() {
  mainMenu.classList.add("hidden");
  difficultySelect.classList.remove("hidden");
}

/**
 * Starts the game
 */
function start(diff) {
  difficulty = diff;

  difficultySelect.classList.add("hidden");

  rows = DIFFICULTIES[diff].mazeSize;
  cols = DIFFICULTIES[diff].mazeSize;

  world = generateMaze(rows, cols, DIFFICULTIES[diff].enemySpawnPercentage);
  update(10);
  draw();

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

  const milliseconds = Date.now() - startTime;

  time.innerText = `Your Time: ${formatMillis(milliseconds)}`;

  finish.classList.remove("hidden");

  gameState = STATE_WIN;

  if (difficulty === "hard") {
    const name = prompt("Enter your name for the leaderboard:");

    addScore(name, difficulty, player.health, milliseconds);
  }
}

/**
 * Resets the game
 */
function reset() {
  gameOver.classList.add("hidden");
  finish.classList.add("hidden");
  mainMenu.classList.remove("hidden");

  gameState = STATE_MAIN_MENU;

  player.health = PLAYER_MAX_HEALTH;
  world = generateMaze(rows, cols, 0);

  update(10);
  draw();
}

function toMainMenu() {
  leaderboard.classList.add("hidden");
  mainMenu.classList.remove("hidden");
}

function viewLeaderboard() {
  getLeaderboard();

  leaderboard.classList.remove("hidden");
  mainMenu.classList.add("hidden");
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
