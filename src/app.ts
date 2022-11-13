import { BackgroundManager } from "./BackgroungManager"

export class Game {
    c: CanvasRenderingContext2D
    static canvas: HTMLCanvasElement;
    bgManager: BackgroundManager;
    fps: number = 0;
    fpsEl: HTMLParagraphElement;
    constructor() {
        Game.canvas = document.querySelector('canvas')
        Game.canvas.width = window.innerWidth
        Game.canvas.height = window.innerHeight - 4
        this.c = Game.canvas.getContext('2d')
        this.bgManager = new BackgroundManager(6, 120, 1.01, 30)
        this.createFPS()
        this.animate()

    }

    animate = () => {
        requestAnimationFrame(this.animate)
        this.c.clearRect(0, 0, innerWidth, innerHeight)
        this.fps++
        this.bgManager.update(this.c)
    }

    createFPS = () => {
        this.fpsEl = document.querySelector('p');
        setInterval(() => {
            this.fpsEl.innerText = this.fps.toString()
            this.fps = 0
        }, 1000)
    }
}

new Game()
