class MyMask extends eui.Component {
    public static result: string
    public constructor() {
        super()
        this.skinName = 'src/Components/MyMask/MyMask.exml'
        this.enabled = true
        this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this)
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleClick, this)
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.setTitle, this)
    }

    public listBtn: eui.Image
    public title: eui.Label
    public retryBtn: eui.Image
    public isAdded: boolean = false
    public setTitle() {
        if (!this.isAdded) {
            return
        }
        this.title.text = MyMask.result
    }

    public createCompleteEvent() {
        this.title.text = MyMask.result
        this.isAdded = true

    }
    public handleClick(e: egret.TouchEvent) {
        if (e.target.name === 'list') {
            this.back()
        }
        if (e.target.name === 'retry') {
            this.retry()
            let evt = new ChangeSceneEvent(ChangeSceneEvent.RESET)
            SceneManager.getInstance().dispatchEvent(evt)
        }

    }
    public back() {
        let evt = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE)
        evt.obj = this.parent
        evt.eventType = GameLevelList.GAME_LIST
        SceneManager.getInstance().dispatchEvent(evt)
        if (GamePlaying.currentScoreNumber === GamePlaying.totalScoreNumber) {
            let num: number = Number(GamePlaying.CURRENT_LEVEL) + 1
            this.unlock(num)
        }
    }


    public retry() {
        if (this.parent) {
            this.parent.removeChild(this)
            GamePlaying.currentScoreNumber = 0
        }
    }

    public unlock(arg) {
        let evt = new ChangeSceneEvent(ChangeSceneEvent.UN_LOCK)
        evt.data = arg
        SceneManager.getInstance().dispatchEvent(evt)
    }
}