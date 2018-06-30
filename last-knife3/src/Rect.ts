
class Rect extends egret.Sprite {
    public constructor() {
        super()
        this.graphics.beginFill(0xfffff2222)
        this.graphics.drawRect(0, 0, 10, 150)
        this.graphics.endFill()
        this.x = 400
        this.y = 800
        this.touchEnabled = true
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => { this.isClick = true }, this)
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.selfMove, this)
    }
    private speedY: number = 40
    private angle: number = 10
    public isClick: boolean = false
    public isCollide: boolean = false
    selfMove() {
        var timer: egret.Timer = new egret.Timer(40, 0)
        timer.addEventListener(egret.TimerEvent.TIMER, () => {
            if (this.isClick) {
                this.y -= this.speedY
            }
            if (this.y == 400) {
                this.isCollide = true
                this.speedY = 0
                this.anchorOffsetY = this.width * -10
                this.rotation += 10
                
            }
        }, this)
        timer.start()
    }

}