/*******************************
 * WEEK 2: GAME LOOP + PHYSICS
 *******************************/

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

/* ---------- Player ---------- */
var player = {
  x: 150,
  y: 200,
  width: 30,
  height: 30,
  velocityY: 0
};


/* ---------- Physics ---------- */
const GRAVITY = 0.5;   // pulls player down
const FLAP = -9;       // upward boost
init(); 
drawStartUpScreen("Press Space to Start", "Use Space to Flap and Avoid Pipes");

function drawStartUpScreen(gamestatus, text) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "48px Arial";
  ctx.textAlign = "center";
  ctx.fillText(gamestatus, canvas.width / 2, canvas.height / 2);
  ctx.font = "24px Arial";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 50);
}

loop();

/* ---------- Update ---------- */
function update() {
  // Apply gravity
  player.velocityY += GRAVITY;
  player.y += player.velocityY;

  // Keep player on screen
  if (player.y < 0) {
    player.y = 0;
    player.velocityY = 0;
  }

  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.velocityY = 0;
  }
  updateObstacles();
}

/* ---------- Draw ---------- */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#66aaff";
  ctx.fillRect(player.x, player.y, player.width, player.height);
  drawPlayer(ctx, player.x, player.y);

  drawObstacles();
}


function drawPlayer(ctx, x, y) {

  // Draw pixel bird (simple 8x8 sprite, scaled up)
  ctx.fillStyle = 'yellow'; // Body
  ctx.fillRect(x, y, 20, 20);
  ctx.fillStyle = 'orange'; // Beak
  ctx.fillRect(x + 20, y + 5, 10, 5);
  ctx.fillStyle = 'black'; // Eye
  ctx.fillRect(x + 15, y + 5, 3, 3);
  ctx.fillStyle = 'red'; // Wing
  ctx.fillRect(x + 5, y - 5, 10, 10);
}


/* ---------- Game Loop ---------- */
function loop() {
  if (gameState === "playing") {
    update();
    draw();
  } else if (gameState === "gameover") {
    drawStartUpScreen("Game Over", "Press R to Restart");
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  }
  requestAnimationFrame(loop);
}

/* ---------- Controls ---------- */
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && gameState !== "gameover") {
    e.preventDefault();
    if (gameState === "start") {
      gameState = "playing";
    } else if (gameState === "playing") {
      player.velocityY = FLAP;
    }
  }

  if (e.code === "KeyR" && gameState === "gameover") {
    // Reset game
    gameState = "start";
    player.y = 200;
    player.velocityY = 0;
    obstacles = [];
    coins = [];
    init();
    scoreElmt.textContent = score;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStartUpScreen("Press Space to Start", "Use Space to Flap and Avoid Pipes");
  }
});
