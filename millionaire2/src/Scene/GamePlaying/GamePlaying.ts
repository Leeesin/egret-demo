class GamePlaying extends eui.Component {
    public static GAME_PLAYING: string = "gamePlaying";

    public static CURRENT_LEVEL: string = '1'
    public static HARD_LEVEL: number
    public handSpeed: number = 150
    public moneySpeed: number = 3000

    public currentLevel: eui.Label
    public cut: eui.Image
    public tween_cut: egret.Tween
    public hand: eui.Image

    public static currentScoreNumber: number = 0
    public static totalScoreNumber: number = 2000

    public currentScore: eui.Label
    public isStop: boolean = false

    public totalScore: eui.Label
    public timer: egret.Timer
    public mask0: eui.Rect
    public maskPanel: eui.Component

    public moneyX: number = 315
    public moneyY: number = 396

    public constructor() {
        super()
        this.skinName = 'src/Scene/GamePlaying/GamePlaying.exml'

        this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this)
    }

    public createCompleteEvent() {

        this.timer = new egret.Timer(2000, 0)
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
        this.timer.start();
    }

    public start() {
        GamePlaying.currentScoreNumber = 0
        GamePlaying.totalScoreNumber = Number(GamePlaying.CURRENT_LEVEL) * 2000
        this.currentScore.text = String(GamePlaying.currentScoreNumber)
        this.totalScore.text = String(GamePlaying.totalScoreNumber)

        this.isStop = false
        this.timer.start()
        this.touchEnabled = true
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.grabMoney, this)

        this.currentLevel.text = GamePlaying.CURRENT_LEVEL

        this.tween_cut = egret.Tween.get(this.cut, { loop: true })
        this.tween_cut.to({ y: 380 }, GamePlaying.HARD_LEVEL).wait(200).to({ y: 100 }, GamePlaying.HARD_LEVEL)
    }

    public end() {
        this.removeChild(this.maskPanel)

    }

    public grabMoney(e: egret.TouchEvent) {
        if (!this.isStop) {
            let x1 = e.stageX
            let y1 = e.stageY
            let hand = egret.Tween.get(this.hand)
            hand.to({ x: x1, y: y1 }, this.handSpeed).call(() => {
                if (this.isFail()) {
                    this.whenFail()
                } else {
                    this.isGetMoney(y1)
                    let hand = egret.Tween.get(this.hand)
                    hand.to({ x: 312, y: 265 }, this.handSpeed).call(() => {
                        this.hand.source = 'hand_1_png'
                    })
                }
            })
        }
    }

    isFail() {
        if (this.cut.y < this.hand.y + 60 && this.cut.y > this.hand.y - 60) {
            return true
        }
        return false
    }

    isGetMoney(posY: number) {
        this.$children.forEach((item, index) => {
            if (item.name === 'cut') {
                if (item.y <= posY + 70 && item.y > posY - 70) {
                    this.hand.source = 'img_1113_png'
                    this.whenFail()
                }
            }

            else if (item.name === 'money') {
                if (item.y <= posY + 100 && item.y > posY - 100) {
                    this.removeChild(item)
                    GamePlaying.currentScoreNumber += 1000
                    //抓到钱变成拳头
                    this.hand.source = 'hand_2_png'
                    this.putMoney()

                    this.currentScore.text = String(GamePlaying.currentScoreNumber)
                    if (GamePlaying.currentScoreNumber === GamePlaying.totalScoreNumber) {
                        MyMask.result = '恭喜过关！'
                        this.showPanel()
                    }
                }
            }
        })
    }

    public update() {
        let money = new Money()
        money.addEventListener(egret.TouchEvent.TOUCH_TAP, this.grabMoney, this)
        this.addChild(money)
    }

    showPanel() {
        var stage: egret.Stage = egret.lifecycle.stage;
        var color: number = 0x000000;
        // this.mask0 = new eui.Rect(489, 606, color);
        // this.mask0.x = 0;
        // this.mask0.alpha = 0.7
        // this.addChild(this.mask0);

        this.maskPanel = new MyMask()
        this.maskPanel.x = -60
        this.addChild(this.maskPanel)
        this.stopGame()
    }

    putMoney() {
        this.moneyY -= 4
        this.moneyX += 4
        let m = new eui.Image()
        m.source = 'img_money2_png'
        m.name = 'putM'
        this.addChild(m)
        m.x = this.moneyX
        m.y = this.moneyY
    }

    stopGame() {
        this.timer.stop()
        this.isStop = true
        this.tween_cut.pause()
    }

    whenFail() {
        this.hand.source = 'img_1113_png'
        this.cutHandMove()
        this.stopGame()
        MyMask.result = '失敗'
        setTimeout(() => {
            this.showPanel()
        }, 1000)
    }

    bloodMove() {
        let ran = Math.random() * 40
        let m = new eui.Image()
        m.source = 'img_blood_png'
        m.x = this.hand.x - this.hand.width + ran
        m.y = this.hand.y - this.hand.height / 2 + 2 * ran
        this.addChild(m)
        let blood = egret.Tween.get(m)
        blood.to({ x: 0, y: 500 }, 500).call(() => {
            this.removeChild(m)
        })
    }

    cutHandMove() {
        this.hand.x = this.stage.width

        this.hand.anchorOffsetX = this.hand.width
        this.hand.anchorOffsetY = this.hand.height / 2

        let o = egret.Tween.get(this.hand, { loop: true })

        o.to({ rotation: 30 }, 1000).to({ rotation: -30 }, 1000)

        var timer = new egret.Timer(50, 0)
        timer.addEventListener(egret.TimerEvent.TIMER, (() => {
            this.bloodMove()
        }), this);
        timer.start();
    }

    initHand() {
        this.removeChild(this.hand)
        this.hand = new eui.Image()
        this.hand.x = this.stage.width - 200
        this.hand.y = this.stage.height / 2
        this.hand.source = 'hand_1_png'
        this.addChild(this.hand)
        this.isStop = false
        this.tween_cut = egret.Tween.get(this.cut, { loop: true })
        this.tween_cut.to({ y: 380 }, GamePlaying.HARD_LEVEL).wait(100).to({ y: 100 }, GamePlaying.HARD_LEVEL)

        this.timer = new egret.Timer(2000, 0)
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
        this.timer.start();


    }
    // 重玩
    reset() {
        this.initHand()
        this.currentScore.text ='0'

    }

}