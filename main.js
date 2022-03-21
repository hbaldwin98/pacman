import GameState from './modules/state.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// audio files sourced from:
// https://www.sounds-resource.com/arcade/pacman/sound/10603/
const audio = {
  munch1: new Audio('./sounds/munch_1.wav'),
  munch2: new Audio('./sounds/munch_2.wav'),
};
const gameState = new GameState(canvas, false);
const timeStart = Date.now();
let timeElapsed = timeStart;
ctx.imageSmoothingEnabled = false;

// draws the canvas and places the walls and pellets on the map
function drawCanvas() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  gameState.walls.forEach((wall) => {
    wall.draw(ctx);
  });

  gameState.pellets.forEach((pellet) => {
    pellet.draw(ctx);
  });

  gameState.energizers.forEach((energizer) => {
    energizer.draw(ctx);
  });
}

function update() {
  timeElapsed = Date.now() - timeStart;

  if (gameState.pellets.length > 0) {
    drawCanvas();
    gameState.player.checkBorderPosition(canvas);
    gameState.player.drawPlayer(ctx);
    gameState.player.update(gameState, audio, timeElapsed);
    gameState.checkGhostStates(timeElapsed);
    gameState.ghosts.forEach((ghost) => {
      ghost.checkBorderPosition(canvas);
      ghost.drawGhost(ctx, gameState.player);
      ghost.update(
        gameState.walls,
        ctx,
        gameState.player,
        gameState.tunnels,
        gameState.ghosts,
        canvas,
      );
    });
    // requestAnimationFrame(update);
  } else {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '75px "Press Start 2P"';
    ctx.fillStyle = 'Blue';
    const winnerText = 'YOU WIN';
    ctx.fillText(
      winnerText,
      canvas.width / 2 - (75 * winnerText.length) / 2,
      canvas.height / 2,
    );
  }
}

setInterval(update, 12);
// update();
