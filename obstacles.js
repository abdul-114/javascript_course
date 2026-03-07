
let obstacles = [];
let spawnTimer = 0;
const SPAWN_RATE = 90;
const SCROLL_SPEED = 2;

let score = 0;

/* Create a new obstacle */
function spawnObstacle() {
  const gap = 140;
  const topHeight = Math.random() * 200 + 40;

  obstacles.push({
    x: canvas.width,
    width: 60,
    topHeight,
    gap
  });
}

/* Update obstacles */
function updateObstacles() {
  spawnTimer++;

  if (spawnTimer >= SPAWN_RATE) {
    spawnTimer = 0;
    spawnObstacle();
  }

  obstacles.forEach(o => o.x -= SCROLL_SPEED);

  // Remove off-screen obstacles
  obstacles = obstacles.filter(o => o.x + o.width > 0);

}

/* Draw obstacles */
function drawObstacles() {
  ctx.fillStyle = "#44aa55";

  obstacles.forEach(o => {
    // Top pipe
    ctx.fillRect(o.x, 0, o.width, o.topHeight);

    // Bottom pipe
    const bottomY = o.topHeight + o.gap;
    ctx.fillRect(o.x, bottomY, o.width, canvas.height - bottomY);
  });
  obstacles.forEach(o => {
  if (!o.passed && o.x + o.width < player.x) {
    o.passed = true;
    score++;
    scoreElmt.textContent = score;
  }
});

}

const scoreElmt = document.getElementById('score');