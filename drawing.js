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

/**
 * Draws a filled in rectangle with the provided properties.
 * @param {Number} x the x position of the rectangle
 * @param {Number} y the y position of the rectangle
 * @param {Number} width the width of the rectangle
 * @param {Number} height the height of the rectangle
 * @param {String} color the fill color
 */
function rect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

/**
 * Draws a filled in circle with the provided properties.
 * @param {Number} x the x position of the circle
 * @param {Number} y the y position of the circle
 * @param {Number} radius the radius of the circle
 * @param {String} color the fill color
 */
function circle(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}
