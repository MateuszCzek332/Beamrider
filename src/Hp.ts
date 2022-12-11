import Helpers from "./Helpers";
import { PlayerController } from "./PlayerController";

export class Hp {
    image: HTMLImageElement;
    x: number;
    y: number;
    xd: number;
    yd: number;
    width: number;
    height: number;
    speed: number = 5;
    state: number = 1;
    r: number;
    heal: boolean = true;
    constructor(public posX: number, x: number, y: number) {
        this.x = x
        this.y = y
        this.r = 0
        this.r = posX * 1.8
        this.image = new Image;
        this.image.src = "./gfx/hp/4.PNG";
        this.image.onload = () => {
            this.yd = -this.image.height
            this.xd = -this.image.width / 4
            this.width = this.image.width;
            this.height = this.image.height;
        }

    }

    draw = (c: CanvasRenderingContext2D) => {
        c.drawImage(this.image, this.x + this.xd, this.y + this.yd);
    }

    update = (c: CanvasRenderingContext2D, player: PlayerController) => {
        this.draw(c)
        this.y += this.speed
        this.x += this.r


        if (Helpers.checkCollision(this, player.bullet)) {
            this.setDead()
        }

        if (Helpers.checkCollision(this, player)) {
            if (this.heal)
                this.state = 2
            else
                this.state = -1
        }

        if (this.y > innerHeight) {
            this.stop()
        }

        if (this.heal)
            switch (true) {
                case this.y < 150 && this.image.src != "./gfx/hp/4.PNG":
                    this.image.src = "./gfx/hp/4.PNG";
                    break
                case this.y < 250 && this.image.src != "./gfx/hp/3.PNG":
                    this.image.src = "./gfx/hp/3.PNG";
                    break
                case this.y < 400 && this.image.src != "./gfx/hp/2.PNG":
                    this.image.src = "./gfx/hp/2.PNG";
                    break
                case this.image.src != "./gfx/hp/1.PNG":
                    this.image.src = "./gfx/hp/1.PNG";
                    break
            }
    }

    setDead() {
        this.heal = false;
        this.image.src = "./gfx/hp/dead.PNG";
    }

    stop = () => {
        this.speed = 0;
        this.r = 0;
        this.state = 0;
    }
}