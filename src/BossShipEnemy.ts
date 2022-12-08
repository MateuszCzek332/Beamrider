import { Bullet } from "./Bullet";
import { Enemy } from "./Enemy";
import Helpers from "./Helpers";
import { PlayerController } from "./PlayerController";
import { Star } from "./Star";
const attack = [
    { comand: 'goToRandom' },
    { comand: 'goStraight' },
    { comand: 'die' },
]
export class BossShipEnemy extends Enemy { //state 1-alive 0-dead -1-die from hiting player
    constructor(public stars: Star[][]) {
        super("./gfx/enemys/boss/1.PNG")
        this.attack = [...attack]
        this.state = 1;
        this.speed = 5;
        this.readComand()
    }

    update = (c: CanvasRenderingContext2D, player: PlayerController) => {
        this.draw(c)

        this.x += this.vecX
        this.y += this.vecY

        if (Helpers.checkCollision(this, player)) {
            this.hitPlayer()
        }

        if (Helpers.checkCollision(this, player.bullet)) {
            this.getBullet(player.bullet)
        }

        if (this.reachtarget()) {
            this.nextMove()
        }

    }

    getBullet = (bullet: Bullet) => {
        if (bullet.type == 2)
            this.die()
        bullet.stop()
    }

    hitPlayer = () => {
        this.state = -1
        this.vecX = this.vecY = 0;
    }

    nextMove = () => {
        this.attack.shift()
        this.readComand()
    }

    die = () => {
        this.state = this.vecX = this.vecY = 0;
    };

    getRandomPosition = () => {
        this.posX = Helpers.getRandomInt(1, 5)
        this.posY = Helpers.getRandomInt(5, 7)
        let pos = this.stars[this.posX][this.posY]
        this.targetX = pos.x
        this.targetY = pos.y
    }

    readComand = () => {
        let pos;
        let vecX;
        let vecY;
        let d;
        switch (this.attack[0].comand) {
            case 'goToRandom':
                this.getRandomPosition()
                if (Math.random() > 0.5)
                    this.x = 100
                else
                    this.x = innerWidth - 100
                this.y = this.targetY
                vecX = this.targetX - this.x
                vecY = 0
                d = Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2)) / this.speed
                this.vecX = vecX / d
                this.vecY = vecY / d
                break;
            case 'goStraight':
                pos = this.stars[this.posX][0]
                vecX = pos.x - this.x
                vecY = pos.y - this.y
                d = Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2)) / this.speed
                this.vecX = vecX / d
                this.vecY = vecY / d
                this.targetX = pos.x + 2 * vecX;
                this.targetY = pos.y + 2 * vecY;
                break;
            case 'die':
                this.die()
                break;
        }
    }

}