import Helpers from "./Helpers";
import { Star } from "./Star";

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
    //1=zyje(update)  0=nie zyje(delete) -1=zabil przez kamikadze -2=zabil przez zestrzelenie 2=(enemy nie zyje ale)narysuj pociski
    vecX: number;
    vecY: number;
    targetX: number;
    targetY: number;
    posX: number;
    posY: number;
    attack: any;

    stars: Star[][]
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

    reachtarget = () => {
        if (this.vecY < 0 && this.y < this.targetY) {
            return true;
        }
        else if (this.vecY > 0 && this.y > this.targetY) {
            return true;
        }
        else if (this.vecX < 0 && this.x < this.targetX) {
            return true;
        }
        else if (this.vecX > 0 && this.x > this.targetX) {
            return true;
        }
        return false;
    }

    die = () => {
        this.speed = 0
        this.state = 0;
    }

}