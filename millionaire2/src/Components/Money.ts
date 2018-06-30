class Money extends eui.Image {
    public constructor() {
        super()
        this.source = 'img_money_png'
        this.name = 'money'
        var timer = new egret.Timer(70, 0)
        timer.addEventListener(egret.TimerEvent.TIMER, this.move, this);
        timer.start();
    }
    public speedY: number = 30

    move() {
        this.y += this.speedY
        if (this.parent) {
            if (this.y > 500) {
                this.parent.removeChild(this)
            }
        }

    }


}