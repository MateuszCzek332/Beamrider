import { Bullet } from "./Bullet";
export abstract class Enemy {
    image: HTMLImageElement;
    imageState: number = 1;
    x: number;
    y: number;
    xd: number;
    yd: number;
    width: number;
    height: number;
    speed: number = 3;
    state: number = 1;
    constructor(src: string) {
        this.image = new Image;
        this.image.src = src
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

    die = () => {
        this.speed = 0
        this.state = 0;
    }

    checkColision = (bullet: Bullet) => {
        return bullet != null && bullet.y + bullet.yd < this.y + this.yd + this.height && bullet.x + bullet.xd < this.x + this.xd + this.width && bullet.x + bullet.xd + this.width > this.x + this.xd;
    }

    getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}