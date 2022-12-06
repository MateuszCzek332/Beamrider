import { Bullet } from "./Bullet";
import { Enemy } from "./Enemy";

export class BossEnemy extends Enemy {
    constructor() {
        super("./gfx/enemys/boss/ufo.PNG")
        this.x = 0;
        this.y = 115;
        this.state = 1
    }

    update = (c: CanvasRenderingContext2D, playerBullet: Bullet) => {
        this.draw(c)
        this.x += this.speed

        if (this.checkColision(playerBullet)) {
            playerBullet.stop()
            this.die()
        }

        if (this.x > innerWidth) {
            this.die()
        }

    }

    die = () => {
        this.speed = 0
        this.state = 0;
    }

    checkColision = (bullet: Bullet) => {
        return bullet != null && bullet.y < this.y && bullet.x < this.x + this.xd + this.width && bullet.x + this.width > this.x + this.xd
    }

}