export default class Player {
    position;
    radius;
    velocity;
    direction;
    animationLoop;
    animationCount;
    animationSpeed;
    keys;
    score;
    lives;

    constructor(x, y, radius) {
        this.position = {
            x: x,
            y: y
        }
        this.radius = radius;
        this.velocity = {
            x: 0,
            y: 0
        }
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
        this.score = 0;
        this.lives = 3;

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


    update(walls, pellets) {
        if (this.keys.w && this.lastKey === 'w') {
            for (let i = 0; i < walls.length; i++) {
                const wall = walls[i];
                this.velocity.y = -1;
                if (this.playerTileCollision(wall)) {
                    this.velocity.y = 0;
                    break;
                } else {
                    this.velocity.y = -1;
                }
            }
        } else if (this.keys.s && this.lastKey === 's') {
            for (let i = 0; i < walls.length; i++) {
                const wall = walls[i];
                this.velocity.y = 1;
                if (this.playerTileCollision(wall)) {
                    this.velocity.y = 0;
                    break;
                } else {
                    this.velocity.y = 1;
                }
            }
        } else if (this.keys.a && this.lastKey === 'a') {
            for (let i = 0; i < walls.length; i++) {
                const wall = walls[i];
                this.velocity.x = -1;
                if (this.playerTileCollision(wall)) {
                    this.velocity.x = 0;
                    break;
                } else {
                    this.velocity.x = -1;
                }
            }
        } else if (this.keys.d && this.lastKey === 'd') {
            for (let i = 0; i < walls.length; i++) {
                const wall = walls[i];
                this.velocity.x = 1;
                if (this.playerTileCollision(wall)) {
                    this.velocity.x = 0;
                    break;
                } else {
                    this.velocity.x = 1;
                }
            }
        }

        pellets.forEach((pellet, idx) => {
            if (this.playerCircleCollision(pellet)) {
                pellets.splice(idx, 1);
                this.score += 10;
            }
        })

        if (!this.isWallColliding(walls)) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }

    playerCircleCollision(circle) {
        if (this.position.y - this.radius <= circle.y + circle.radius &&
            this.position.x + this.radius >= circle.x &&
            this.position.y + this.radius >= circle.y &&
            this.position.x - this.radius <= circle.x + circle.radius) {
            return true;
        }
    }

    playerTileCollision(wall) {
        if (this.position.y - this.radius + this.velocity.y <= wall.y + wall.height &&
            this.position.x + this.radius + this.velocity.x >= wall.x &&
            this.position.y + this.radius + this.velocity.y >= wall.y &&
            this.position.x - this.radius + this.velocity.x <= wall.x + wall.width) {
            return true;
        }
    }

    // This will wrap the player around if they go outside the canvas border.
    checkBorderPosition(canvas) {
        if ((this.position.x) > canvas.width - 2) {
            this.position.x = 1;
        }

        else if ((this.position.x) <= 0) {
            this.position.x = canvas.width - 1;
        }

        if ((this.position.y) > canvas.height - 2) {
            this.position.y = 1;
        }

        else if ((this.position.y) <= 0) {
            this.position.y = canvas.height - 1;
        }
    }

    isWallColliding(walls) {
        walls.forEach(wall => {
            if (this.playerTileCollision(wall)) {
                this.velocity.x = 0;
                this.velocity.y = 0;
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
        if (this.velocity.x === 1) {
            if (this.animationLoop[animationNum] === 0) {
                ctx.arc(this.position.x, this.position.y, this.radius, Math.PI / 6, -Math.PI / 6, false);
            } else if (this.animationLoop[animationNum] === 1) {
                ctx.arc(this.position.x, this.position.y, this.radius, Math.PI / 12, -Math.PI / 12, false);
            } else if (this.animationLoop[animationNum] === 2) {
                ctx.arc(this.position.x, this.position.y, this.radius, Math.PI * 2, false);
            }
        } else if (this.velocity.x === -1) {
            if (this.animationLoop[animationNum] === 0) {
                ctx.arc(this.position.x, this.position.y, this.radius, (Math.PI / 1.2), (-Math.PI / 1.2), true);
            } else if (this.animationLoop[animationNum] === 1) {
                ctx.arc(this.position.x, this.position.y, this.radius, (Math.PI / 1.1), (-Math.PI / 1.1), true);
            } else if (this.animationLoop[animationNum] === 2) {
                ctx.arc(this.position.x, this.position.y, this.radius, Math.PI * 2, false);
            }
        } else if (this.velocity.y === -1) {
            if (this.animationLoop[animationNum] === 0) {
                ctx.arc(this.position.x, this.position.y, this.radius, (Math.PI * 1.3), (-Math.PI * 0.3), true);
            }
            else if (this.animationLoop[animationNum] === 1) {
                ctx.arc(this.position.x, this.position.y, this.radius, (Math.PI * 1.4), (-Math.PI * 0.4), true);
            }
            else if (this.animationLoop[animationNum] === 2) {
                ctx.arc(this.position.x, this.position.y, this.radius, Math.PI * 2, false);
            }
        } else if (this.velocity.y === 1) {
            if (this.animationLoop[animationNum] === 0) {
                ctx.arc(this.position.x, this.position.y, this.radius, (Math.PI * 0.3), (-Math.PI * 1.3), true);
            }
            else if (this.animationLoop[animationNum] === 1) {
                ctx.arc(this.position.x, this.position.y, this.radius, (Math.PI * 0.4), (-Math.PI * 1.4), true);
            }
            else if (this.animationLoop[animationNum] === 2) {
                ctx.arc(this.position.x, this.position.y, this.radius, Math.PI * 2, false);
            }
        } else {
            ctx.arc(this.position.x, this.position.y, this.radius, Math.PI * 2, false);
        }

        ctx.lineTo(this.position.x, this.position.y);
        ctx.fill()

        this.animationCount = (this.animationCount + this.animationSpeed) % this.animationLoop.length;
    }
}
