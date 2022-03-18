import Player from './modules/player.js';
import Pellet from './modules/pellet.js';
import Wall from './modules/wall.js';
import Ghost from './modules/ghost.js';

let map = [
    [0    , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0,  ],
    [0    , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0,  ],
    [0    , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0,  ],
    [0    , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0,  ],
    [0    , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0,  ],
    [0    , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0,  ],
    [0    , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0,  ],
    [0    , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0,  ],
    [0    , 'tl' , 'hc' , 'hc' , 'hc' , 'hc' , 'hc' , 'hc' , 'hc'  , 'hc' , 'hc' , 'hc' , 'hc' , 'hc'  , 'hc' , 'hc' , 'hc' , 'hc' , 'hc'  , 'hc' , 'hc' , 'hc' , 'hc' , 'hc' , 'hc' , 'tr' , 0,  ],
    [0    , 'vr' , 2    , 2    , 2    , 2    , 2    , 2    , 2     , 2    , 2    , 2    , 2    , 'vr'  , 2    , 2    , 2    , 2    , 2     , 2    , 2    , 2    , 2    , 2    , 2    , 'vr' , 0,  ],
    [0    , 'vr' , 2    , 'tl' , 'hc' , 'hc' , 'tr' , 2    , 'tl'  , 'hc' , 'hc' , 'tr' , 2    , 'vr'  , 2    ,'tl'  , 'hc' , 'hc' , 'tr'     , 2    , 'tl' , 'hc' , 'hc' , 'tr' , 2    , 'vr' , 0,  ],
    [0    , 'vr' , 2    , 'vr' , 0    , 0    , 'vr' , 2    , 'vr'  , 0    , 0    ,'vr'  , 2    , 'vr'  , 2    , 'vr'  , 0    , 0    ,'vr'      , 2    , 'vr' , 0    , 0    , 'vr' , 2    , 'vr' , 0,  ],
    [0    , 'vr' , 0    , 'bl' , 'hc' , 'hc' , 'br' , 2    , 'bl'  , 'hc' , 'hc' , 'br' , 2    , 'vb'  , 2    ,'bl'  , 'hc' , 'hc' , 'br'     , 2    , 'bl' , 'hc' , 'hc' , 'br' , 0    , 'vr' , 0,  ],
    [0    , 'vr' , 2    , 2    , 2    , 2    , 2    , 2    , 2     , 2    , 2    ,2     ,2     , 2     ,2     ,2     ,2     , 2    , 2     , 2    ,2     ,2     ,2     , 2    , 2    , 'vr' , 0,  ],
    [0    , 'vr' , 2    , 'hs' , 'hc' , 'hc' , 'he' , 2    , 'vt'  , 2    , 'hs' , 'hc' , 'hc' , 'hct' , 'hc' , 'hc' , 'he' , 2    , 'vt'  , 2    , 'hs' , 'hc' , 'hc' , 'he' , 2    , 'vr' , 0,  ],
    [0    , 'vr' , 2    , 2    , 2    , 2    , 2    , 2    , 'vr'  , 2    , 2    , 2    , 2    , 'vr'  , 2    , 2    , 2    , 2    , 'vr'  , 2    , 2    , 2    , 2    , 2    , 2    , 'vr' , 0,  ],
    [0    , 'bl' ,'hc'  , 'hc' ,'hc'  ,'hc'  , 'tr' , 2    , 'vr'  , 'hc' , 'hc' , 'he' , 2    , 'vb'  , 2    , 'hs' , 'hc' , 'hc' , 'vr'  , 2    , 'tl' , 'hc' , 'hc' , 'hc' , 'hc' , 'br' , 0,  ],
    [0    , 0    , 0    , 0    , 0    , 0    , 'vr' , 2    , 'vr'  , 0    , 0    , 0    , 0    , 4     , 0    , 0    , 0    , 0    , 'vr'  , 2    , 'vr' , 0    , 0    , 0    , 0    , 0    , 0,  ],
    [0    , 0    , 0    , 0    , 0    , 0    , 'vr' , 2    , 'vr'  , 0    , 'tl' , 'hc' , 'hc' , 'hc'  , 'hc' , 'hc' , 'tr' , 0    , 'vr'  , 2    , 'vr' , 0    , 0    , 0    , 0    , 0    , 0,  ],
    ['hc' ,'hc'  ,'hc'  , 'hc' ,'hc'  ,'hc'  , 'br' , 2    , 'vb'  , 0    , 'vr' , 0    , 0    , 0     , 0    , 0    , 'vr' , 0    , 'vb'  , 2    , 'bl' , 'hc' ,'hc'  ,'hc'  , 'hc' ,'hc'  ,'hc' ],
    [0    , 0    , 0    , 0    , 0    , 0    , 0    , 2    , 0     , 0    , 'vr' , 0    , 0    , 0     , 0    , 0    , 'vr' , 0    , 0     , 2    , 0    , 0    , 0    , 0    , 0    , 0    , 0,  ],
    ['hc' ,'hc'  ,'hc'  , 'hc' ,'hc'  ,'hc'  , 'tr' , 2    , 'vt'  , 0    , 'vr' , 0    , 0    , 0     , 0    , 0    , 'vr' , 0    , 'vt'  , 2    , 'tl' ,'hc'  ,'hc'  ,'hc'  , 'hc' ,'hc'  ,'hc' ],
    [0    , 0    , 0    , 0    , 0    , 0    , 'vr' , 2    , 'vr'  , 0    , 'bl' , 'hc' , 'hc' , 'hc'  , 'hc' , 'hc' , 'br' , 0    , 'vr'  , 2    , 'vr' , 0    , 0    , 0    , 0    , 0    , 0,  ],
    [0    , 0    , 0    , 0    , 0    , 0    , 'vr' , 2    , 'vr'  , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 'vr'  , 2    , 'vr' , 0    , 0    , 0    , 0    , 0    , 0,  ],
    [0    , 'tl' , 'hc' , 'hc' , 'hc' , 'hc' , 'br' , 2    , 'vb'  , 0    , 'hs' , 'hc' , 'hc' , 'hct' , 'hc' , 'hc' , 'he' , 0    , 'vb'  , 2    , 'bl' , 'hc' , 'hc' , 'hc' , 'hc' , 'tr' , 0,  ],
    [0    , 'vr' ,2     , 2    ,2     ,2     ,2     , 2    , 2     ,2     ,2     ,2     , 2    , 'vr'  , 2    , 2    ,2     ,2     ,2      , 2    , 2    , 2    , 2    , 2    , 2    , 'vr' , 0,  ],
    [0    , 'vr' ,2     , 'hs' , 'hc' , 'hc' , 'tr' , 2    ,'hs'   , 'hc' , 'hc' , 'he' , 2    , 'vb'  , 2    , 'hs' , 'hc' , 'hc' , 'he'  , 0    , 'tl' , 'hc' , 'hc' , 'he' , 2    , 'vr' , 0,  ],
    [0    , 'vr' , 0    ,2     ,2     ,2     , 'vr' , 2    , 2     , 2    , 2    , 2    , 2    , 3     , 2    , 2    , 2    , 2    , 2     , 2    , 'vr' , 2    , 2    , 2    , 0    , 'vr' , 0,  ],
    [0    , 'vr' , 'hc' , 'hc' , 'he' , 2    , 'vb' , 2    , 'vt'  , 2    , 'hs' , 'hc' , 'hc' , 'hct' , 'hc' , 'hc' , 'he' , 2    ,'vt'   , 2    , 'vb' , 2    , 'hs' , 'hc' , 'hc' , 'vr' , 0,  ],
    [0    , 'vr' , 2    , 2    , 2    , 2    , 2    , 2    , 'vr'  , 2    , 2    , 2    , 2    , 'vr'  , 2    , 2    , 2    , 2    ,'vr'   , 2    , 2    , 2    , 2    , 2    , 2    , 'vr' , 0,  ],
    [0    , 'vr' , 2    , 'hs' , 'hc' , 'hc' , 'hc' , 'hc' , 'hcb' , 'hc' , 'hc' , 'he' , 2    , 'vb'  , 2    , 'hs' , 'hc' , 'hc' , 'hcb' , 'hc' , 'hc' , 'hc' , 'hc' , 'he' , 2    , 'vr' , 0,  ],
    [0    , 'vr' , 2    , 2    , 2    , 2    , 2    , 2    , 2     , 2    , 2    , 2    , 2    , 2     , 2    , 2    , 2    , 2    , 2     , 2    , 2    , 2    , 2    , 2    , 2    , 'vr' , 0,  ],
    [0    , 'bl' , 'hc' , 'hc' , 'hc' , 'hc' , 'hc' , 'hc' , 'hc'  , 'hc' , 'hc' , 'hc' , 'hc' , 'hc'  , 'hc' , 'hc' , 'hc' , 'hc' , 'hc'  , 'hc' , 'hc' , 'hc' , 'hc' , 'hc' , 'hc' , 'br' , 0,  ],
    [0    , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0,  ],
    [0    , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0     , 0    , 0    , 0    , 0    , 0    , 0    , 0    , 0,  ],
                                                                                                                                   ]

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')
const DEBUG = false;
let player;
let ghost;
let walls = [];
let pellets = [];
let images = {
    tl : './tiles/tile_tl.png' , // top left
    tr : './tiles/tile_tr.png' , // top right
    bl : './tiles/tile_bl.png' , // bottom left
    br : './tiles/tile_br.png' , // bottom right
    hc : './tiles/tile_hc.png' , // horizontal column
    hs : './tiles/tile_hs.png' , // horizontal start
    he : './tiles/tile_he.png' , // horizontal end
    vr : './tiles/tile_vr.png' , // vertical row
    vb : './tiles/tile_vb.png' , // vertical bottom
    vt : './tiles/tile_vt.png' , // vertical top
    hct: './tiles/tile_hct.png', // horizontal center top
    hcb: './tiles/tile_hcb.png' // horizontal center bottom
}
console.log(canvas.width / 24);
map.forEach((row, ydx) => {
    row.forEach((tile, xdx) => {
        let pixelSize = canvas.height / map.length;
        if (typeof tile === "string") {
            let sprite = new Image();
            sprite.src = images[tile];
            walls.push(new Wall(xdx * pixelSize, ydx * pixelSize, pixelSize, sprite));
        } else if (tile === 2) {
            pellets.push(new Pellet(xdx * pixelSize + pixelSize / 2, ydx * pixelSize + pixelSize / 2, pixelSize / 8));
        } else if (tile === 3) {
            player = new Player(xdx * pixelSize + pixelSize / 2, ydx * pixelSize + pixelSize / 2, pixelSize / 2.085)
        } else if (tile === 4) {
            ghost = new Ghost(xdx * pixelSize + pixelSize / 2, ydx * pixelSize + pixelSize / 2, pixelSize / 2.085, DEBUG)
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
        ghost.checkBorderPosition(canvas);
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

setInterval(update, 12);
// update();
ctx.imageSmoothingEnabled = false;