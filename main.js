import GameState from './modules/state.js';
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')
// audio files sourced from:
// https://www.sounds-resource.com/arcade/pacman/sound/10603/
let audio = {
    munch1: new Audio('./sounds/munch_1.wav'),
    munch2: new Audio('./sounds/munch_2.wav')
}
let gameState = new GameState(canvas, true);
let timeStart = Date.now();
let timeElapsed = timeStart;
ctx.imageSmoothingEnabled = false;


// draws the canvas and places the walls and pellets on the map
function drawCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    gameState.walls.forEach(wall => {
        wall.draw(ctx);
    })

    gameState.pellets.forEach(pellet => {
        pellet.draw(ctx);
    })
}

function update() {
    timeElapsed = Date.now() - timeStart;
    
    if (gameState.pellets.length > 0) {
        drawCanvas();
        gameState.player.checkBorderPosition(canvas);
        gameState.player.drawPlayer(ctx);
        gameState.player.update(gameState.walls, gameState.pellets, audio);
        gameState.checkGhostStates(timeElapsed);
        gameState.ghosts.forEach(ghost => {
            ghost.checkBorderPosition(canvas);
            ghost.drawGhost(ctx, gameState.player);
            ghost.update(gameState.walls, ctx, gameState.player, gameState.tunnels);
        })
        // requestAnimationFrame(update);
    } else {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '75px "Press Start 2P"';
        ctx.fillStyle = "Blue";
        let winnerText = "YOU WIN";
        ctx.fillText(winnerText, (canvas.width / 2) - (75 * winnerText.length) / 2, canvas.height / 2);
    }

}

setInterval(update, 12);
// update();

