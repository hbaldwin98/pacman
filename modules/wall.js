export default class Wall {
    x;
    y;
    width;
    height;
    sprite;
    images;

    constructor(x, y, pixelSize, sprite) {
        this.x = x;
        this.y = y;
        this.width = pixelSize;
        this.height = pixelSize;
        this.sprite = sprite
        this.images = this.loadImage();
    }

    draw(ctx) {
        switch (this.sprite) {
            case 'tl':
                ctx.drawImage(this.images.tl, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'tr':
                ctx.drawImage(this.images.tr, 0, 0, 32, 32, this.x, this.y, this.width, this.height);    
                break;
            case 'bl':
                ctx.drawImage(this.images.bl, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'br':
                ctx.drawImage(this.images.br, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'hr':
                ctx.drawImage(this.images.hr, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'hs':
                ctx.drawImage(this.images.hs, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'he':
                ctx.drawImage(this.images.he, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'hct':
                ctx.drawImage(this.images.hct, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'vr':
                ctx.drawImage(this.images.vr, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'vt':
                ctx.drawImage(this.images.vt, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'vb':
                ctx.drawImage(this.images.vb, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            default:
                ctx.strokeStyle = 'blue';
                ctx.strokeRect(this.x, this.y, this.width, this.height);
                break;

        }


    }

    loadImage() {
        // background tiles credit to https://jack-studio.itch.io/pac-man-tiles
        let images = [];
        let tl = new Image();
        let tr = new Image();
        let bl = new Image();
        let br = new Image();
        let hr = new Image();
        let hs = new Image();
        let he = new Image();
        let vr = new Image();
        let vb = new Image();
        let vt = new Image();
        let hct = new Image();
        tl.src = './tiles/tile_tl.png';
        images.tl = tl;
        tr.src = './tiles/tile_tr.png';
        images.tr = tr;
        bl.src = './tiles/tile_bl.png';
        images.bl = bl;
        br.src = './tiles/tile_br.png';
        images.br = br;
        hr.src = './tiles/tile_hr.png';
        images.hr = hr;
        hs.src = './tiles/tile_hs.png';
        images.hs = hs;
        he.src = './tiles/tile_he.png';
        images.he = he;
        vr.src = './tiles/tile_vr.png';
        images.vr = vr;
        vb.src = './tiles/tile_vb.png';
        images.vb = vb;
        vt.src = './tiles/tile_vt.png';
        images.vt = vt;
        hct.src = './tiles/tile_hct.png';
        images.hct = hct;
        return images;
    }
}
