import { Enemy } from "./Enemy";
import { Ufo } from "./UfoEnemy";

export class LevelController {
    sector: number = 1;
    points: number = 0;
    maxEnemysToKill: number = 15;
    currEnemysToKill: number = this.maxEnemysToKill;
    ufoEnemys: Ufo[] = [];
    constructor() {
        this.ufoEnemys.push(new Ufo())
    }

    draw = (c: CanvasRenderingContext2D) => {
        // this.enemy.draw(c)
        this.ufoEnemys.forEach((el) => {
            el.update(c)
        })

    }

    update = (c: CanvasRenderingContext2D) => {
        this.draw(c)
    }

}