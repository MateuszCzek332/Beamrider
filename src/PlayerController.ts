import { Game } from "./app";

export class PlayerController {
    canMove: boolean;
    color: number = 1;
    pos: number;
    x: number;
    y: number;
    width: number;
    wd: number;
    height: number;
    image: HTMLImageElement;
    frame: number = 0;
    speed: number = 30;
    xwidth: number = 0;
    constructor(h: number) {
        this.height = h
        this.wd = innerWidth / 5
        this.pos = 0
        this.image = new Image;
        this.image.src = "./gfx/player1.PNG";
        // console.log(this.image.width)
        this.width = innerWidth / 2 + this.pos * this.wd - 151 / 2 + this.pos * 10
        document.addEventListener("keydown", (event) => {
            // console.log(event.keyCode)
            if (this.canMove) {
                if (event.isComposing || event.keyCode === 37) {
                    if (this.pos > -2) {
                        this.pos--
                        this.xwidth = -this.speed
                    }
                }
                else if (event.isComposing || event.keyCode === 39) {
                    if (this.pos < 2) {
                        this.pos++
                        this.xwidth = this.speed
                    }
                }
                else if (event.isComposing || event.keyCode === 32) {
                    if (this.xwidth == 0)
                        this.shoot()
                }
                // this.width = innerWidth / 2 + this.pos * this.wd - this.image.width / 2 + this.pos * 12
            }
        });
    }

    draw = (c: CanvasRenderingContext2D) => {
        c.drawImage(this.image, this.width, this.height);
    }

    update = (c: CanvasRenderingContext2D) => {
        this.draw(c)
        if (Game.state != 1) {
            this.frame++
            if (this.frame == 20) {
                this.changeColor()
                this.frame = 0
            }
        }
        else if (Game.state == 1) {
            this.width += this.xwidth
            if (this.xwidth < 0 && this.width <= innerWidth / 2 + this.pos * this.wd - this.image.width / 2 + this.pos * 12) {
                this.width = innerWidth / 2 + this.pos * this.wd - this.image.width / 2 + this.pos * 12
                this.xwidth = 0
                this.canMove = true
            }
            else if (this.xwidth > 0 && this.width >= innerWidth / 2 + this.pos * this.wd - this.image.width / 2 + this.pos * 12) {
                this.width = innerWidth / 2 + this.pos * this.wd - this.image.width / 2 + this.pos * 12
                this.xwidth = 0
                this.canMove = true
            }
        }

    }

    shoot = () => {
        console.log('shoot')
    }

    start = () => {
        this.canMove = true
        this.image.src = "./gfx/player1.PNG"
        this.color = 1
    }

    changeColor = () => {
        if (this.color == 1) {
            this.image.src = "./gfx/player2.PNG";
            this.color = 2
        }
        else {
            this.image.src = "./gfx/player1.PNG"
            this.color = 1
        }
    }
}