import Player from './modules/player.js';
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')
let player = new Player(50, 50);

class Wall {
    x;
    y;
    width;
    height;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

function drawCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function update() {
    drawCanvas();
    player.drawPlayer(ctx);
    player.checkBorderPosition(canvas);
    player.move();
    requestAnimationFrame(update);
}

update();
