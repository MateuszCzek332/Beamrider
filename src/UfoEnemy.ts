import { Bullet } from "./Bullet";
import { EnemyBullet } from "./EnemyBullet";
import { Enemy } from "./Enemy";
import Helpers from "./Helpers";
import { PlayerController } from "./PlayerController";
import { Star } from "./Star";

const attacks = [
    [
        // { comand: 'goRandomX' },
        // { comand: 'goRandomX' },
        { comand: 'goRandomX' },
        { comand: 'goToRandom' },
        // { comand: 'goToRandom' },
        { comand: 'shoot' },
        { comand: 'goToRandom' },
        { comand: 'shoot' },
        { comand: 'goBack' },

    ],
    // [
    //     { comand: 'goRandomX' },
    //     { comand: 'goToRandom' },
    //     { comand: 'goToRandom' },
    // ],
]

export class Ufo extends Enemy {
    maxAttack: number
    bullet: EnemyBullet[] = [];
    constructor(public stars: Star[][]) {
        super("./gfx/enemys/ufo1/1.PNG")
        this.x = innerWidth / 2;
        this.y = 115;
        this.state = 1
        this.maxAttack = 0;
        this.attack = [...attacks[Helpers.getRandomInt(0, this.maxAttack)]]
        this.speed = 4;
        this.readComand()
    }

    update = (c: CanvasRenderingContext2D, player: PlayerController) => {
        this.draw(c)

        this.x += this.vecX
        this.y += this.vecY

        if (Helpers.checkCollision(this, player.bullet)) {
            if (this.bullet.length == 0) {
                this.die()
                player.bullet.stop()
            }
            else {
                this.speed = 0;
                this.state = 2
            }
        }

        if (this.reachtarget()) {
            this.nextMove()
        }
        this.updateBullets(c, player)

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

    updateBullets = (c: CanvasRenderingContext2D, player: PlayerController) => {
        for (let i = 0; i < this.bullet.length; i++) {
            if (this.bullet[i].state == 1) {
                this.bullet[i].update(c)
                if (Helpers.checkCollision(this.bullet[i], player))
                    this.shootPlayer()
            }
            else {
                this.bullet.splice(i, 1)
                i--
            }
        }

        if (this.state == 2 && this.bullet == null)
            this.die()
    }

    hitPlayer = () => {
        this.state = -1
        this.vecX = this.vecY = 0;
    }

    shootPlayer = () => {
        this.state = -2
        this.vecX = this.vecY = 0;
    }

    nextMove = () => {
        if (this.attack.length > 1) {
            this.attack.shift()
            this.readComand()
        }
        else {
            this.attack = [...attacks[Helpers.getRandomInt(0, this.maxAttack)]]
            this.readComand()
        }
    }

    getRandomPosition = () => {
        this.posX = Helpers.getRandomInt(1, 5)
        this.posY = Helpers.getRandomInt(2, 8)
        let pos = this.stars[this.posX][this.posY]
        this.targetX = pos.x
        this.targetY = pos.y
    }

    shoot = () => {
        this.bullet.push(new EnemyBullet(this.posX - 3, this.x, this.y))
    }

    readComand = () => {
        let vecX;
        let vecY;
        let d;
        let pos;
        switch (this.attack[0].comand) {
            case 'goRandomX':
                this.speed = 3
                this.targetY = this.y
                this.targetX = Helpers.getRandomInt(200, innerWidth - 200)
                vecX = this.targetX - this.x
                vecY = 0
                d = Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2)) / this.speed
                this.vecX = vecX / d
                this.vecY = vecY / d
                break;
            case 'goToRandom':
                this.getRandomPosition()
                vecX = this.targetX - this.x
                vecY = this.targetY - this.y
                d = Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2)) / this.speed
                this.vecX = vecX / d
                this.vecY = vecY / d
                break;
            case 'goBack':
                this.speed = 5
                pos = this.stars[this.posX][this.stars[this.posX].length - 1]
                vecX = pos.x - this.x
                vecY = pos.y - this.y
                d = Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2)) / this.speed
                this.vecX = vecX / d
                this.vecY = vecY / d
                this.targetX = pos.x + 2 * vecX;
                this.targetY = 115;
                break;
            case 'shoot':
                this.shoot()
                this.nextMove()
                break;
            case 'die':
                this.die()
                break;
        }
    }


}