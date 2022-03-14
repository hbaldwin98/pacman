let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')

class Player {
    x;
    y;
    size;
    velX;
    velY;
    direction;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.velX = 1;
        this.velY = 1;
        this.direction = "";

        window.addEventListener('keydown', (key) => {
            if (key.key === 'w') {
                this.direction = 'up';
            }
            if (key.key === 's') {
                this.direction = 'down';
            }
            if (key.key === 'a') {
                this.direction = 'left';
            }
            if (key.key === 'd') {
                this.direction = 'right';
            }
        })
    }

    move() {
        switch (this.direction) {
            case 'up':
                this.y -= this.velY;
                break;
            case 'down':
                this.y += this.velY;
                break;
            case 'left':
                this.x -= this.velX;
                break;
            case 'right':
                this.x += this.velX;
                break;
            default:
                break;
        }
    }

    drawPlayer() {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    // This will wrap the player around if they go outside the border boundary.
    checkBorderPosition() {
        if ((this.x) >= canvas.width) {
            this.x = 1;
        }

        else if ((this.x) <= 0) {
            this.x = canvas.width - 1;
        }

        if ((this.y) >= canvas.height) {
            this.y = 1;
        }

        else if ((this.y) <= 0) {
            this.y = canvas.height - 1;
        }
    }
}

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
    player.drawPlayer();
    player.checkBorderPosition();
    player.move();
    requestAnimationFrame(update);
}

let player = new Player(50, 50);

update();
