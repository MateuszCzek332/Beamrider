import { PlayerController } from "./PlayerController";
import { BackgroundManager } from "./BackgroungManager"

export class Game {
    //data
    c: CanvasRenderingContext2D
    static canvas: HTMLCanvasElement;
    static state: number = 0;
    //controllers
    bgManager: BackgroundManager;
    playerController: PlayerController;
    //liczenie klatek
    fps: number = 0;
    fpsEl: HTMLParagraphElement;
    constructor() {
        Game.canvas = document.querySelector('canvas')
        Game.canvas.width = window.innerWidth
        Game.canvas.height = window.innerHeight - 4
        this.c = Game.canvas.getContext('2d')
        this.playerController = new PlayerController(630)
        this.bgManager = new BackgroundManager(6, 115, 1.01, 27, this.playerController.start)

        this.createFPS()
        this.animate()

        document.addEventListener("keydown", (e) => { this.onKeyDown(e) });
    }

    animate = () => {
        requestAnimationFrame(this.animate)
        this.c.clearRect(0, 0, innerWidth, innerHeight)
        this.fps++
        this.bgManager.update(this.c)
        this.playerController.update(this.c)
    }

    onKeyDown = (event: KeyboardEvent) => {
        //Background 
        if (event.isComposing || event.keyCode === 83) {
            Game.state = 1
            this.bgManager.unpause()
            this.playerController.start()
        }
        else if (event.isComposing || event.keyCode === 68) {
            Game.state = 0
            this.bgManager.pause()
        }
        else if (event.isComposing || event.keyCode === 65) {
            Game.state = 2
            this.bgManager.start()
        }
        else if (event.isComposing || event.keyCode === 70) {
            Game.state = 4
            this.bgManager.stop()
        }

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
