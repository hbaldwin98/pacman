import Player from './player.js';
import Pellet from './pellet.js';
import Wall from './wall.js';
import Ghost from './ghost.js';
import Energizer from './energizer.js';

export default class GameState {
    constructor(canvas, debugMode) {
        this.map = [
            [0   , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0,  ],
            [0   , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0,  ],
            [0   , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0,  ],
            [0   , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0,  ],
            [0   , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0,  ],
            [0   , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0,  ],
            [0   , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0,  ],
            [0   , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0,  ],
            [0   , 'tl', 'hc', 'hc', 'hc', 'hc', 'hc', 'hc', 'hc' , 'hc', 'hc', 'hc', 'hc', 'hc' , 'hc', 'hc', 'hc', 'hc', 'hc' , 'hc', 'hc', 'hc', 'hc', 'hc', 'hc', 'tr', 0,  ],
            [0   , 'vr', 2   , 2   , 2   , 2   , 2   , 2   , 2    , 2   , 2   , 2   , 2   , 'vr' , 2   , 2   , 2   , 2   , 2    , 2   , 2   , 2   , 2   , 2   , 2   , 'vr', 0,  ],
            [0   , 'vr', 2   , 'tl', 'hc', 'hc', 'tr', 2   , 'tl' , 'hc', 'hc', 'tr', 2   , 'vr' , 2   , 'tl', 'hc', 'hc', 'tr' , 2   , 'tl', 'hc', 'hc', 'tr', 2   , 'vr', 0,  ],
            [0   , 'vr', 2   , 'vr', 0   , 0   , 'vr', 2   , 'vr' , 0   , 0   , 'vr', 2   , 'vr' , 2   , 'vr', 0   , 0   , 'vr' , 2   , 'vr', 0   , 0   , 'vr', 2   , 'vr', 0,  ],
            [0   , 'vr', 3   , 'bl', 'hc', 'hc', 'br', 2   , 'bl' , 'hc', 'hc', 'br', 2   , 'vb' , 2   , 'bl', 'hc', 'hc', 'br' , 2   , 'bl', 'hc', 'hc', 'br', 3   , 'vr', 0,  ],
            [0   , 'vr', 2   , 2   , 2   , 2   , 2   , 2   , 2    , 2   , 2   , 2   , 2   , 2    , 2   , 2   , 2   , 2   , 2    , 2   , 2   , 2   , 2   , 2   , 2   , 'vr', 0,  ],
            [0   , 'vr', 2   , 'hs', 'hc', 'hc', 'he', 2   , 'vt' , 2   , 'hs', 'hc', 'hc', 'hct', 'hc', 'hc', 'he', 2   , 'vt' , 2   , 'hs', 'hc', 'hc', 'he', 2   , 'vr', 0,  ],
            [0   , 'vr', 2   , 2   , 2   , 2   , 2   , 2   , 'vr' , 2   , 2   , 2   , 2   , 'vr' , 2   , 2   , 2   , 2   , 'vr' , 2   , 2   , 2   , 2   , 2   , 2   , 'vr', 0,  ],
            [0   , 'bl', 'hc', 'hc', 'hc', 'hc', 'tr', 2   , 'vr' , 'hc', 'hc', 'he', 2   , 'vb' , 2   , 'hs', 'hc', 'hc', 'vr' , 2   , 'tl', 'hc', 'hc', 'hc', 'hc', 'br', 0,  ],
            [0   , 0   , 0   , 0   , 0   , 0   , 'vr', 2   , 'vr' , 0   , 0   , 0   , 5   , 7    , 6   , 4   , 0   , 0   , 'vr' , 2   , 'vr', 0   , 0   , 0   , 0   , 0   , 0,  ],
            [0   , 0   , 0   , 0   , 0   , 0   , 'vr', 2   , 'vr' , 0   , 'tl', 'hc', 'hc', 'hc' , 'hc', 'hc', 'tr', 0   , 'vr' , 2   , 'vr', 0   , 0   , 0   , 0   , 0   , 0,  ],
            ['hc', 'hc', 'hc', 'hc', 'hc', 'hc', 'br', 2   , 'vb' , 0   , 'vr', 0   , 0   , 0    , 0   , 0   , 'vr', 0   , 'vb' , 2   , 'bl', 'hc', 'hc', 'hc', 'hc', 'hc', 'hc'],
            [0   , 0   , 0   , 0   , 0   , -1  , -2  , 2   , 0    , 0   , 'vr', 0   , 0   , 0    , 0   , 0   , 'vr', 0   , 0    , 2   , -2  , -1  , 0   , 0   , 0   , 0   , 0,  ],
            ['hc', 'hc', 'hc', 'hc', 'hc', 'hc', 'tr', 2   , 'vt' , 0   , 'vr', 0   , 0   , 0    , 0   , 0   , 'vr', 0   , 'vt' , 2   , 'tl', 'hc', 'hc', 'hc', 'hc', 'hc', 'hc'],
            [0   , 0   , 0   , 0   , 0   , 0   , 'vr', 2   , 'vr' , 0   , 'bl', 'hc', 'hc', 'hc' , 'hc', 'hc', 'br', 0   , 'vr' , 2   , 'vr', 0   , 0   , 0   , 0   , 0   , 0,  ],
            [0   , 0   , 0   , 0   , 0   , 0   , 'vr', 2   , 'vr' , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 'vr' , 2   , 'vr', 0   , 0   , 0   , 0   , 0   , 0,  ],
            [0   , 'tl', 'hc', 'hc', 'hc', 'hc', 'br', 2   , 'vb' , 0   , 'hs', 'hc', 'hc', 'hct', 'hc', 'hc', 'he', 0   , 'vb' , 2   , 'bl', 'hc', 'hc', 'hc', 'hc', 'tr', 0,  ],
            [0   , 'vr', 2   , 2   , 2   , 2   , 2   , 2   , 2    , 2   , 2   , 2   , 2   , 'vr' , 2   , 2   , 2   , 2   , 2    , 2   , 2   , 2   , 2   , 2   , 2   , 'vr', 0,  ],
            [0   , 'vr', 2   , 'hs', 'hc', 'hc', 'tr', 2   , 'hs' , 'hc', 'hc', 'he', 2   , 'vb' , 2   , 'hs', 'hc', 'hc', 'he' , 2   , 'tl', 'hc', 'hc', 'he', 2   , 'vr', 0,  ],
            [0   , 'vr', 3   , 2   , 2   , 2   , 'vr', 2   , 2    , 2   , 2   , 2   , 2   , 1    , 2   , 2   , 2   , 2   , 2    , 2   , 'vr', 2   , 2   , 2   , 3   , 'vr', 0,  ],
            [0   , 'vr', 'hc', 'hc', 'he', 2   , 'vb', 2   , 'vt' , 2   , 'hs', 'hc', 'hc', 'hct', 'hc', 'hc', 'he', 2   , 'vt' , 2   , 'vb', 2   , 'hs', 'hc', 'hc', 'vr', 0,  ],
            [0   , 'vr', 2   , 2   , 2   , 2   , 2   , 2   , 'vr' , 2   , 2   , 2   , 2   , 'vr' , 2   , 2   , 2   , 2   , 'vr' , 2   , 2   , 2   , 2   , 2   , 2   , 'vr', 0,  ],
            [0   , 'vr', 2   , 'hs', 'hc', 'hc', 'hc', 'hc', 'hcb', 'hc', 'hc', 'he', 2   , 'vb' , 2   , 'hs', 'hc', 'hc', 'hcb', 'hc', 'hc', 'hc', 'hc', 'he', 2   , 'vr', 0,  ],
            [0   , 'vr', 2   , 2   , 2   , 2   , 2   , 2   , 2    , 2   , 2   , 2   , 2   , 2    , 2   , 2   , 2   , 2   , 2    , 2   , 2   , 2   , 2   , 2   , 2   , 'vr', 0,  ],
            [0   , 'bl', 'hc', 'hc', 'hc', 'hc', 'hc', 'hc', 'hc' , 'hc', 'hc', 'hc', 'hc', 'hc' , 'hc', 'hc', 'hc', 'hc', 'hc' , 'hc', 'hc', 'hc', 'hc', 'hc', 'hc', 'br', 0,  ],
            [0   , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0,  ],
            [0   , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0    , 0   , 0   , 0   , 0   , 0   , 0   , 0   , 0,  ],
        ]
        this.images = {
            tl: './tiles/tile_tl.png', // top left
            tr: './tiles/tile_tr.png', // top right
            bl: './tiles/tile_bl.png', // bottom left
            br: './tiles/tile_br.png', // bottom right
            hc: './tiles/tile_hc.png', // horizontal column
            hs: './tiles/tile_hs.png', // horizontal start
            he: './tiles/tile_he.png', // horizontal end
            vr: './tiles/tile_vr.png', // vertical row
            vb: './tiles/tile_vb.png', // vertical bottom
            vt: './tiles/tile_vt.png', // vertical top
            hct: './tiles/tile_hct.png', // horizontal center top
            hcb: './tiles/tile_hcb.png' // horizontal center bottom
        }

        this.ghosts = [];
        this.walls = [];
        this.pellets = [];
        this.energizers = [];
        this.tunnels = [];
        this.debugMode = debugMode;
        this.ghostState = 0;
        this.ghostStates = [
            {
              state: 'scatter',
              time: 6999
            },
            {
                state: 'chase',
                time: 7000
            },
            {
                state: 'scatter',
                time: 27000
            },
            {
                state: 'chase',
                time: 34000
            },
            {
                state: 'scatter',
                time: 54000
            },
            {
                state: 'chase',
                time: 59000
            },
            {
                state: 'scatter',
                time: 79000
            },
            {
                state: 'chase',
                time: 84000
            }]
          this.timeLastEnergized;
          this.canvas = canvas;

        this.initializeMap(canvas);
    }

    initializeMap() {
      this.ghosts = [];
      this.walls = [];
      this.pellets = [];
      this.energizers = [];
      this.tunnels = [];
        this.map.forEach((row, ydx) => {
            row.forEach((tile, xdx) => {
                let pixelSize = this.canvas.height / this.map.length;
                if (typeof tile === "string") {
                    this.walls.push(new Wall(xdx * pixelSize, ydx * pixelSize, pixelSize, this.createImage(tile)));
                } else if (tile === 1) {
                    this.player = new Player(xdx * pixelSize + pixelSize / 2, ydx * pixelSize + pixelSize / 2, pixelSize / 2.085);
                } else if (tile === 2) {
                    this.pellets.push(new Pellet(xdx * pixelSize + pixelSize / 2, ydx * pixelSize + pixelSize / 2, pixelSize / 8));
                } else if (tile === 3) {
                    this.energizers.push(new Energizer(xdx * pixelSize + pixelSize / 2, ydx * pixelSize + pixelSize / 2, pixelSize / 4));
                } else if (tile === 4) {
                    this.ghosts.push(new Ghost("Blinky", xdx * pixelSize + pixelSize / 2, ydx * pixelSize + pixelSize / 2, pixelSize / 2.085, this.debugMode, this.canvas));
                } else if (tile === 5) {
                    this.ghosts.push(new Ghost("Pinky", xdx * pixelSize + pixelSize / 2, ydx * pixelSize + pixelSize / 2, pixelSize / 2.085, this.debugMode, this.canvas));
                } else if (tile === 6) {
                    this.ghosts.push(new Ghost("Clyde", xdx * pixelSize + pixelSize / 2, ydx * pixelSize + pixelSize / 2, pixelSize / 2.085, this.debugMode, this.canvas));
                } else if (tile === 7) {
                    this.ghosts.push(new Ghost("Inky", xdx * pixelSize + pixelSize / 2, ydx * pixelSize + pixelSize / 2, pixelSize / 2.085, this.debugMode, this.canvas));
                } else if (tile === -1) {
                    this.tunnels.push({ x: xdx * pixelSize, y: ydx * pixelSize, start: true });
                } else if (tile === -2) {
                    this.tunnels.push({ x: xdx * pixelSize, y: ydx * pixelSize, start: false });
                }
            })
        })
    }

    createImage(link) {
        let sprite = new Image();
        sprite.src = this.images[link];

        return sprite;
    }

    checkGhostStates(timeElapsed) {
        if (this.ghostStates[this.ghostState].time <= timeElapsed && !this.energized) {
            this.setGhostStates();
            if (this.ghostState < this.ghostStates.length - 1) this.ghostState++;
        }

    }

    setGhostStates() {
      this.ghosts.forEach(ghost => {
        ghost.setGhostState(this.ghostStates[this.ghostState].state);
    });
    }

    energizer(time) {
      let timeout;
      if (this.energized) {
        clearTimeout(timeout);

        this.ghostStates.forEach(state => {
          state.time += 8000 - (time - this.timeLastEnergized);
        })
        
        this.timeLastEnergized = time;
        timeout = setTimeout(() => {
          this.energized = false; 
          this.setGhostStates();
        }, 8000);
      } else {
        this.energized = true;
        this.timeLastEnergized = time;
        this.ghosts.forEach(ghost => {
            ghost.setGhostState("frightened");
        });
        this.ghostStates.forEach(state => {
            state.time += 8000;
        })
        timeout = setTimeout(() => {
          this.energized = false; 
          this.setGhostStates();
        }, 8000);
      }
    }
}