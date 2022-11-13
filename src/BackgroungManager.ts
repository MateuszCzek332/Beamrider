import { Line } from "./Line";
import { Game } from './app'

export class BackgroundManager {
    state: number = 0;
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
    constructor(linesNumber: number, linesSpawnPoint: number, speed: number, framesDiff: number) {
        this.linesNumber = linesNumber;
        this.linesSpawnPoint = linesSpawnPoint;
        this.normalLinesSpeed = speed;
        this.framesDiff = framesDiff;
        this.speedLimit = (this.normalLinesSpeed - 1) * 6
        this.frame = 0
        console.log(this.speedLimit)
        this.init()

        document.addEventListener("keydown", (event) => {
            // console.log(event.keyCode)
            if (event.isComposing || event.keyCode === 83) {
                this.state = 1
                this.currentlinesSpeed = this.normalLinesSpeed
            }
            else if (event.isComposing || event.keyCode === 68) {
                this.state = 0
                console.log(this.frame)
                this.currentlinesSpeed = 1
            }
            else if (event.isComposing || event.keyCode === 65) {
                this.state = 2
                this.time = Date.now()
                this.currentlinesSpeed = 1
            }
            else if (event.isComposing || event.keyCode === 70) {
                this.state = 4
                this.linesSlow = 0.0001
                this.framesCounter = 2 * framesDiff - framesDiff
                this.linesSlow = (this.normalLinesSpeed - 1) / this.framesCounter
                console.log(this.frame, this.framesCounter)
                // this.time = Date.now()
                this.currentlinesSpeed = this.normalLinesSpeed
                // this.currentlinesSpeed = this.normalLinesSpeed
            }
        });
    }

    init = () => {
        this.createLines()
    }

    update = (c: CanvasRenderingContext2D) => {
        this.updateLines(c)
    }

    createLines = () => {
        this.botBounty = this.linesSpawnPoint * Math.pow(this.normalLinesSpeed, this.linesNumber * this.framesDiff)
        this.headerline = new Line(this.linesSpawnPoint, this.normalLinesSpeed, this.linesSpawnPoint, this.botBounty)
        for (let i = 0; i < this.linesNumber; i++) {
            this.lines.push(new Line(this.linesSpawnPoint * Math.pow(this.normalLinesSpeed, i * this.framesDiff), this.normalLinesSpeed, this.linesSpawnPoint, this.botBounty))
        }
    }

    updateLines = (c: CanvasRenderingContext2D) => {
        this.headerline.draw(c)
        if (this.state == 1)
            this.frame++
        for (let i = 0; i < this.lines.length; i++) {
            let l = this.lines[i]
            c.fillStyle = "rgb(56,104,144)";
            c.fillRect(l.x, l.y, l.width, l.height)
            l.y *= this.currentlinesSpeed
            switch (this.state) {
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

        switch (this.state) {
            case 2:
                this.currentlinesSpeed -= 0.0005
                if (this.currentlinesSpeed <= this.normalLinesSpeed - this.speedLimit) {
                    console.log('back')
                    console.log(Date.now() - this.time)
                    this.state = 3
                    this.currentlinesSpeed = 1 / this.currentlinesSpeed
                    // this.botBounty = this.linesSpawnPoint * Math.pow(this.normalLinesSpeed, this.linesNumber * this.framesDiff)
                }
                // this.botBounty = this.linesSpawnPoint * Math.pow(1 / this.currentlinesSpeed, this.linesNumber * this.framesDiff)
                break
            case 3:
                this.currentlinesSpeed -= 0.0005
                if (this.currentlinesSpeed <= this.normalLinesSpeed) {
                    console.log('normal')
                    console.log(Date.now() - this.time)
                    this.state = 1
                    this.currentlinesSpeed = this.normalLinesSpeed
                }
                break
            case 4:
                this.currentlinesSpeed -= this.linesSlow
                this.framesCounter--
                if (this.currentlinesSpeed <= 1) {
                    this.lines = []
                    this.createLines()
                    this.state = 0
                    this.currentlinesSpeed = 1
                    console.log(this.framesCounter)
                }
                break
        }
        if (this.frame == this.framesDiff)
            this.frame = 0

    }
}


