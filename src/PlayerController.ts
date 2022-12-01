import { Game } from "./app";
import { Bullet } from "./Bullet";

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
    speed: number = 26;
    xwidth: number = 0;
    bullet: Bullet = null;
    ammo: number;
    hp: number
    constructor(h: number) {
        this.height = h - 20
        this.wd = innerWidth / 5
        this.pos = 0
        this.ammo = 3;
        this.hp = 2;
        this.image = new Image;
        this.image.src = "./gfx/player/player1.PNG";
        this.image.onload = () => {
            this.width = innerWidth / 2 + this.pos * this.wd - this.image.width / 2
        }
        document.addEventListener("keydown", (event) => {
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
                        this.shoot(1)
                }
                else if (event.isComposing || event.keyCode === 38) {
                    if (this.xwidth == 0)
                        this.shoot(2)
                }
                // else if (event.isComposing || event.keyCode === 86) {
                //     this.hp--
                // }
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
                this.changePlayerColor()
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

        this.drawBullet(c)

    }

    drawBullet = (c: CanvasRenderingContext2D) => {
        if (this.bullet == null)
            return;

        this.bullet.update(c)
        if (this.bullet.state == 0)
            this.bullet = null;
    }

    shoot = (type: number) => {
        if (this.bullet == null) {
            if (type == 2 && this.ammo > 0) {
                console.log(this.ammo)
                this.bullet = new Bullet(this.pos, this.height, 2)
                this.ammo--
            }
            else if (type == 1)
                this.bullet = new Bullet(this.pos, this.height, 1)

        }
    }

    start = () => {
        this.canMove = true
        this.image.src = "./gfx/player/player1.PNG"
        this.color = 1
    }

    changePlayerColor = () => {
        if (this.color == 1) {
            this.image.src = "./gfx/player/player2.PNG";
            this.color = 2
        }
        else {
            this.image.src = "./gfx/player/player1.PNG"
            this.color = 1
        }
    }
}