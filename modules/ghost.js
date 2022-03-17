export default class Ghost {
    position;
    radius;
    velocity;
    direction;
    direction;
    queuedKey;
    currentDirection;
    previousPosition;
    showLines;
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
        this.direction = {
            w: false,
            s: false,
            a: false,
            d: false
        }
        this.queuedDirection = 'r';
        this.currentDirection = 'r';
        this.showLines = true;
        this.previousPosition = {
            x: 0,
            y: 0
        }
    }

    // !! I have immense distaste for this rat king of code below
    // !! It works (for the most part), but it is not pretty...
    update(walls, ctx, player) {
        if (this.showLines) {
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.moveTo(this.position.x, this.position.y);
            ctx.lineTo(player.position.x, player.position.y);
            ctx.stroke();
        }

        let xDiff = player.position.x - this.position.x;
        let yDiff = player.position.y - this.position.y;
        let dUp = player.position.y - (this.position.y - this.radius * 2);
        let dDown = player.position.y - (this.position.y + this.radius * 2);
        let dLeft = player.position.x - (this.position.x - this.radius * 2);
        let dRight = player.position.x - (this.position.x + this.radius * 2);

        let up = Math.sqrt(xDiff * xDiff + (dUp) * (dUp));
        let left = Math.sqrt((dLeft) * (dLeft) + yDiff * yDiff);
        let right = Math.sqrt((dRight) * (dRight) + yDiff * yDiff);
        let down = Math.sqrt(xDiff * xDiff + (dDown) * (dDown));
        console.log(this.currentDirection, this.queuedDirection);

        if (this.currentDirection === 'u') {
            for (let i = 0; i < walls.length; i++) {
                const wall = walls[i];
                this.velocity.y = -1;
                this.velocity.x = 0;

                if (this.ghostTileCollision(wall)) {
                    if (left >= right) {
                        this.queuedDirection = 'r';
                    } else {
                        this.queuedDirection = 'l';
                    }
                } else if (left > right) {
                    if (up > right) {
                        this.velocity.x = 1;
                        if (this.ghostTileCollision(wall)) {
                            this.queuedDirection = 'r';
                            this.velocity.x = 0;
                            break;
                        }
                    }
                } else if (right > left) {
                    if (up > left) {
                        this.velocity.x = -1;
                        if (this.ghostTileCollision(wall)) {
                            this.queuedDirection = 'l';
                            this.velocity.x = 0;
                            break;
                        }
                    }
                }

                if (this.ghostTileCollision(wall)) {
                    this.currentDirection = this.queuedDirection;
                    this.velocity.y = 0;
                    break;
                } else {
                    this.velocity.y = -1;
                }
            }
        } else if (this.currentDirection === 'd') {
            for (let i = 0; i < walls.length; i++) {
                const wall = walls[i];
                this.velocity.y = 1;
                this.velocity.x = 0;

                if (this.ghostTileCollision(wall)) {
                    if (left >= right) {
                        this.queuedDirection = 'r';
                    } else {
                        this.queuedDirection = 'l';
                    }
                } else if (left > right) {
                    if (down > left) {
                        this.velocity.x = -1;
                        if (this.ghostTileCollision(wall)) {
                            this.queuedDirection = 'l';
                            this.velocity.x = 0;
                            break;
                        }
                    }
                } else if (right > left) {
                    if (down > right) {
                        this.velocity.x = 1;
                        if (this.ghostTileCollision(wall)) {
                            this.queuedDirection = 'r';
                            this.velocity.x = 0;
                            break;
                        }
                    }
                }

                if (this.ghostTileCollision(wall)) {
                    this.currentDirection = this.queuedDirection;
                    this.velocity.y = 0;
                    break;
                } else {
                    this.velocity.y = 1;
                }
            }
        } else if (this.currentDirection === 'l') {
            for (let i = 0; i < walls.length; i++) {
                const wall = walls[i];
                this.velocity.x = -1;
                this.velocity.y = 0;

                if (this.ghostTileCollision(wall)) {
                    if (down >= up) {
                        this.queuedDirection = 'u';
                    } else {
                        this.queuedDirection = 'd';
                    }
                } else if (up > down) {

                    if (left > down) {
                        this.velocity.y = 1;
                        if (this.ghostTileCollision(wall)) {
                            this.queuedDirection = 'd';
                            this.velocity.y = 0;
                            break;
                        }
                    }
                } else if (down > up) {
                    if (left > up) {
                        this.velocity.y = -1;
                        if (this.ghostTileCollision(wall)) {
                            this.queuedDirection = 'u';
                            this.velocity.y = 0;
                            break;
                        }
                    }
                }

                if (this.ghostTileCollision(wall)) {
                    this.currentDirection = this.queuedDirection;
                    this.velocity.x = 0;
                    break;
                } else {
                    this.velocity.x = -1;
                }
            }
        } else if (this.currentDirection === 'r') {
            for (let i = 0; i < walls.length; i++) {
                const wall = walls[i];
                this.velocity.x = 1;
                this.velocity.y = 0;

                if (this.ghostTileCollision(wall)) {
                    if (down >= up) {
                        this.queuedDirection = 'u';
                    } else {
                        this.queuedDirection = 'd';
                    }
                } else if (up > down) {
                    if (right > down) {
                        this.velocity.y = 1;
                        if (this.ghostTileCollision(wall)) {
                            this.queuedDirection = 'd';
                            this.velocity.y = 0;
                            break;
                        }
                    }
                } else if (down > up) {
                    if (right > up) {
                        this.velocity.y = -1;
                        if (this.ghostTileCollision(wall)) {
                            this.queuedDirection = 'u';
                            this.velocity.y = 0;
                            break;
                        }
                    }
                }

                if (this.ghostTileCollision(wall)) {
                    this.currentDirection = this.queuedDirection;
                    this.velocity.x = 0;
                    break;
                } else {
                    this.velocity.x = 1;
                }
            }
        }
        if (!this.isWallColliding(walls)) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }

    ghostTileCollision(wall) {
        if (this.position.y - this.radius + this.velocity.y <= wall.y + wall.height &&
            this.position.x + this.radius + this.velocity.x >= wall.x &&
            this.position.y + this.radius + this.velocity.y >= wall.y &&
            this.position.x - this.radius + this.velocity.x <= wall.x + wall.width) {
            return true;
        }
    }

    isWallColliding(walls) {
        walls.forEach(wall => {
            if (this.ghostTileCollision(wall)) {
                this.velocity.x = 0;
                this.velocity.y = 0;
                return true;
            }
        })
    }

    drawGhost(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.position.x, this.position.y, this.radius, Math.PI * 2, false);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.fill();
    }
}
