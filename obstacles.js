let obstacles = [];
let spawnTimer = 0;
const SPAWN_RATE = 90;
const SCROLL_SPEED = 2;
let score = 0;

const scoreElmt = document.getElementById('score');

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

function updateObstacles() {
  spawnTimer++;
  if (spawnTimer >= SPAWN_RATE) {
    spawnTimer = 0;
    spawnObstacle();
  }
  obstacles.forEach(o => o.x -= SCROLL_SPEED);
  obstacles = obstacles.filter(o => o.x + o.width > 0);

  obstacles.forEach(o => {
    const bottomY = o.topHeight + o.gap;
    if (
      player.x + player.width > o.x &&
      player.x < o.x + o.width &&
      (player.y < o.topHeight || player.y + player.height > bottomY)
    ) {
      triggerGameOver();
    }
  });
}

function drawObstacles() {
  ctx.fillStyle = "#44aa55";
  obstacles.forEach(o => {
    ctx.fillRect(o.x, 0, o.width, o.topHeight);
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