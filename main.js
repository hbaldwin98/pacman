import Player from './modules/player.js';
import Pellet from './modules/pellet.js';
import Wall from './modules/wall.js';
import Ghost from './modules/ghost.js';

let map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 'tl', 'hr', 'hr', 'hr', 'hr', 'hr', 'hr' , 'hr', 'hr', 'hr', 'hr', 'hr', 'tr', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 'vr', 0   , 2   , 2   , 2   , 2  , 4    , 2   , 2   , 2   , 2   , 0   , 'vr', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 'vr', 2   , 'vt', 0   , 'hs', 'hr', 'hr' , 'hr', 'he', 0   , 'vt', 2   , 'vr', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 'vr', 2   , 'vr', 0   , 0   , 0   , 0    , 0   , 0   , 0   , 'vr', 2   , 'vr', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 'vr', 0   , 'vb', 0   , 'hs', 'hr', 'hct', 'hr', 'he', 0   , 'vb', 0   , 'vr', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 'vr', 0   , 0   , 0   , 2   , 2   , 'vr' , 2   , 2   , 0   , 0   , 0   , 'vr', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 'vr', 0   , 'hs', 'hr', 'he', 2   , 'vb' , 2   , 'hs', 'hr', 'he', 0   , 'vr', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 'vr', 2   , 0   , 0   , 0   , 0   , 3    , 0   , 0   , 0   , 0   , 2   , 'vr', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 'vr', 2   , 'hs', 'hr', 'hr', 'hr', 'hr' , 'hr', 'hr', 'hr', 'he', 2   , 'vr', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 'vr', 0   , 2   , 2   , 2   , 2   , 2    , 2   , 2   , 2   , 2   , 0   , 'vr', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 'bl', 'hr', 'hr', 'hr', 'hr', 'hr', 'hr' , 'hr', 'hr', 'hr', 'hr', 'hr', 'br', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0, 0, 0, 0, 0, 0, 0],
]


let canvas = document.querySelector('canvas');
export let ctx = canvas.getContext('2d')
let player;
let ghost;
let walls = [];
let pellets = [];

map.forEach((row, ydx) => {
    row.forEach((tile, xdx) => {
        let pixelSize = canvas.height / map.length;
        if (tile === 1 || typeof tile === "string") {
            walls.push(new Wall(xdx * pixelSize, ydx * pixelSize, pixelSize, tile));
        } else if (tile === 2) {
            pellets.push(new Pellet(xdx * pixelSize + pixelSize / 2, ydx * pixelSize + pixelSize / 2, pixelSize / 8));
        } else if (tile === 3) {
            player = new Player(xdx * pixelSize + pixelSize / 2, ydx * pixelSize + pixelSize / 2, pixelSize / 2.181818)
        } else if (tile === 4) {
            ghost = new Ghost(xdx * pixelSize + pixelSize / 2, ydx * pixelSize + pixelSize / 2, pixelSize / 2.181818)
        }
    })
})

function drawCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    walls.forEach(wall => {
        wall.draw(ctx);
    })

    pellets.forEach(pellet => {
        pellet.draw(ctx);
    })
}

function update() {
    if (pellets.length > 0) {
        drawCanvas();
        player.checkBorderPosition(canvas);
        player.drawPlayer(ctx);
        player.update(walls, pellets);
        ghost.drawGhost(ctx, player);
        ghost.update(walls,ctx, player);

        // requestAnimationFrame(update);
    } else {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '75px "Press Start 2P"';
        ctx.fillStyle = "Blue";
        let winnerText = "YOU WIN";
        ctx.fillText(winnerText, (canvas.width / 2) - (75 * winnerText.length) / 2, canvas.height/2);
    }

}

setInterval(update, 16.6);
// update();
ctx.imageSmoothingEnabled = false;