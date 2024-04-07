/**
 * Finds the square of the distance between two points
 * @param {Object} p1 the first point
 * @param {Object} p2 the second point
 * @returns the squared distance between the two points
 */
function distanceSquared(p1, p2) {
  return (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
}

/**
 * Checks if an array index is in bounds
 * @param {Array} array the array being accessed
 * @param {Number} index the index to check
 * @returns true if the index is in bounds, otherwise false
 */
function isInBounds(array, index) {
  return index >= 0 && index < array.length;
}

/**
 * Compares two points and returns true if they are equal
 * @param {Object} p1 the first point
 * @param {Object} p2 the second point
 * @returns true if the points are equal, otherwise false
 */
function comparePoints(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

/**
 * Gets a random integer between the min (inclusive) and the max (exclusive)
 * @param {Number} min the min value (inclusive)
 * @param {Number} max the max value (exclusive)
 * @returns A random integer
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
