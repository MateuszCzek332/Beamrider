export class Star {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    draw = (c: CanvasRenderingContext2D) => {
        c.fillStyle = "rgb(56,104,144)";
        c.fillRect(this.x, this.y, 14, 5)
    }
}