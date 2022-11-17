export class Bullet {
    image: HTMLImageElement;
    x: number;
    y: number;
    speed: number = 20;
    width: number = innerWidth;
    height: number = 10;
    spawnPos: number;
    bounty: number = 150;
    r: number;
    xwidth: number;
    constructor(posX: number, y: number,) {
        this.image = new Image;
        this.image.src = "./gfx/bullet1.PNG";
        let wd = innerWidth / 5
        this.r = posX * -6.5
        this.y = y - 35;
        this.x = this.width = innerWidth / 2 + posX * wd + posX * 12 - 45.5
    }

    draw = (c: CanvasRenderingContext2D) => {
        c.drawImage(this.image, this.x, this.y);
    }

    update = (c: CanvasRenderingContext2D) => {
        this.draw(c)
        this.y -= this.speed
        this.x += this.r
    }
}