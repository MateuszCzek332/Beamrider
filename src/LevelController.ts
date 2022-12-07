import { Game } from "./app";
import { BossEnemy } from "./BossEnemy";
import { Enemy } from "./Enemy";
import { PlayerController } from "./PlayerController";
import { Ufo } from "./UfoEnemy";
import { BossShipEnemy } from "./BossShipEnemy";
import { Star } from "./Star";

export class LevelController {
    stars: Star[][] = [];
    sector: number = 1;
    points: number = 0;
    maxEnemysToKill: number = 4;
    currEnemysToKill: number = this.maxEnemysToKill;
    ufoEnemys: Ufo[] = [];
    start: any
    stop: any
    bossFight: boolean = false;
    boss: BossEnemy = null;
    bossBackup: BossShipEnemy[] = [];
    constructor(start: any, stop: any, stars: Star[][]) {
        this.start = () => { start() }
        this.stop = () => { stop() }
        this.stars = stars;
    }

    draw = (c: CanvasRenderingContext2D, player: PlayerController) => {

    }

    update = (c: CanvasRenderingContext2D, player: PlayerController) => {
        this.draw(c, player)

        if (this.bossFight) {

            for (let i = 0; i < this.bossBackup.length; i++) {
                if (this.bossBackup[i] == null)
                    continue;

                if (this.bossBackup[i].state == 1)
                    this.bossBackup[i].update(c, player.bullet)
                else {
                    this.bossBackup[i] = null
                    setTimeout(() => {
                        this.bossBackup[i] = new BossShipEnemy(this.stars)
                    }, 3000)
                }
            }

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
        for (let i = 0; i < 3; i++) {
            this.bossBackup[i] = new BossShipEnemy(this.stars)
        }
        console.log(this.bossBackup)
        console.log(this.stars)
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