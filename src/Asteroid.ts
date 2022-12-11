import Helpers from "./Helpers";
import { PlayerController } from "./PlayerController";

export class Asteroid {
    image: HTMLImageElement;
    x: number;
    y: number;
    xd: number;
    yd: number;
    width: number;
    height: number;
    speed: number = 0;
    state: number = 1;
    r: number = 0;
    spawned: boolean = false
    constructor(public posX: number, x: number, y: number) {
        this.x = x
        this.y = y
        this.image = new Image;

        setTimeout(() => this.spawn(), Helpers.getRandomInt(500, 5000))

        this.image.onload = () => {
            this.yd = -this.image.height
            this.xd = -this.image.width / 2
            this.width = this.image.width;
            this.height = this.image.height;
        }

    }

    spawn = () => {
        this.image.src = "./gfx/enemys/asteroid/1.png";
        this.speed = 3;
        this.r = this.posX * 1.1
        this.spawned = true
    }

    draw = (c: CanvasRenderingContext2D) => {
        c.drawImage(this.image, this.x + this.xd, this.y + this.yd);
    }

    update = (c: CanvasRenderingContext2D, player: PlayerController) => {
        this.draw(c)
        this.y += this.speed
        this.x += this.r

        if (Helpers.checkCollision(this, player.bullet)) {
            if (player.bullet.type == 2)
                this.stop()
            player.bullet.stop()
        }

        if (Helpers.checkCollision(this, player)) {
            this.stop()
            this.state = -1
        }

        if (this.y > innerHeight) {
            this.stop()
        }

        if (this.spawned)
            switch (true) {
                case this.y < 150:
                    this.image.src = "./gfx/enemys/asteroid/1.png";
                    break
                case this.y < 250:
                    this.image.src = "./gfx/enemys/asteroid/2.png";
                    break
                case this.y < 400:
                    this.image.src = "./gfx/enemys/asteroid/3.png";
                    break
                default:
                    this.image.src = "./gfx/enemys/asteroid/4.png";
                    break
            }
    }

    stop = () => {
        this.speed = 0;
        this.r = 0;
        this.state = 0;
    }
}