const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const mainMenu = document.getElementById("mainMenu");
const gameOver = document.getElementById("gameOver");
const finish = document.getElementById("finish");

const music = new Audio("../music/track0.mp3");
const clickSound = new Audio("../sounds/click.mp3");
const deathSound = new Audio("../sounds/death.mp3");
const countdownSound = new Audio("../sounds/countdown.mp3");
const winSound = new Audio("../sounds/win.mp3");

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
  });
}

document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);
initCanvas(WIDTH, HEIGHT);
configureSounds();
window.requestAnimationFrame(loop);
ctx.clearRect(0, 0, WIDTH, HEIGHT);

update(10);
draw();
