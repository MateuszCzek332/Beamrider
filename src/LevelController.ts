import { Enemy } from "./Enemy";
import { PlayerController } from "./PlayerController";
import { Ufo } from "./UfoEnemy";

export class LevelController {
    sector: number = 1;
    points: number = 0;
    maxEnemysToKill: number = 15;
    currEnemysToKill: number = this.maxEnemysToKill;
    ufoEnemys: Ufo[] = [];
    constructor() {
        this.ufoEnemys.push(new Ufo())
        // setTimeout(() => { this.ufoEnemys.push(new Ufo()) }, 2000)
    }

    draw = (c: CanvasRenderingContext2D, player: PlayerController) => {
        // this.enemy.draw(c)
        // this.ufoEnemys.forEach((el) => {
        //     if (el.state == 1) {
        //         el.update(c, player.bullet)
        //     }
        //     else {
        //         el = new Ufo()
        //         console.log(el)
        //     }
        // })


    }

    update = (c: CanvasRenderingContext2D, player: PlayerController) => {
        this.draw(c, player)

        for (let i = 0; i < this.ufoEnemys.length; i++) {
            if (this.ufoEnemys[i].state == 1) {
                this.ufoEnemys[i].update(c, player.bullet)

            }
            if (this.ufoEnemys[i].state == 0) {
                this.ufoEnemys[i] = new Ufo()
                player.bullet = null
                // console.log()
            }
        }
    }

}