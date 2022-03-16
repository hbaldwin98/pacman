export default class Pellet {
    x;
    y;
    radius;

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "tan";
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fill();
    }
}
