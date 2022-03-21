export default class Ghost {
  constructor(ghostName, x, y, radius, debug) {
    this.ghostName = ghostName;
    this.maxSpeed = 1;
    this.startingPosition = {
      x,
      y
    };
    this.position = {
      x,
      y,
    };
    this.radius = radius;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.showLines = debug;
    this.currentDirection = 'left';
    this.state = 'scatter';
    if (ghostName === 'Blinky') {
      this.color = 'red';
      this.scatterLocation = {
        x: 630,
        y: 175,
      };
    } else if (ghostName === 'Pinky') {
      this.color = 'pink';
      this.scatterLocation = {
        x: 40,
        y: 175,
      };
    } else if (ghostName === 'Inky') {
      this.color = 'cyan';
      this.scatterLocation = {
        x: 630,
        y: 850,
      };
    } else if (ghostName === 'Clyde') {
      this.color = 'orange';
      this.scatterLocation = {
        x: 40,
        y: 850,
      };
    }
  }

  setTargetPosition(player, ghosts, canvas) {
    if (this.state === 'chase') {
      if (this.ghostName === 'Blinky') {
        this.targetPosition = {
          x: player.position.x,
          y: player.position.y,
        };
      } else if (this.ghostName === 'Pinky') {
        if (player.lastKey === 'w') {
          this.targetPosition = {
            x: player.position.x,
            y: player.position.y - player.radius * 4,
          };
        } else if (player.lastKey === 's') {
          this.targetPosition = {
            x: player.position.x,
            y: player.position.y + player.radius * 4,
          };
        } else if (player.lastKey === 'd') {
          this.targetPosition = {
            x: player.position.x + player.radius * 4,
            y: player.position.y,
          };
        } else {
          this.targetPosition = {
            x: player.position.x - player.radius * 4,
            y: player.position.y,
          };
        }
      } else if (this.ghostName === 'Inky') {
        ghosts.forEach((ghost) => {
          if (ghost.ghostName === 'Blinky') {
            const diff = this.getXYDistanceFromPlayer(player, ghost);

            if (player.lastKey === 'w') {
              this.targetPosition = {
                x: player.position.x - diff.x,
                y: player.position.y - (diff.y + player.radius * 4),
              };
            } else if (player.lastKey === 's') {
              this.targetPosition = {
                x: player.position.x + diff.x,
                y: player.position.y + (diff.y + player.radius * 4),
              };
            } else if (player.lastKey === 'd') {
              this.targetPosition = {
                x: player.position.x + (diff.x + player.radius * 4),
                y: player.position.y + diff.y,
              };
            } else {
              this.targetPosition = {
                x: player.position.x - (diff.x + player.radius * 4),
                y: player.position.y - diff.y,
              };
            }
          }
        });
      } else if (this.ghostName === 'Clyde') {
        if (this.getDistanceFromPlayer(player, this) >= this.radius * 12) {
          this.targetPosition = {
            x: player.position.x,
            y: player.position.y,
          };
        } else {
          this.targetPosition = this.scatterLocation;
        }
      }
    } else if (this.state === 'frightened') {
      this.targetPosition = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      };
    } else {
      this.targetPosition = this.scatterLocation;
    }
  }

  getDistanceFromPlayer(player, ghost) {
    const xDiff = player.position.x - ghost.position.x;
    const yDiff = player.position.y - ghost.position.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }

  getXYDistanceFromPlayer(player, ghost) {
    const xDiff = player.position.x - ghost.position.x;
    const yDiff = player.position.y - ghost.position.y;

    return { x: xDiff, y: yDiff };
  }

  // !! I have immense distaste for this rat king of code below
  // !! It works (for the most part), but it is not pretty...
  update(walls, ctx, player, tunnels, ghosts, canvas) {
    this.setTargetPosition(player, ghosts, canvas);
    // show the lines originating from the ghost pointing to it's current position.
    if (this.showLines) {
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.moveTo(this.position.x, this.position.y + this.radius * 2.085);
      ctx.lineTo(this.targetPosition.x, this.targetPosition.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.moveTo(this.position.x + this.radius * 2.085, this.position.y);
      ctx.lineTo(this.targetPosition.x, this.targetPosition.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.moveTo(this.position.x, this.position.y - this.radius * 2.085);
      ctx.lineTo(this.targetPosition.x, this.targetPosition.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.moveTo(this.position.x - this.radius * 2.085, this.position.y);
      ctx.lineTo(this.targetPosition.x, this.targetPosition.y);
      ctx.stroke();
    }

    // Math to determine distance between the ghost and the player
    // at four different points around the ghost. This is used
    // to calculate movement patterns based on whether one distance is
    // greater than another.
    const xDiff = this.targetPosition.x - this.position.x;
    const yDiff = this.targetPosition.y - this.position.y;
    const dUp = this.targetPosition.y - (this.position.y - this.radius);
    const dDown = this.targetPosition.y - (this.position.y + this.radius);
    const dLeft = this.targetPosition.x - (this.position.x - this.radius);
    const dRight = this.targetPosition.x - (this.position.x + this.radius);
    const up = Math.sqrt(xDiff * xDiff + dUp * dUp);
    const left = Math.sqrt(dLeft * dLeft + yDiff * yDiff);
    const right = Math.sqrt(dRight * dRight + yDiff * yDiff);
    const down = Math.sqrt(xDiff * xDiff + dDown * dDown);

    const collisions = [];

    let collidesLeft;
    let collidesRight;
    let collidesUp;
    let collidesDown;

    // loop through each wall and check if there is a collision
    // between the ghost and the if it were to go
    // in a certain direction
    walls.forEach((wall) => {
      if (
        !collisions.includes('right') &&
        this.ghostTileCollision({
          velocity: {
            x: 1,
            y: 0,
          },
          wall,
        })
      ) {
        collisions.push('right');
      }
      if (
        !collisions.includes('left') &&
        this.ghostTileCollision({
          velocity: {
            x: -1,
            y: 0,
          },
          wall,
        })
      ) {
        collisions.push('left');
      }
      if (
        !collisions.includes('down') &&
        this.ghostTileCollision({
          velocity: {
            x: 0,
            y: 1,
          },
          wall,
        })
      ) {
        collisions.push('down');
      }
      if (
        !collisions.includes('up') &&
        this.ghostTileCollision({
          velocity: {
            x: 0,
            y: -1,
          },
          wall,
        })
      ) {
        collisions.push('up');
      }
    });

    tunnels.forEach((tunnel) => {
      if (
        this.ghostTunnelCollision(tunnel) ||
        this.ghostTunnelCollision(tunnel)
      ) {
        if (tunnel.start) {
          this.maxSpeed = 0.75;
        } else {
          this.maxSpeed = 1;
        }
      }
    });
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
          this.goRight();
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
          this.goLeft();
        } else {
          this.goUp();
        }
      } else if (!collidesUp && collidesLeft && !collidesRight) {
        if (up > right) {
          this.goRight();
        } else {
          this.goUp();
        }
      }
    } else if (this.currentDirection === 'down') {
      if (!collidesDown && !collidesLeft && !collidesRight) {
        if (right >= left && down >= left) {
          this.goLeft();
        } else if (left >= right && down >= right) {
          this.goRight();
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
          this.goLeft();
        } else {
          this.goDown();
        }
      } else if (!collidesDown && collidesLeft && !collidesRight) {
        if (down > right) {
          this.goRight();
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
          this.goUp();
        } else {
          this.goLeft();
        }
      } else if (!collidesLeft && collidesUp && !collidesDown) {
        if (left > down) {
          this.goDown();
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
          this.goUp();
        } else {
          this.goRight();
        }
      } else if (!collidesRight && collidesUp && !collidesDown) {
        if (right > down) {
          this.goDown();
        } else {
          this.goRight();
        }
      }
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  goUp() {
    this.velocity.x = 0;
    this.velocity.y = -this.maxSpeed;
    this.currentDirection = 'up';
  }

  goDown() {
    this.velocity.x = 0;
    this.velocity.y = this.maxSpeed;
    this.currentDirection = 'down';
  }

  goLeft() {
    this.velocity.x = -this.maxSpeed;
    this.velocity.y = 0;
    this.currentDirection = 'left';
  }

  goRight() {
    this.velocity.x = this.maxSpeed;
    this.velocity.y = 0;
    this.currentDirection = 'right';
  }

  // Checks if the ghost is colliding with a given tile
  ghostTileCollision(details) {
    if (
      this.position.y - this.radius + details.velocity.y <=
        details.wall.y + details.wall.height &&
      this.position.x + this.radius + details.velocity.x >= details.wall.x &&
      this.position.y + this.radius + details.velocity.y >= details.wall.y &&
      this.position.x - this.radius + details.velocity.x <=
        details.wall.x + details.wall.width
    ) {
      return true;
    }

    return false;
  }

  // checks if the ghost is colliding with a "tunnel" tile
  ghostTunnelCollision(tunnel) {
    if (
      this.position.y - this.radius <= tunnel.y + this.radius &&
      this.position.x + this.radius >= tunnel.x &&
      this.position.y + this.radius >= tunnel.y &&
      this.position.x - this.radius <= tunnel.x + this.radius
    ) {
      return true;
    }
    return false;
  }

  // is the ghost colliding with ANY wall on the map
  isWallColliding(walls) {
    walls.forEach((wall) => {
      if (this.ghostTileCollision(wall)) {
        this.velocity.x = 0;
        this.velocity.y = 0;
        return true;
      }
    });
  }

  drawGhost(ctx) {
    ctx.beginPath();
    if (this.state === 'frightened') {
      ctx.fillStyle = 'blue';
    } else {
      ctx.fillStyle = this.color;
    }
    ctx.arc(this.position.x, this.position.y, this.radius, Math.PI * 2, false);
    ctx.lineTo(this.position.x, this.position.y);
    ctx.fill();
  }

  // ensures the ghost wraps around the screen inside the tunnel.
  checkBorderPosition(canvas) {
    if (this.position.x > canvas.width) {
      this.position.x = this.maxSpeed;
    } else if (this.position.x <= 0) {
      this.position.x = canvas.width - this.maxSpeed;
    }

    if (this.position.y > canvas.height) {
      this.position.y = this.maxSpeed;
    } else if (this.position.y <= 0) {
      this.position.y = canvas.height - this.maxSpeed;
    }
  }

  setGhostState(state) {
    this.state = state;

    if (this.state === 'frightened') this.maxSpeed = 0.5;
    else this.maxSpeed = 1;
    // ! THIS CODE BELOW WILL OCCASIONAL BREAK THE GHOSTS MOVEMENT FOR SOME REASON
    // ! NEED TO FIND A FIX, FOR NOW I AM DISABLING IT.

    // if (this.currentDirection === 'up') {
    //     this.goDown();
    // } else {
    //     this.goUp();
    // }

    // if (this.currentDirection === 'right') {
    //     this.goLeft();
    // } else {
    //     this.goRight();
    // }
  }
}
