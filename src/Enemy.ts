export abstract class Enemy {
    image: HTMLImageElement;
    imageState: number = 1;
    x: number;
    y: number;
    xd: number;
    yd: number;
    speed: number = 3;
    constructor(src: string) {
        this.image = new Image;
        this.image.src = src
        this.image.onload = () => {
            this.xd = -this.image.width / 2
            this.yd = -this.image.height
        }

    }

    draw = (c: CanvasRenderingContext2D) => {
        c.drawImage(this.image, this.x + this.xd, this.y + this.yd);
    }

    update = (c: CanvasRenderingContext2D) => {

    }
}