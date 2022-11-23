export class Ui {
    w: number
    h: number
    c: CanvasRenderingContext2D;
    constructor() {
        this.w = innerWidth
        this.h = innerHeight
    }
    update = (c: CanvasRenderingContext2D, ammo: number, hp: number) => {
        this.c = c;
        this.drawAmmo(ammo)
        this.drawHp(hp)
    }

    drawAmmo = (ammo: number) => {
        this.c.fillStyle = "purple";
        let x = this.w - 70
        for (let i = 0; i < ammo; i++, x += 70)
            this.c.fillRect(x - i * 150, 50, 35, 35)

    }

    drawHp = (hp: number) => {
        let image = new Image;
        image.src = "./gfx/hp/1.PNG";
        let x = 100
        for (let i = 0; i < hp; i++, x += 65)
            this.c.drawImage(image, x, this.h - 50);

    }


}


