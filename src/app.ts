import { PlayerController } from "./PlayerController";
import { BackgroundManager } from "./BackgroungManager"
import { Ui } from "./Ui";
import { LevelController } from "./LevelController";

export class Game {
    //data
    c: CanvasRenderingContext2D
    static canvas: HTMLCanvasElement;
    static state: number = 0;
    gameOver: boolean = false;
    nextLv: boolean = true;
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
        this.lvlController = new LevelController(this.start, this.stop, this.stopLv, this.bgManager.starsTab)
        this.ui = new Ui()
        this.createFPS()
        this.animate()
        this.loadFont()
        document.addEventListener("keydown", (e) => { this.onKeyDown(e) });
    }

    loadFont = async () => {
        let font = new FontFace("Atari", "url(./AtariClassic.ttf)");
        const f = await font.load();
        (document.fonts as any).add(f);
        console.log("font loaded");
    };

    animate = () => {
        requestAnimationFrame(this.animate)
        this.c.clearRect(0, 0, innerWidth, innerHeight)
        this.fps++
        this.bgManager.update(this.c)
        this.playerController.update(this.c)
        this.lvlController.update(this.c, this.playerController)
        this.ui.update(this.c, this.playerController.ammo, this.playerController.hp, this.lvlController.currEnemysToKill, this.lvlController.sector, this.lvlController.points, this.gameOver)
    }

    onKeyDown = (event: KeyboardEvent) => {

        if (event.isComposing || event.keyCode === 83) {
            if (!this.gameOver) {
                Game.state = 1
                this.bgManager.unpause()
                this.playerController.start()
                if (this.nextLv)
                    this.lvlController.startLv()
                else
                    this.lvlController.continuetLv()
            }
        }
        else if (event.isComposing || event.keyCode === 68) {
            Game.state = 0
            this.bgManager.pause()
        }
        else if (event.isComposing || event.keyCode === 65) {
            if (!this.gameOver)
                this.start()
        }
        else if (event.isComposing || event.keyCode === 70) {
            if (!this.gameOver)
                this.stop()
        }

    }

    start = async () => {
        await this.loadFont()
        Game.state = 2
        this.bgManager.start()
        console.log(this.nextLv)
        setTimeout(() => {
            if (this.nextLv)
                this.lvlController.startLv()
            else
                this.lvlController.continuetLv()
            // this.playerController.start()
        }, 3500)
    }

    stop = () => {
        Game.state = 4
        this.bgManager.stop()
        this.playerController.block()
        if (this.playerController.hp > 0)
            setTimeout(() => { this.reset() }, 2000)
        else
            this.gameOver = true
    }

    stopLv = () => {
        Game.state = 4
        this.bgManager.stop()
        this.playerController.block()
        if (this.playerController.hp > 0)
            setTimeout(() => { this.continueLv() }, 2000)
        else
            this.gameOver = true
    }

    continueLv = () => {
        Game.state = 0
        this.playerController.reset()
        this.bgManager.reset()
        this.nextLv = false
    }

    reset = () => {
        this.nextLv = true;
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