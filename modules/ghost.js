export default class Ghost {
    position;
    radius;
    velocity;
    showLines;
    currentDirection;
    targetPosition;
    mode;

    constructor(x, y, radius) {
        this.position = {
            x: x,
            y: y
        };
        this.radius = radius;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.showLines = true;
        this.currentDirection = 'left';
        this.targetPosition = {
            x: 0,
            y: 0
        }
        this.mode = "chase";
    }

    // !! I have immense distaste for this rat king of code below
    // !! It works (for the most part), but it is not pretty...
    update(walls, ctx, player) {
        
        if (this.mode === 'chase') {
            this.targetPosition = player.position;
        } else {
            this.targetPosition = {
                x: 350,
                y: 700
            }
        }

        // show the lines originating from the ghost pointing to it's current position.
        if (this.showLines) {
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.moveTo(this.position.x, this.position.y + this.radius * 2.181818);
            ctx.lineTo(this.targetPosition.x, this.targetPosition.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.moveTo(this.position.x + this.radius * 2.181818, this.position.y);
            ctx.lineTo(this.targetPosition.x, this.targetPosition.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.moveTo(this.position.x, this.position.y - this.radius * 2.181818);
            ctx.lineTo(this.targetPosition.x, this.targetPosition.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.moveTo(this.position.x - this.radius * 2.181818, this.position.y);
            ctx.lineTo(this.targetPosition.x, this.targetPosition.y);
            ctx.stroke();
        }

        // Math to determine distance between the ghost and the playert
        // at four different points around the ghost. This is used
        // to calculate movement patterns based on whether one distance is
        // greater than another.
        let xDiff = this.targetPosition.x - this.position.x;
        let yDiff = this.targetPosition.y - this.position.y;
        let dUp = this.targetPosition.y - (this.position.y - this.radius * 2.181818);
        let dDown = this.targetPosition.y - (this.position.y + this.radius * 2.181818);
        let dLeft = this.targetPosition.x - (this.position.x - this.radius * 2.181818);
        let dRight = this.targetPosition.x - (this.position.x + this.radius * 2.181818);
        let up = Math.sqrt(xDiff * xDiff + (dUp) * (dUp));
        let left = Math.sqrt((dLeft) * (dLeft) + yDiff * yDiff);
        let right = Math.sqrt((dRight) * (dRight) + yDiff * yDiff);
        let down = Math.sqrt(xDiff * xDiff + (dDown) * (dDown));

        let collisions = [];
        let collidesLeft = collisions.includes('left');
        let collidesRight = collisions.includes('right');
        let collidesUp = collisions.includes('up');
        let collidesDown = collisions.includes('down');

        // loop through each wall and check if there is a collision
        // between the ghost and the if it were to go 
        // in a certain direction
        for (let i = 0; i < walls.length; i++) {
            const wall = walls[i];
            if (!collidesRight &&
                this.ghostTileCollision({
                    velocity: {
                        x: 1,
                        y: 0
                    },
                    wall
                })
            ) {
                collisions.push('right');
            }
            if (!collidesLeft &&
                this.ghostTileCollision({
                    velocity: {
                        x: -1,
                        y: 0
                    },
                    wall
                })
            ) {
                collisions.push('left');
            }
            if (!collidesDown &&
                this.ghostTileCollision({
                    velocity: {
                        x: 0,
                        y: 1
                    },
                    wall
                })
            ) {
                collisions.push('down');
            }
            if (!collidesUp &&
                this.ghostTileCollision({
                    velocity: {
                        x: 0,
                        y: -1
                    },
                    wall
                })
            ) {
                collisions.push('up');
            }
        }

        // each variable holds whether a certain direction is colliding or not
        collidesLeft = collisions.includes('left');
        collidesRight = collisions.includes('right');
        collidesUp = collisions.includes('up');
        collidesDown = collisions.includes('down');

        // This rats nest of code determines every 7 possible moves for
        // each direction.
        // In the event of choosing a direction to go,
        // The priority is: up-left-right-down
        if (this.currentDirection === 'up') {
            if (!collidesUp && !collidesLeft && !collidesRight) {
                if (right >= left && up >= left) {
                    this.goLeft();
                } else if (left > right && up > right) {
                    this.goRight()
                } else {
                    this.goUp();
                }
            } else if (collidesUp && !collidesLeft && !collidesRight) {
                if (right >= left) {
                    this.goLeft();
                } else {
                    this.goRight();
                }
            } else if (!collidesUp && collidesLeft && collidesRight) {
                this.goUp();
            } else if (collidesUp && collidesLeft && !collidesRight) {
                this.goRight();
            } else if (collidesUp && !collidesLeft && collidesRight) {
                this.goLeft();
            } else if (!collidesUp && !collidesLeft && collidesRight) {
                if (up > left) {
                    this.goLeft()
                } else {
                    this.goUp();
                }
            } else if (!collidesUp && collidesLeft && !collidesRight) {
                if (up > right) {
                    this.goRight()
                } else {
                    this.goUp();
                }
            }
        } else if (this.currentDirection === 'down') {
            if (!collidesDown && !collidesLeft && !collidesRight) {
                if (right >= left && down >= left) {
                    this.goLeft();
                } else if (left >= right && down >= right) {
                    this.goRight()
                } else {
                    this.goDown();
                }
            } else if (collidesDown && !collidesLeft && !collidesRight) {
                if (right >= left) {
                    this.goLeft();
                } else {
                    this.goRight();
                }
            } else if (!collidesDown && collidesLeft && collidesRight) {
                this.goDown();
            } else if (collidesDown && collidesLeft && !collidesRight) {
                this.goRight();
            } else if (collidesDown && !collidesLeft && collidesRight) {
                this.goLeft();
            } else if (!collidesDown && !collidesLeft && collidesRight) {
                if (down >= left) {
                    this.goLeft()
                } else {
                    this.goDown();
                }
            } else if (!collidesDown && collidesLeft && !collidesRight) {
                if (down >= right) {
                    this.goRight()
                } else {
                    this.goDown();
                }
            }
        } else if (this.currentDirection === 'left') {
            if (!collidesLeft && !collidesUp && !collidesDown) {
                if (down >= up && left >= up) {
                    this.goUp();
                } else if (down >= left && up >= left) {
                    this.goLeft();
                } else {
                    this.goDown();
                }
            } else if (collidesLeft && !collidesDown && !collidesUp) {
                if (down >= up) {
                    this.goUp();
                } else {
                    this.goDown();
                }
            } else if (!collidesLeft && collidesDown && collidesUp) {
                this.goLeft();
            } else if (collidesLeft && collidesUp && !collidesDown) {
                this.goDown();
            } else if (collidesLeft && !collidesUp && collidesDown) {
                this.goUp();
            } else if (!collidesLeft && !collidesUp && collidesDown) {
                if (left >= up) {
                    this.goUp()
                } else {
                    this.goLeft();
                }
             } else if (!collidesLeft && collidesUp && !collidesDown) {
                if (left > down) {
                    this.goDown()
                } else {
                    this.goLeft();
                }
            }
        } else if (this.currentDirection === 'right') {
            if (!collidesRight && !collidesUp && !collidesDown) {
                if (down >= up && right >= up) {
                    this.goUp();
                } else if (down >= right && up >= right) {
                    this.goRight();
                } else {
                    this.goDown();
                }
            } else if (collidesRight && !collidesDown && !collidesUp) {
                if (down >= up) {
                    this.goUp();
                } else {
                    this.goDown();
                }
            } else if (!collidesRight && collidesDown && collidesUp) {
                this.goRight();
            } else if (collidesRight && collidesUp && !collidesDown) {
                this.goDown();
            } else if (collidesRight && !collidesUp && collidesDown) {
                this.goUp();
            } else if (!collidesRight && !collidesUp && collidesDown) {
                if (right >= up) {
                    this.goUp()
                } else {
                    this.goRight();
                }
             } else if (!collidesRight && collidesUp && !collidesDown) {
                if (right >= down) {
                    this.goDown()
                } else {
                    this.goRight();
                }
            }
        }

        console.log(this.currentDirection);

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    goUp() {
        this.velocity.x = 0;
        this.velocity.y = -1;
        this.currentDirection = 'up';
    }

    goDown() {
        this.velocity.x = 0;
        this.velocity.y = 1;
        this.currentDirection = 'down';
    }
    
    goLeft() {
        this.velocity.x = -1;
        this.velocity.y = 0;
        this.currentDirection = 'left';
    }
    
    goRight() {
        this.velocity.x = 1;
        this.velocity.y = 0;
        this.currentDirection = 'right';
    }

    ghostTileCollision(details) {

        if (this.position.y - this.radius + details.velocity.y <= details.wall.y + details.wall.height &&
            this.position.x + this.radius + details.velocity.x >= details.wall.x &&
            this.position.y + this.radius + details.velocity.y >= details.wall.y &&
            this.position.x - this.radius + details.velocity.x <= details.wall.x + details.wall.width) {
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
        });
    }

    drawGhost(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.position.x, this.position.y, this.radius, Math.PI * 2, false);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.fill();
    }

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
}
