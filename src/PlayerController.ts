import { Game } from "./app";
import { Bullet } from "./Bullet";

export class PlayerController {
    canMove: boolean;
    changeColor: boolean = true;
    pos: number;
    image: HTMLImageElement;
    imageState: number = 1; // 1- yellow 2-purple
    x: number;
    y: number;
    xd: number;
    yd: number;
    width: number;
    height: number;
    vecX: number = 0;
    targetX: number;
    wd: number = innerWidth / 5;
    frame: number = 0;
    speed: number = 26;
    bullet: Bullet = null;
    ammo: number;
    hp: number
    constructor(y: number) {
        this.pos = 0
        this.ammo = 3;
        this.hp = 2;
        this.y = y + 50
        this.x = 100
        this.x = innerWidth / 2 + this.pos * this.wd;
        this.image = new Image;
        this.image.src = "./gfx/player/player1.PNG";
        this.image.onload = () => {
            this.xd = -this.image.width / 2
            this.yd = -this.image.height
            this.width = this.image.width;
            this.height = this.image.height;
        }

        document.addEventListener("keydown", (event) => {
            if (this.canMove) {
                if (event.isComposing || event.keyCode === 37) {
                    if (this.pos > -2) {
                        this.pos--
                        this.vecX = -this.speed
                    }
                }
                else if (event.isComposing || event.keyCode === 39) {
                    if (this.pos < 2) {
                        this.pos++
                        this.vecX = this.speed
                    }
                }
                else if (event.isComposing || event.keyCode === 32) {
                    if (this.vecX == 0) {
                        this.shoot(1)
                    }
                }
                else if (event.isComposing || event.keyCode === 38) {
                    if (this.vecX == 0)
                        this.shoot(2)
                }
            }
        });
    }

    draw = (c: CanvasRenderingContext2D) => {
        c.drawImage(this.image, this.x + this.xd, this.y + this.yd);
    }

    update = (c: CanvasRenderingContext2D) => {
        this.draw(c)
        if (this.changeColor) {
            this.frame++
            if (this.frame == 20) {
                this.changePlayerColor()
                this.frame = 0
            }
        }
        if (Game.state == 1) {
            this.x += this.vecX
            if (this.vecX < 0 && this.x <= innerWidth / 2 + this.pos * this.wd) {
                this.x = innerWidth / 2 + this.pos * this.wd
                this.vecX = 0
                this.canMove = true
            }
            else if (this.vecX > 0 && this.x >= innerWidth / 2 + this.pos * this.wd) {
                this.x = innerWidth / 2 + this.pos * this.wd
                this.vecX = 0
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
                this.bullet = new Bullet(this.pos, this.y + this.yd, 2)
                // this.ammo--
            }
            else if (type == 1) {
                this.bullet = new Bullet(this.pos, this.y + this.yd, 1)
            }
        }
    }

    start = () => {
        this.canMove = true
        this.changeColor = false
        this.image.src = "./gfx/player/player1.PNG"
        this.imageState = 1
    }

    block = () => {
        this.canMove = false;
    }

    reset = () => {
        this.canMove = false;
        this.changeColor = true;
        this.pos = 0;
        this.x = innerWidth / 2 + this.pos * this.wd
        this.image.src = "./gfx/player/player1.PNG"
        this.imageState = 1
    }

    die = () => {
        this.hp--
        this.image.src = "./gfx/player/deadPlayer.PNG"
        this.changeColor = false;
        this.canMove = false;
    }

    changePlayerColor = () => {
        if (this.imageState == 1) {
            this.image.src = "./gfx/player/player2.PNG";
            this.imageState = 2
        }
        else {
            this.image.src = "./gfx/player/player1.PNG"
            this.imageState = 1
        }
    }
}