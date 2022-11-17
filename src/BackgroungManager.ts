import { Game } from "./app";
import { Line } from "./Line";
// import { Game } from './app'
import { Star } from "./Star";

export class BackgroundManager {
    linesSpawnPoint: number;
    headerline: Line;
    lines: Line[] = []
    currentlinesSpeed: number = 1;
    normalLinesSpeed: number;
    speedLimit: number;
    linesNumber: number;
    framesDiff: number;
    botBounty: number;
    frame: number;
    framesCounter: number;
    linesSlow: number
    time: any;
    starsTab: Star[][] = [];
    startPlayer: any;
    constructor(linesNumber: number, linesSpawnPoint: number, speed: number, framesDiff: number, startPlayer: any) {
        this.linesNumber = linesNumber;
        this.linesSpawnPoint = linesSpawnPoint;
        this.normalLinesSpeed = speed;
        this.framesDiff = framesDiff;
        this.speedLimit = (this.normalLinesSpeed - 1) * 6
        this.frame = 0
        this.startPlayer = () => { startPlayer() }
        console.log(this.speedLimit)
        this.init()

    }

    pause = () => {
        this.currentlinesSpeed = 1
    }


    unpause = () => {
        this.currentlinesSpeed = this.normalLinesSpeed
    }


    start = () => {
        this.frame = 0;
        this.currentlinesSpeed = 1 / this.normalLinesSpeed
    }

    stop = () => {
        this.linesSlow = 0.0001
        this.framesCounter = 2 * this.framesDiff - this.frame
        this.linesSlow = (this.normalLinesSpeed - 1) / this.framesCounter
        console.log(this.frame, this.framesCounter)
        // this.time = Date.now()
        this.currentlinesSpeed = this.normalLinesSpeed
        // this.currentlinesSpeed = this.normalLinesSpeed
    }

    init = () => {
        this.createLines()
        this.createStars()
    }

    update = (c: CanvasRenderingContext2D) => {
        this.updateLines(c)
        this.drawStars(c)
    }

    createLines = () => {
        this.botBounty = this.linesSpawnPoint * Math.pow(this.normalLinesSpeed, this.linesNumber * this.framesDiff)
        this.headerline = new Line(this.linesSpawnPoint, this.normalLinesSpeed, this.linesSpawnPoint, this.botBounty)
        for (let i = 0; i < this.linesNumber; i++) {
            this.lines.push(new Line(this.linesSpawnPoint * Math.pow(this.normalLinesSpeed, i * this.framesDiff), this.normalLinesSpeed, this.linesSpawnPoint, this.botBounty))
        }
    }

    createStars = () => {

        let wd = innerWidth / 2.5
        let w = -innerWidth / 2.5
        let gx = 1
        for (let i = 0, r = 54, g = -3; i < 7; i++, r -= 18) {
            this.starsTab[i] = []
            let h = this.botBounty
            let j = 0
            while (h + g * j > this.linesSpawnPoint) {
                let s = new Star(w / 2 - 7 + j * r, h + g * j)
                this.starsTab[i].push(s)
                h -= 52
                j++
            }
            if (i == 0 || i == 5)
                w += 1.5 * wd
            else
                w += wd
            g += gx
            if (g == 0)
                gx = -1
        }
    }

    drawStars = (c: CanvasRenderingContext2D) => {
        this.starsTab.forEach(el => {
            el.forEach(elm => {
                elm.draw(c)
            })
        });
    }

    updateLines = (c: CanvasRenderingContext2D) => {

        this.headerline.draw(c)
        this.frame++
        for (let i = 0; i < this.lines.length; i++) {
            let l = this.lines[i]
            c.fillStyle = "rgb(56,104,144)";
            c.fillRect(l.x, l.y, l.width, l.height)
            l.y *= this.currentlinesSpeed
            switch (Game.state) {
                case 1:
                    if (l.y >= this.botBounty) {
                        l.y = this.linesSpawnPoint
                    }
                    break;
                case 2:
                    if (l.y <= this.linesSpawnPoint)
                        l.y = this.botBounty
                    break
                case 3:
                    if (l.y >= this.botBounty) {
                        l.y = this.linesSpawnPoint
                    }
                    break
                case 4:
                    if (l.y >= this.botBounty) {
                        l.y = this.linesSpawnPoint
                    }
                    break
            }

        }

        switch (Game.state) {
            case 2:
                this.currentlinesSpeed *= 0.9995
                console.log(this.frame)
                if (this.frame == 3 * this.framesDiff) {
                    this.frame = 0
                    // console.log('back')
                    // console.log(Date.now() - this.time)
                    Game.state = 3
                    this.currentlinesSpeed = 1 / this.currentlinesSpeed
                }
                break
            case 3:
                this.currentlinesSpeed *= 0.9995
                if (this.frame == 3 * this.framesDiff) {
                    // console.log('normal')
                    // console.log(Date.now() - this.time)
                    Game.state = 1
                    this.startPlayer()
                    this.currentlinesSpeed = this.normalLinesSpeed
                }
                break
            case 4:
                this.currentlinesSpeed -= this.linesSlow
                this.framesCounter--
                if (this.currentlinesSpeed <= 1) {
                    this.lines = []
                    this.createLines()
                    Game.state = 0
                    this.currentlinesSpeed = 1
                    console.log(this.framesCounter)
                }
                break
        }
        if (Game.state == 1 && this.frame == this.framesDiff)
            this.frame = 0

    }
}


