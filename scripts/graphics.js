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
