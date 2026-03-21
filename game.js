const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const player = {
  x: 150,
  y: 200,
  width: 30,
  height: 30,
  velocityY: 0
};

const GRAVITY = 0.5;
const FLAP = -9;

let gameOver = false;

function update() {
  player.velocityY += GRAVITY;
  player.y += player.velocityY;

  if (player.y < 0) {
    player.y = 0;
    player.velocityY = 0;
  }
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.velocityY = 0;
    triggerGameOver();
  }

  updateObstacles();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#66aaff";
  ctx.fillRect(player.x, player.y, player.width, player.height);
  drawObstacles();

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    ctx.font = "24px Arial";
    ctx.fillText("Press Space to Restart", canvas.width / 2, canvas.height / 2 + 40);
  }
}

function triggerGameOver() {
  gameOver = true;
}

function resetGame() {
  player.x = 150;
  player.y = 200;
  player.velocityY = 0;
  obstacles = [];
  spawnTimer = 0;
  score = 0;
  scoreElmt.textContent = 0;
  gameOver = false;
  loop();
}

function loop() {
  if (gameOver) {
    draw();
    return;
  }
  update();
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (gameOver) {
      resetGame();
      return;
    }
    player.velocityY = FLAP;
  }
});

loop();