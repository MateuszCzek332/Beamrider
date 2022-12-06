import { Game } from "./app";
import { BossEnemy } from "./BossEnemy";
import { Enemy } from "./Enemy";
import { PlayerController } from "./PlayerController";
import { Ufo } from "./UfoEnemy";

export class LevelController {
    sector: number = 1;
    points: number = 0;
    maxEnemysToKill: number = 4;
    currEnemysToKill: number = this.maxEnemysToKill;
    ufoEnemys: Ufo[] = [];
    start: any
    stop: any
    bossFight: boolean = false;
    boss: BossEnemy = null;
    constructor(start: any, stop: any) {
        this.start = () => { start() }
        this.stop = () => { stop() }
    }

    draw = (c: CanvasRenderingContext2D, player: PlayerController) => {

    }

    update = (c: CanvasRenderingContext2D, player: PlayerController) => {
        this.draw(c, player)

        if (this.bossFight) {
            if (this.boss.state == 1)
                this.boss.update(c, player.bullet)
            else if (this.boss.state == 0) {
                this.bossFight = false
                this.boss = null
                this.stop()
            }

        }
        else {
            for (let i = 0; i < this.ufoEnemys.length; i++) {
                if (this.ufoEnemys[i].state == 1) {
                    this.ufoEnemys[i].update(c, player.bullet)

                }
                if (this.ufoEnemys[i].state == 0) {
                    player.bullet = null
                    this.currEnemysToKill--
                    this.points += 44
                    if (this.currEnemysToKill > 0)
                        this.ufoEnemys[i] = new Ufo()
                    else {
                        this.ufoEnemys.splice(i, 1)
                        this.startBossFight()
                        // this.stop()
                    }

                }
            }

        }
    }

    startBossFight = () => {
        this.boss = new BossEnemy()
        this.bossFight = true;
    }

    startLv = () => {
        this.spawnEnemy()
    }

    nextLv = () => {
        this.sector++
        this.currEnemysToKill = this.maxEnemysToKill
    }

    spawnEnemy = () => {
        this.ufoEnemys.push(new Ufo())
    }
}