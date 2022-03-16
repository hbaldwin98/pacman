export default class Player {
    x;
    y;
    radius;
    velX;
    velY;
    direction;
    animationLoop;
    animationCount;
    animationSpeed;
    keys;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 7.6;
        this.velX = 0;
        this.velY = 0;
        this.animationLoop = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1];
        this.animationCount = 0;
        // Arbitary number controlling the speed of animation
        // at 144fps, the animation plays too fast so this is just a temporary fix
        // TODO add frame independent animations
        this.animationSpeed = 0.25;
        this.keys = {
            w: false,
            s: false,
            a: false,
            d: false
        }
        this.lastKey = '';

        window.addEventListener('keydown', (key) => {
            if (key.key === 'w') {
                this.keys.w = true;
                this.lastKey = 'w';
            }
            if (key.key === 's') {
                this.keys.s = true;
                this.lastKey = 's';
            }
            if (key.key === 'a') {
                this.keys.a = true;
                this.lastKey = 'a';
            }
            if (key.key === 'd') {
                this.keys.d = true;
                this.lastKey = 'd';
            }
        });

        window.addEventListener('keyup', (key) => {
            if (key.key === 'w') {
                this.keys.w = false;
            }
            if (key.key === 's') {
                this.keys.s = false;
            }
            if (key.key === 'a') {
                this.keys.a = false;
            }
            if (key.key === 'd') {
                this.keys.d = false;
            }
        });
    }



    update(walls) {
        if (this.keys.w && this.lastKey === 'w') {
            for (let i = 0; i < walls.length; i++) {
                const wall = walls[i];
                this.velY = -1;
                if (this.playerWallCollision(wall)) {
                    this.velY = 0;
                    break;
                } else {
                    this.velY = -1;
                }
            }
        } else if (this.keys.s && this.lastKey === 's') {
            for (let i = 0; i < walls.length; i++) {
                const wall = walls[i];
                this.velY = 1;
                if (this.playerWallCollision(wall)) {
                    this.velY = 0;
                    break;
                } else {
                    this.velY = 1;
                }
            }
        } else if (this.keys.a && this.lastKey === 'a') {
            for (let i = 0; i < walls.length; i++) {
                const wall = walls[i];
                this.velX = -1;
                if (this.playerWallCollision(wall)) {
                    this.velX = 0;
                    break;
                } else {
                    this.velX = -1;
                }
            }
        } else if (this.keys.d && this.lastKey === 'd') {
            for (let i = 0; i < walls.length; i++) {
                const wall = walls[i];
                this.velX = 1;
                if (this.playerWallCollision(wall)) {
                    this.velX = 0;
                    break;
                } else {
                    this.velX = 1;
                }
            }
        }

        if (!this.isWallColliding(walls)) {
            this.x += this.velX;
            this.y += this.velY;
        }
    }

    playerWallCollision(wall) {
        if (this.y - this.radius + this.velY <= wall.y + wall.height &&
            this.x + this.radius + this.velX >= wall.x &&
            this.y + this.radius + this.velY >= wall.y &&
            this.x - this.radius + this.velX <= wall.x + wall.width) {
            return true;
        }
    }

    // This will wrap the player around if they go outside the canvas border.
    checkBorderPosition(canvas) {
        if ((this.x) > canvas.width - 2) {
            this.x = 1;
        }

        else if ((this.x) <= 0) {
            this.x = canvas.width - 1;
        }

        if ((this.y) > canvas.height - 2) {
            this.y = 1;
        }

        else if ((this.y) <= 0) {
            this.y = canvas.height - 1;
        }
    }

    isWallColliding(walls) {
        walls.forEach(wall => {
            if (this.playerWallCollision(wall)) {
                this.velX = 0;
                this.velY = 0;
                return true;
            }
        })
    }

    // ? Very messy draw function here. Better way to do this?
    // TODO refactor this rat king of ifs
    drawPlayer(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        let animationNum = Math.floor(this.animationCount)
        if (this.velX === 1) {
            if (this.animationLoop[animationNum] === 0) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, Math.PI / 6, -Math.PI / 6, false);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            } else if (this.animationLoop[animationNum] === 1) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, Math.PI / 12, -Math.PI / 12, false);
                ctx.lineTo(this.x, this.y);
                ctx.fill();
            } else if (this.animationLoop[animationNum] === 2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
                ctx.lineTo(this.x, this.y);
                ctx.fill();
            }
        } else if (this.velX === -1) {
            if (this.animationLoop[animationNum] === 0) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, (Math.PI / 1.2), (-Math.PI / 1.2), true);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            } else if (this.animationLoop[animationNum] === 1) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, (Math.PI / 1.1), (-Math.PI / 1.1), true);
                ctx.lineTo(this.x, this.y);
                ctx.fill();
            } else if (this.animationLoop[animationNum] === 2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
                ctx.lineTo(this.x, this.y);
                ctx.fill();
            }
        } else if (this.velY === -1) {
            if (this.animationLoop[animationNum] === 0) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, (Math.PI * 1.3), (-Math.PI * 0.3), true);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            }
            else if (this.animationLoop[animationNum] === 1) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, (Math.PI * 1.4), (-Math.PI * 0.4), true);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            }
            else if (this.animationLoop[animationNum] === 2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            }
        } else if (this.velY === 1) {
            if (this.animationLoop[animationNum] === 0) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, (Math.PI * 0.3), (-Math.PI * 1.3), true);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            }
            else if (this.animationLoop[animationNum] === 1) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, (Math.PI * 0.4), (-Math.PI * 1.4), true);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            }
            else if (this.animationLoop[animationNum] === 2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
                ctx.lineTo(this.x, this.y);
                ctx.fill()
            }
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
            ctx.lineTo(this.x, this.y);
            ctx.fill()
        }

        this.animationCount = (this.animationCount + this.animationSpeed) % this.animationLoop.length;
    }




}
