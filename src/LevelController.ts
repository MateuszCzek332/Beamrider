import { Game } from "./app";
import { BossEnemy } from "./BossEnemy";
import { Enemy } from "./Enemy";
import { PlayerController } from "./PlayerController";
import { Ufo } from "./UfoEnemy";
import { BossShipEnemy } from "./BossShipEnemy";
import { Star } from "./Star";
import Helpers from "./Helpers";

export class LevelController {
    stars: Star[][] = [];
    sector: number = 1;
    points: number = 0;
    maxEnemysToKill: number = 4;
    currEnemysToKill: number = this.maxEnemysToKill;
    ufoEnemys: Ufo[] = [];
    start: any
    stop: any
    stopLv: any
    bossFight: boolean = false;
    boss: BossEnemy = null;
    bossBackup: BossShipEnemy[] = [];
    constructor(start: any, stop: any, stopLv: any, stars: Star[][]) {
        this.start = () => { start() }
        this.stop = () => { stop() }
        this.stopLv = () => { stopLv() }
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
                    this.bossBackup[i].update(c, player)
                else if (this.bossBackup[i].state == -1) {
                    this.bossBackup[i] = null;
                    this.bossFight = false
                    this.boss = null
                    player.die()
                    this.stop()
                    return
                }
                else {
                    this.bossBackup[i] = null
                    setTimeout(() => {
                        this.bossBackup[i] = new BossShipEnemy(this.stars)
                    }, 2000)
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

                switch (this.ufoEnemys[i].state) {
                    case 2:
                        this.ufoEnemys[i].updateBullets(c, player)
                        break
                    case 1:
                        this.ufoEnemys[i].update(c, player)
                        break
                    case 0:
                        player.bullet = null
                        this.currEnemysToKill--
                        this.points += 44
                        if (this.currEnemysToKill > 2)
                            this.ufoEnemys[i] = new Ufo(this.stars)
                        else {
                            this.ufoEnemys.splice(i, 1)
                            if (this.currEnemysToKill == 0)
                                this.startBossFight()
                            // this.stop()
                        }
                        break
                    case -2:
                        this.deleteEnemys()
                        player.die()
                        this.stopLv()
                        break

                }

            }

        }
    }

    startBossFight = () => {
        this.boss = new BossEnemy()
        for (let i = 0; i < 3; i++) {
            this.bossBackup[i] = new BossShipEnemy(this.stars)
        }
        this.bossFight = true;
    }

    startLv = () => {
        this.spawnEnemy()
    }

    nextLv = () => {
        this.sector++
        this.currEnemysToKill = this.maxEnemysToKill
    }

    deleteEnemys = () => {
        this.ufoEnemys = []
    }

    continuetLv = () => {
        console.log(this.currEnemysToKill)
        if (this.currEnemysToKill >= 3) {
            this.spawnEnemy()
        }
        else {
            for (let i = 1; i <= this.currEnemysToKill; i++) {
                this.ufoEnemys.push(new Ufo(this.stars))
            }
        }
    }


    spawnEnemy = () => {
        setTimeout(() => this.ufoEnemys.push(new Ufo(this.stars)), Helpers.getRandomInt(1, 500))
        setTimeout(() => this.ufoEnemys.push(new Ufo(this.stars)), Helpers.getRandomInt(300, 700))
        setTimeout(() => this.ufoEnemys.push(new Ufo(this.stars)), Helpers.getRandomInt(600, 1000))
    }
}