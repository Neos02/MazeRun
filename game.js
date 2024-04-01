function update(deltaTime) {}

function draw() {}

function loop(timestamp) {
  const deltaTime = timestamp - prevTime;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  update(deltaTime);
  draw();

  showFps(deltaTime);

  prevTime = timestamp;

  window.requestAnimationFrame(loop);
}

function showFps(deltaTime) {
  const fps = Math.round(1000 / deltaTime);

  ctx.fillStyle = "black";
  ctx.fontWeight = 20;
  ctx.fillText(`FPS: ${fps}`, 0, 10);
}
