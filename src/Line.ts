export class Line {
    x: number = 0;
    y: number;
    speed: number;
    width: number = innerWidth;
    height: number = 10;
    spawnPos: number;
    botBounty: number;
    constructor(y: number, speed: number, spawnPos: number, botBounty: number,) {
        this.y = y;
        this.speed = speed;
        this.spawnPos = spawnPos;
        this.botBounty = botBounty;
    }

    draw = (c: CanvasRenderingContext2D) => {
        c.fillStyle = "rgb(56,104,144)";
        c.fillRect(this.x, this.y, this.width, this.height)
    }

    update = (c: CanvasRenderingContext2D) => {
        this.draw(c)
        this.y *= this.speed
        if (this.y >= this.botBounty)
            this.y = this.spawnPos
    }
}