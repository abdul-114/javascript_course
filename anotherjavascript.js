function mouseEnter() {
    let gameCanvas = document.getElementById('game');
    gameCanvas.addEventListener("mouseenter", function() {
        document.getElementById('demo').textContent="mouseIn";
    });
}