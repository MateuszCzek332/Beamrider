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

}