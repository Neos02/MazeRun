/**
 * Finds the square of the distance between two points
 * @param {Object} p1 the first point
 * @param {Object} p2 the second point
 * @returns the squared distance between the two points
 */
function distanceSquared(p1, p2) {
  return (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
}
