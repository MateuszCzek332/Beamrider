import { Bullet } from "./Bullet";
import { Enemy } from "./Enemy";
import Helpers from "./Helpers";

export class BossEnemy extends Enemy {
    constructor() {
        super("./gfx/enemys/boss/ufo.PNG")
        this.x = 0;
        this.y = 115;
        this.speed = 4;
        this.state = 1
    }

    update = (c: CanvasRenderingContext2D, playerBullet: Bullet) => {
        this.draw(c)
        this.x += this.speed

        if (Helpers.checkCollision(this, playerBullet)) {
            playerBullet.stop()
            this.die()
        }

        if (this.x > innerWidth) {
            this.die()
        }

    }

}