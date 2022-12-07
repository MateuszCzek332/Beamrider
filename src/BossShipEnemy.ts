import { Bullet } from "./Bullet";
import { Enemy } from "./Enemy";
import { Star } from "./Star";
// const attack = [
//     { comand: 'goToRandom' },
//     { comand: 'goStraight' },
//     { comand: 'die' },
// ]
export class BossShipEnemy extends Enemy {
    vecX: number;
    vecY: number;
    targetX: number;
    targetY: number;
    posX: number;
    posY: number;
    speed: number = 2;
    attack: any;
    constructor(public stars: Star[][]) {
        super("./gfx/enemys/boss/1.PNG")
        this.attack = [
            { comand: 'goToRandom' },
            { comand: 'goStraight' },
            { comand: 'die' },
        ]
        this.state = 1
        this.readComand()
    }

    update = (c: CanvasRenderingContext2D, playerBullet: Bullet) => {
        this.draw(c)

        this.x += this.vecX
        this.y += this.vecY

        if (this.checkColision(playerBullet)) {
            this.getBullet(playerBullet)
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

    nextMove = () => {
        this.attack.shift()
        this.readComand()
    }

    reachtarget = () => {
        if (this.vecY < 0 && this.y < this.targetY) {
            return true;
        }
        else if (this.vecY > 0 && this.y > this.targetY) {
            return true;
        }
        else if (this.vecX < 0 && this.x < this.targetX) {
            return true;
        }
        else if (this.vecX > 0 && this.x > this.targetX) {
            return true;
        }
        return false;
    }

    getRandomPosition = () => {
        this.posX = this.getRandomInt(1, 5)
        this.posY = this.getRandomInt(5, 7)
        let pos = this.stars[this.posX][this.posY]
        this.targetX = pos.x
        this.y = this.targetY = pos.y
    }

    die = () => {
        console.log('*')
        this.state = this.vecX = this.vecY = 0;
    };

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
                vecX = this.targetX - this.x
                vecY = this.targetY - this.y
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