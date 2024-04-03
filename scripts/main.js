const WIDTH = 820;
const HEIGHT = 620;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let prevTime = 0;

/**
 * Initializes canvas properties and scales it to the proper resolution.
 * @param {Number} width the width of the canvas
 * @param {Number} height the height of the canvas
 */
function initCanvas(width, height) {
  // Translate by half a pixel to remove blurriness
  ctx.translate(0.5, 0.5);

  // Scale to proper resolution
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);
initCanvas(WIDTH, HEIGHT);
window.requestAnimationFrame(loop);
