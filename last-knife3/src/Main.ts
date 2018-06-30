class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.draw, this)
        var timer: egret.Timer = new egret.Timer(40, 0)
        timer.addEventListener(egret.TimerEvent.TIMER, this.update, this)
        timer.start()
    }
    private speed = 10
    private txt
    public r: Rect
    public draw() {
        this.r = new Rect()
        this.addChild(this.r)
        let c = new Cicle()
        this.addChild(c)

        this.txt = new egret.TextField()
        this.txt.text = ''
        this.txt.x = 400
        this.txt.y = 540
        this.addChild(this.txt)
    }

    public update() {
        if (this.$children.length == 70) {
            return
        }
        if (this.r.y == 400) {
            this.isCollide()
            this.r = new Rect()
            this.addChild(this.r)
        }
    }

    isCollide() {
        let is = 0
        let no = 0
        this.$children.forEach((obj) => {
            let x = obj.hitTestPoint(400, 520, true)
            if (x) {
                this.txt.text = '你输了！！！！'
                debugger
            }
        })
    }
}















