import { Bullet } from "./Bullet";
import { Enemy } from "./Enemy";
import Helpers from "./Helpers";
import { PlayerController } from "./PlayerController";
import { Star } from "./Star";
const attack = [
    { comand: 'move' },
    { comand: 'die' },
]
export class Pac extends Enemy { //state 1-alive 0-dead -1-die from hiting player
    constructor(public stars: Star[][]) {
        super("./gfx/enemys/pac/1.PNG")
        this.attack = [...attack]
        this.state = 1;
        this.speed = 10;
        this.readComand()
    }

    update = (c: CanvasRenderingContext2D, player: PlayerController) => {
        this.draw(c)

        this.x += this.vecX
        this.y += this.vecY

        if (Helpers.checkCollision(this, player.bullet)) {
            this.getBullet(player.bullet)
        }

        if (this.reachtarget()) {
            this.nextMove()
        }

    }

    getBullet = (bullet: Bullet) => {
        this.die()
        bullet.stop()
        this.state = 2;
    }

    nextMove = () => {
        this.attack.shift()
        this.readComand()
    }

    die = () => {
        this.state = this.vecX = this.vecY = 0;
    };

    readComand = () => {
        let pos;
        let vecX;
        let vecY;
        let d;
        switch (this.attack[0].comand) {
            case 'move':
                let posX
                if (Math.random() > 0.5)
                    posX = 5
                else
                    posX = 1

                let posY = Helpers.getRandomInt(5, 7)

                pos = this.stars[posX][posY]
                let targetPos = this.stars[6 - posX][posY - 1]
                this.y = this.targetY
                vecX = targetPos.x - pos.x
                vecY = targetPos.y - pos.y
                d = Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2)) / this.speed
                this.vecX = vecX / d
                this.vecY = vecY / d
                this.x = pos.x - vecX
                this.y = pos.y - vecY
                this.targetX = targetPos.x + vecX
                this.targetY = targetPos.y + vecY
                break;
            case 'die':
                this.die()
                break;
        }
    }

}