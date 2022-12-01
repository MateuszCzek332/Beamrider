export class Bullet {
    image: HTMLImageElement;
    x: number;
    y: number;
    speed: number = 20;
    type: number;
    state: number = 1;
    width: number = innerWidth;
    height: number = 10;
    spawnPos: number;
    bounty: number = 150;
    r: number;
    xwidth: number;
    constructor(posX: number, y: number, type: number) {
        this.image = new Image;
        this.type = type;
        let wd = innerWidth / 5
        this.r = posX * -7.5
        if (type == 1) {
            this.image.src = "./gfx/bullets/player1/bullet1.PNG";
            this.y = y - 35;
            this.x = this.width = innerWidth / 2 + posX * wd + posX * 12 - 45.5
        }
        else {
            this.image.src = "./gfx/bullets/player2/bullet2.PNG";
            this.y = y - 27;
            this.x = this.width = innerWidth / 2 + posX * wd + posX * 12 - 25.5
        }
    }

    stop = () => {
        this.speed = 0;
        this.r = 0;
    }

    draw = (c: CanvasRenderingContext2D) => {
        c.drawImage(this.image, this.x, this.y);
    }

    update = (c: CanvasRenderingContext2D) => {
        this.draw(c)
        this.y -= this.speed
        this.x += this.r

        if (this.type == 1) {
            if (this.y < 180)
                this.state = 0;
        }
        else if (this.type == 2) {
            if (this.state == 1 && this.y < 400) {
                this.image.src = "./gfx/bullets/player2/bullet2-2.PNG";
                this.x += 9.5
                this.state = 2

            }
            else if (this.state == 2 && this.y < 200) {
                this.image.src = "./gfx/bullets/player2/bullet2-3.PNG";
                this.x += 11.5
                this.state = 3

            }
            if (this.y < 70)
                this.state = 0;
        }


    }
}