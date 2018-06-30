
class Cicle extends egret.Sprite {
    public constructor() {
        super()
        this.graphics.beginFill(0xfffff2222)
        this.graphics.drawCircle(0, 0, 100)
        this.graphics.endFill()
        this.x = 400
        this.y = 400
    }
}