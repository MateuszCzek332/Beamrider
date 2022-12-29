export class Bullet {
    image: HTMLImageElement;
    x: number;
    y: number;
    xd: number;
    yd: number;
    width: number;
    height: number;
    speed: number = 20;
    type: number;       // type 1 - normal, type=2 - special
    state: number = 1;
    r: number;
    constructor(posX: number, y: number, type: number) {
        this.type = type;
        this.x = innerWidth / 2 + posX * (innerWidth / 5)
        this.y = y
        this.r = posX * -7
        this.image = new Image;
        if (type == 1)
            this.image.src = "./gfx/bullets/player1/bullet1.PNG";
        else
            this.image.src = "./gfx/bullets/player2/bullet2.PNG";

        this.image.onload = () => {
            this.xd = -this.image.width / 2
            this.yd = -this.image.height
            this.width = this.image.width;
            this.height = this.image.height;
        }


    }

    draw = (c: CanvasRenderingContext2D) => {
        c.drawImage(this.image, this.x + this.xd, this.y + this.yd);
    }

    update = (c: CanvasRenderingContext2D) => {
        this.draw(c)
        this.y -= this.speed
        this.x += this.r

        if (this.type == 1) {
            if (this.y < 220)
                this.state = 0;
        }
        else if (this.type == 2) {
            if (this.state == 1 && this.y < 400) {
                this.image.src = "./gfx/bullets/player2/bullet2-2.PNG";
                this.state = 2

            }
            else if (this.state == 2 && this.y < 200) {
                this.image.src = "./gfx/bullets/player2/bullet2-3.PNG";
                this.state = 3
            }
            if (this.y < 70)
                this.state = 0;
        }

    }

    stop = () => {
        this.speed = 0;
        this.r = 0;
        this.state = 0;
    }
}