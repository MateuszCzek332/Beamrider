import { Game } from "./app";
import { BossEnemy } from "./BossEnemy";
import { Enemy } from "./Enemy";
import { PlayerController } from "./PlayerController";
import { Ufo } from "./UfoEnemy";
import { BossShipEnemy } from "./BossShipEnemy";
import { Star } from "./Star";
import { Hp } from "./Hp";
import Helpers from "./Helpers";
import { Asteroid } from "./Asteroid";
import { Pac } from "./Pac";

export class LevelController {
    stars: Star[][] = [];
    sector: number = 1;
    points: number = 0;
    maxEnemysToKill: number = 15;
    currEnemysToKill: number = this.maxEnemysToKill;
    ufoEnemys: Ufo[] = [];
    start: any
    stop: any
    stopLv: any
    bossFight: boolean = false;
    boss: BossEnemy = null;
    bossBackup: BossShipEnemy[] = [];
    hpSpawnNr: number;
    hp: Hp = null;
    asteroids: Asteroid[] = []
    pac: Pac = null
    constructor(start: any, stop: any, stopLv: any, stars: Star[][]) {
        this.start = () => { start() }
        this.stop = () => { stop() }
        this.stopLv = () => { stopLv() }
        this.stars = stars;
        this.hpSpawnNr = Helpers.getRandomInt(5, 11)
    }

    draw = (c: CanvasRenderingContext2D, player: PlayerController) => {

    }

    update = (c: CanvasRenderingContext2D, player: PlayerController) => {
        this.draw(c, player)

        if (this.bossFight) { // walka z bossem
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
            else if (this.boss.state == -1) {
                this.points += player.hp * 150
                this.bossFight = false
                this.boss = null
                this.stop()
            }
        }
        else { // norlalny level

            if (this.pac != null)
                switch (this.pac.state) {
                    case 1:
                        this.pac.update(c, player)
                        break
                    case 0:
                        this.pac = null;
                        break
                    case 2:
                        this.pac = null
                        this.currEnemysToKill--
                        this.points += 44
                }


            if (this.hp != null)
                switch (this.hp.state) {
                    case 2:
                        player.addHP()
                        this.hp = null
                        break
                    case 1:
                        this.hp.update(c, player)
                        break
                    case 0:
                        this.hp = null
                        break
                    case -1:
                        this.deleteEnemys()
                        player.die()
                        this.stopLv()
                        break
                }

            for (let j = 0; j < this.asteroids.length; j++) {
                switch (this.asteroids[j].state) {
                    case 1:
                        this.asteroids[j].update(c, player)
                        break
                    case 0:
                        let i = Helpers.getRandomInt(1, 5)
                        let pos = this.stars[i][this.stars[i].length - 1]
                        this.asteroids[j] = new Asteroid(i - 3, pos.x, pos.y)
                        break
                    case -1:
                        this.deleteEnemys()
                        player.die()
                        this.stopLv()
                        break

                }
            }

            for (let i = 0; i < this.ufoEnemys.length; i++) {

                switch (this.ufoEnemys[i].state) {
                    case 3:
                        this.ufoEnemys[i].updateBullets(c, player)
                        if (this.ufoEnemys[i].bullet.length == 0) {
                            if (this.hpSpawnNr == this.currEnemysToKill)
                                this.spawnHP()

                            if (this.currEnemysToKill > 2)
                                this.ufoEnemys[i] = new Ufo(this.stars)
                            else {
                                this.ufoEnemys.splice(i, 1)
                                if (this.currEnemysToKill == 0) {
                                    this.deleteEnemys()
                                    this.startBossFight()
                                }
                                // this.stop()
                            }
                        }
                        break
                    case 2:
                        player.bullet = null
                        this.currEnemysToKill--
                        this.points += 44
                        this.ufoEnemys[i].state = 3
                        this.ufoEnemys[i].updateBullets(c, player)
                        break
                    case 1:
                        this.ufoEnemys[i].update(c, player)
                        break
                    case 0:
                        player.bullet = null
                        this.currEnemysToKill--
                        this.points += 44
                        if (this.hpSpawnNr == this.currEnemysToKill)
                            this.spawnHP()

                        if (this.currEnemysToKill > 2)
                            this.ufoEnemys[i] = new Ufo(this.stars)
                        else {
                            this.ufoEnemys.splice(i, 1)
                            if (this.currEnemysToKill == 0) {
                                this.deleteEnemys()
                                this.startBossFight()
                            }
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
        this.hp = null
        this.ufoEnemys = []
        this.asteroids = []
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
        this.spawnUfo()
        if (this.sector >= 2)
            this.spawnAsteroids()
        if (this.sector >= 3)
            this.spawnPac()
    }

    spawnUfo = () => {
        setTimeout(() => this.ufoEnemys.push(new Ufo(this.stars)), Helpers.getRandomInt(1, 500))
        setTimeout(() => this.ufoEnemys.push(new Ufo(this.stars)), Helpers.getRandomInt(300, 700))
        setTimeout(() => this.ufoEnemys.push(new Ufo(this.stars)), Helpers.getRandomInt(600, 1000))
    }

    spawnAsteroids = () => {
        for (let j = 0; j < Helpers.getRandomInt(2, 3); j++) {
            let i = Helpers.getRandomInt(1, 5)
            let pos = this.stars[i][this.stars[i].length - 1]
            this.asteroids.push(new Asteroid(i - 3, pos.x, pos.y))
            // console.log(pos.x, pos.y)
        }
    }

    spawnPac = () => {
        setTimeout(() => this.pac = new Pac(this.stars), Helpers.getRandomInt(3000, 10000))
    }

    spawnHP = () => {
        console.log('spawn Hp')
        let i = Helpers.getRandomInt(1, 5)
        let pos = this.stars[i][this.stars[i].length - 1]
        this.hp = new Hp(i - 3, pos.x, pos.y)
        // console.log(pos.x, pos.y)
    }
}