class GameHomePanel extends eui.Component {
    public static GAME_HOME: string = "gameHome";

    public constructor() {
        super()
        this.skinName = 'src/Scene/GameHomePanel/GameHomePanel.exml'
        this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this)
    }
    public createCompleteEvent(event: eui.UIEvent): void {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        this.btnPlay.touchEnabled = true
        this.btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleBtnClick, this)
    }

    public btnPlay: eui.Button

    public handleBtnClick() {
        let changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE)
        changeEvent.obj = this
        changeEvent.eventType = GameLevelList.GAME_LIST
        SceneManager.getInstance().dispatchEvent(changeEvent)
    }

    public start() {

    }

    public end() {

    }

}