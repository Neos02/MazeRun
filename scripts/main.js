const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const mainMenu = document.getElementById("mainMenu");
const difficultySelect = document.getElementById("difficultySelect");
const gameOver = document.getElementById("gameOver");
const finish = document.getElementById("finish");

const healthBar = document.getElementById("healthBar");
const healthCount = document.getElementById("healthCount");

const time = document.getElementById("time");

const music = document.getElementById("music");

const clickSound = document.getElementById("clickSound");
const deathSound = document.getElementById("deathSound");
const damageSound = document.getElementById("damageSound");
const countdownSound = document.getElementById("countdownSound");
const winSound = document.getElementById("winSound");

const WIDTH = parseFloat(canvas.clientWidth);
const HEIGHT = parseFloat(canvas.clientHeight);

let prevTime = 0;

/**
 * Initializes canvas properties and scales it to the proper resolution.
 * @param {Number} width the width of the canvas
 * @param {Number} height the height of the canvas
 */
function initCanvas(width, height) {
  // Translate by half a pixel to remove blurriness
  ctx.translate(0.5, 0.5);

  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

/**
 * Configure sound properties
 */
function configureSounds() {
  music.loop = true;

  countdownSound.addEventListener("ended", () => {
    music.play();
    gameState = STATE_PLAYING;
    startTime = Date.now();
  });

  setVolume(0.1);
}

/**
 * Set the volume of all sounds
 */
function setVolume(volume) {
  music.volume = volume;
  clickSound.volume = volume;
  deathSound.volume = volume;
  damageSound.volume = volume;
  countdownSound.volume = volume;
  winSound.volume = volume;
}

document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);
initCanvas(WIDTH, HEIGHT);
configureSounds();
window.requestAnimationFrame(loop);
ctx.clearRect(0, 0, WIDTH, HEIGHT);

update(10);
draw();
