export class EnemyBullet {
    image: HTMLImageElement;
    x: number;
    y: number;
    xd: number;
    yd: number;
    width: number;
    height: number;
    speed: number = 10;
    state: number = 1;
    r: number;
    constructor(posX: number, x: number, y: number) {
        this.x = x
        this.y = y
        this.r = posX * 3.5
        this.image = new Image;
        this.image.src = "./gfx/bullets/enemy/1.PNG";
        this.image.onload = () => {
            this.yd = -this.image.height
            this.width = this.image.width;
            this.height = this.image.height;
        }

    }

    draw = (c: CanvasRenderingContext2D) => {
        c.drawImage(this.image, this.x, this.y + this.yd);
    }

    update = (c: CanvasRenderingContext2D) => {
        this.draw(c)
        this.y += this.speed
        this.x += this.r
        if (this.y > innerHeight) {
            this.stop()
        }
    }

    stop = () => {
        this.speed = 0;
        this.r = 0;
        this.state = 0;
    }
}