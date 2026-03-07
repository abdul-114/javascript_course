/*******************************
 * WEEK 2: GAME LOOP + PHYSICS
 *******************************/

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

/* ---------- Player ---------- */
const player = {
  x: 150,
  y: 200,
  width: 30,
  height: 30,
  velocityY: 0
};

/* ---------- Physics ---------- */
const GRAVITY = 0.5;   // pulls player down
const FLAP = -9;       // upward boost

loop();
console.log

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
  drawObstacles();
}


/* ---------- Game Loop ---------- */
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

/* ---------- Controls ---------- */
window.addEventListener("keydown", (e) => {
   if (e.code === "Space") {
     e.preventDefault();
     player.velocityY = FLAP;
   }


 
});
