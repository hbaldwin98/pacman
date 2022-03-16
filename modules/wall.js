export default class Wall {
    x;
    y;
    width;
    height;
    sprite;
    image;

    constructor(x, y, pixelSize, sprite) {
        this.x = x;
        this.y = y;
        this.width = pixelSize;
        this.height = pixelSize;
        this.sprite = sprite
        this.image = this.loadImage();
    }

    draw(ctx) {
        switch (this.sprite) {
            case 'tl':
                ctx.drawImage(this.image, 32.5, 32, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'tr':
                ctx.drawImage(this.image, 63.5, 32, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'bl':
                ctx.drawImage(this.image, 32.5, 64, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'br':
                ctx.drawImage(this.image, 63.5, 64, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'hr':
                ctx.drawImage(this.image, 64, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'hs':
                ctx.drawImage(this.image, 32, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'he':
                ctx.drawImage(this.image, 96, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'hct':
                ctx.drawImage(this.image, 129, 0, 30, 32, this.x, this.y, this.width, this.height);
                break;
            case 'vr':
                ctx.drawImage(this.image, 0, 32, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'vt':
                ctx.drawImage(this.image, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
                break;
            case 'vb':
                ctx.drawImage(this.image, 0, 64, 32, 32, this.x, this.y, this.width, this.height);
                break;
            default:
                ctx.strokeStyle = 'blue';
                ctx.strokeRect(this.x, this.y, this.width, this.height);
                break;

        }


    }

    loadImage() {
        // background tiles credit to https://jack-studio.itch.io/pac-man-tiles
        let newImage = new Image();
        newImage.src = './tiles/background_tiles.png';
        return newImage;
    }
}
