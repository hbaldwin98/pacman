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
    }

    draw(ctx) {
        ctx.drawImage(this.sprite, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
    }
}
