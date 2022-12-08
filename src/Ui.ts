export class Ui {
    w: number
    h: number
    c: CanvasRenderingContext2D;
    constructor() {
        this.w = innerWidth
        this.h = innerHeight
    }

    update = (c: CanvasRenderingContext2D, ammo: number, hp: number, enemyToKill: number, sector: number, points: number, gameOver: boolean) => {
        this.c = c;
        this.drawAmmo(ammo)
        this.drawHp(hp)
        this.drawEnemysToKill(enemyToKill)
        this.drawPoinst(points)
        this.drawLv(sector)
        if (gameOver)
            this.drawGameOver()
    }

    drawGameOver = () => {
        this.c.font = "70px Arial";
        this.c.fillStyle = "red";
        this.c.fillText('GAME OVER', innerWidth / 2 - 215, innerHeight / 2 - 50)
    }

    drawEnemysToKill = (enemys: number) => {
        this.c.font = "30px Arial";
        this.c.fillStyle = "rgb(80,124,56)";
        this.c.fillText(enemys.toString(), 10, 40)
    }

    drawPoinst = (points: number) => {
        this.c.font = "30px Arial";
        this.c.fillStyle = "rgb(204,160,92)";

        this.c.fillText(points.toString(), innerWidth / 2, 40)
    }

    drawLv = (sector: number) => {
        this.c.font = "30px Arial";
        this.c.fillStyle = "rgb(204,160,92)";
        this.c.fillText('SECTOR 0' + sector.toString(), innerWidth / 2 - 80, 70)
    }

    drawAmmo = (ammo: number) => {
        this.c.fillStyle = "purple";
        let x = this.w - 70
        for (let i = 0; i < ammo; i++, x += 70)
            this.c.fillRect(x - i * 150, 30, 35, 35)

    }

    drawHp = (hp: number) => {
        let image = new Image;
        image.src = "./gfx/hp/1.PNG";
        let x = 100
        for (let i = 0; i < hp; i++, x += 65)
            this.c.drawImage(image, x, this.h - 50);

    }
}