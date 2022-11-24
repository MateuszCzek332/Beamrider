import { Enemy } from "./Enemy";

export class Ufo extends Enemy {
    constructor() {
        super("./gfx/enemys/ufo1/1.PNG")
        this.x = innerWidth / 2;
        this.y = 115;
    }

    update = (c: CanvasRenderingContext2D) => {
        this.draw(c)
        this.y += this.speed

        if (this.y > 500 || this.y < 115)
            this.speed = -this.speed

        switch (true) {
            case this.y < 150 && this.image.src != "./gfx/enemys/ufo1/1.PNG":
                this.image.src = "./gfx/enemys/ufo1/1.PNG"
                break
            case this.y < 175 && this.image.src != "./gfx/enemys/ufo1/2.PNG":
                this.image.src = "./gfx/enemys/ufo1/2.PNG"
                break
            case this.y < 200 && this.image.src != "./gfx/enemys/ufo1/3.PNG":
                this.image.src = "./gfx/enemys/ufo1/3.PNG"
                break
            case this.y < 300 && this.image.src != "./gfx/enemys/ufo1/4.PNG":
                this.image.src = "./gfx/enemys/ufo1/4.PNG"
                break
            case this.image.src != "./gfx/enemys/ufo1/5.PNG":
                this.image.src = "./gfx/enemys/ufo1/5.PNG"
                break
        }

    }

}