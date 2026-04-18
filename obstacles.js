let obstacles = [];
let spawnTimer = 0;
let spawnRate = 150;
let scrollSpeed = 2;
let gap = 200; // space between top and bottom pipes
let score = 0;
let newScore = 0;
let coins = [];
let lives = 3;
let isInvisible = false;

function init() {
  spawnTimer = 0;
  spawnRate = 150;
  scrollSpeed = 2;
  gap = 200;
  score = 0;
  newScore = 0;
  lives = 3;
  livesElmt.innerHTML = '&#9829;'.repeat(lives);
}

/* Create a new obstacle */
function spawnObstacle() {
  const topHeight = Math.random() * 200 + 40;
  obstacles.push({
    x: canvas.width,
    width: 60,
    topHeight,
    gap
  });
  // 50% chance to spawn a coin in the gap
  if (Math.random() < 0.5) {
    const coinY = topHeight + gap / 2 - 10;
    coins.push({
      x: canvas.width + 30,
      y: coinY,
      width: 20,
      height: 20,
      collected: false
    });
  }
}

/* Update obstacles — all logic lives here */
function updateObstacles() {
  spawnTimer++;

  if (spawnTimer >= spawnRate) {
    spawnTimer = 0;
    spawnObstacle();
  }

  obstacles.forEach(o => o.x -= scrollSpeed);
  coins.forEach(c => c.x -= scrollSpeed);

  // Remove off-screen obstacles and collected coins
  obstacles = obstacles.filter(o => o.x + o.width > 0);
  coins = coins.filter(c => c.x + c.width > 0 && !c.collected);

  // Scoring
  obstacles.forEach(o => {
    if (!o.passed && o.x + o.width < player.x) {
      o.passed = true;
      score++;
      scoreElmt.textContent = score;
    }
  });

  // Difficulty scaling (runs once per score change)
  if (newScore !== score) {
    if (score > 0 && score % 5 === 0) {
      scrollSpeed += 0.3;
    } else if (score > 0 && score % 10 === 0) {
      gap -= 10;
    } else if (score > 0 && score % 20 === 0) {
      spawnRate += 20;
    }
    newScore = score;
  }

  // Collision detection
  obstacles.forEach(o => {
    const topPipe = {
      x: o.x - 10,
      y: 0,
      width: 70,
      height: o.topHeight
    };
    const bottomPipe = {
      x: o.x - 10,
      y: o.topHeight + o.gap,
      width: 70,
      height: canvas.height
    };

    if ((isColliding(player, topPipe) || isColliding(player, bottomPipe)) && !isInvisible) {
      lives--;
      isInvisible = true;
      livesElmt.innerHTML = '&#9829;'.repeat(lives);
      setTimeout(() => {
        isInvisible = false;
      }, 2000);
    }

    if (lives <= 0) {
      gameState = "gameover";
    }
  });

  // Coin collection
  coins.forEach(c => {
    if (!c.collected && isColliding(player, c)) {
      c.collected = true;
      score += 10;
      scoreElmt.textContent = score;
    }
  });
}

/* Draw obstacles — visuals only */
function drawObstacles() {
  obstacles.forEach(o => {
    // Top pipe
    ctx.fillStyle = 'green';
    ctx.fillRect(o.x - 5, 0, 60, o.topHeight);
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(o.x - 10, o.topHeight - 20, 70, 20); // Cap

    // Bottom pipe
    const bottomY = o.topHeight + o.gap;
    ctx.fillStyle = 'green';
    ctx.fillRect(o.x - 5, bottomY, 60, canvas.height - bottomY);
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(o.x - 10, bottomY, 70, 20); // Cap
  });

  // Draw coins
  coins.forEach(c => {
    if (!c.collected) {
      ctx.fillStyle = 'gold';
      ctx.beginPath();
      ctx.arc(c.x + c.width / 2, c.y + c.height / 2, c.width / 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      ctx.arc(c.x + c.width / 2, c.y + c.height / 2, c.width / 2 - 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  });
}

var scoreElmt = document.getElementById('score');
var livesElmt = document.getElementById('lives');

let gameState = "start"; // start | playing | gameover

function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}