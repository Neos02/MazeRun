const WIDTH = 800;
const HEIGHT = 600;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let prevTime = 0;

initCanvas(WIDTH, HEIGHT);
window.requestAnimationFrame(loop);
