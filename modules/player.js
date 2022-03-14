export default class Player {
    x;
    y;
    size;
    velX;
    velY;
    direction;
    animationLoop;
    animationCount;
    animationSpeed;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 16;
        this.velX = 1;
        this.velY = 1;
        this.direction = "left";
        this.animationLoop = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1];
        this.animationCount = 0;
        // Arbitary number controlling the speed of animation
        // at 144fps, the animation plays too fast
        // TODO add frame independent animations
        this.animationSpeed = 0.25;

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
        });
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
        }
    }
    // ? Very messy draw function here. Better way to do this?
    // TODO refactor this mess of ifs
    drawPlayer(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        let animationNum = Math.floor(this.animationCount)
        if (this.direction === 'right') {
            if (this.animationLoop[animationNum] === 0) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, Math.PI / 6, -Math.PI / 6, false);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            } else if (this.animationLoop[animationNum] === 1) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, Math.PI / 12, -Math.PI / 12, false);
                ctx.lineTo(this.x, this.y);
                ctx.fill();
            } else if (this.animationLoop[animationNum] === 2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, Math.PI * 2, false);
                ctx.lineTo(this.x, this.y);
                ctx.fill();
            }
        } else if (this.direction === 'left') {
            if (this.animationLoop[animationNum] === 0) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, (Math.PI / 1.2), (-Math.PI / 1.2), true);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            } else if (this.animationLoop[animationNum] === 1) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, (Math.PI / 1.1), (-Math.PI / 1.1), true);
                ctx.lineTo(this.x, this.y);
                ctx.fill();
            } else if (this.animationLoop[animationNum] === 2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, Math.PI * 2, false);
                ctx.lineTo(this.x, this.y);
                ctx.fill();
            }
        } else if (this.direction === 'up') {
            if (this.animationLoop[animationNum] === 0) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, (Math.PI * 1.3), (-Math.PI * 0.3), true);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            } 
            else if (this.animationLoop[animationNum] === 1) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, (Math.PI * 1.4), (-Math.PI * 0.4), true);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            } 
            else if (this.animationLoop[animationNum] === 2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, Math.PI * 2, false);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            } 
        } else if (this.direction === 'down') {
            if (this.animationLoop[animationNum] === 0) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, (Math.PI * 0.3), (-Math.PI * 1.3), true);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            } 
            else if (this.animationLoop[animationNum] === 1) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, (Math.PI * 0.4), (-Math.PI * 1.4), true);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            } 
            else if (this.animationLoop[animationNum] === 2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, Math.PI * 2, false);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            } 
        }

        this.animationCount = (this.animationCount + this.animationSpeed) % this.animationLoop.length;
    }

    // This will wrap the player around if they go outside the canvas border.
    checkBorderPosition(canvas) {
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
