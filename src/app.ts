import { PlayerController } from "./PlayerController";
import { BackgroundManager } from "./BackgroungManager"
import { Ui } from "./Ui";
import { LevelController } from "./LevelController";

export class Game {
    //data
    c: CanvasRenderingContext2D
    static canvas: HTMLCanvasElement;
    static state: number = 0;
    //controllers
    bgManager: BackgroundManager;
    playerController: PlayerController;
    lvlController: LevelController;
    ui: Ui;
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
        this.lvlController = new LevelController(this.start, this.stop)
        this.ui = new Ui()
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
        this.lvlController.update(this.c, this.playerController)
        this.ui.update(this.c, this.playerController.ammo, this.playerController.hp, this.lvlController.currEnemysToKill, this.lvlController.sector, this.lvlController.points)
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
            this.start()
        }
        else if (event.isComposing || event.keyCode === 70) {
            this.stop()
        }

    }

    start = () => {
        Game.state = 2
        this.bgManager.start()
        setTimeout(() => {
            this.lvlController.startLv()
            // this.playerController.start()
        }, 3500)
    }

    stop = () => {
        Game.state = 4
        this.bgManager.stop()
        this.playerController.block()
        setTimeout(() => { this.reset() }, 2000)
    }

    reset = () => {
        Game.state = 0
        this.playerController.reset()
        this.bgManager.reset()
        this.lvlController.nextLv()
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