class GameLevelList extends eui.Component {
    public static GAME_LIST: string = "gameList";

    public static HARD_LEVEL_1: number = 2000
    public static HARD_LEVEL_2: number = 500
    public static HARD_LEVEL_3: number = 300
    public static HARD_LEVEL_4: number = 1700
    public static HARD_LEVEL_5: number = 1600
    public static HARD_LEVEL_6: number = 1500
    public static HARD_LEVEL_7: number = 1400
    public static HARD_LEVEL_8: number = 300

    public constructor() {
        super()
        this.skinName = 'src/Scene/GameLevelList/GameLevelList.exml'
        this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this)
    }
    public createCompleteEvent(event: eui.UIEvent): void {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        this.touchEnabled = true
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseLevel, this)
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleBackBtnClick, this)
    }

    public backBtn: eui.Image
    public btn1: eui.Image
    public btn2: eui.Image
    public btn3: eui.Image
    public btn4: eui.Image
    public btn5: eui.Image
    public btn6: eui.Image
    public btn7: eui.Image
    public btn8: eui.Image

    public handleBackBtnClick() {
        let evt = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE)
        evt.obj = this
        evt.eventType = GameHomePanel.GAME_HOME
        SceneManager.getInstance().dispatchEvent(evt)
    }

    public chooseLevel(e: egret.TouchEvent) {
        if (e.target.source !== 'unlock_png') {
            return
        }
        switch (e.target.$name) {
            case 'btn1':
                GamePlaying.CURRENT_LEVEL = '1'
                GamePlaying.HARD_LEVEL = GameLevelList.HARD_LEVEL_1
                let evt = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE)
                evt.eventType = GamePlaying.GAME_PLAYING
                evt.obj = this
                SceneManager.getInstance().dispatchEvent(evt)
                break;

            case 'btn2':
                GamePlaying.CURRENT_LEVEL = '2'
                GamePlaying.HARD_LEVEL = GameLevelList.HARD_LEVEL_2
                let evt2 = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE)
                evt2.eventType = GamePlaying.GAME_PLAYING
                evt2.obj = this
                SceneManager.getInstance().dispatchEvent(evt2)
                break;

            case 'btn3':
                GamePlaying.CURRENT_LEVEL = '3'
                GamePlaying.HARD_LEVEL = GameLevelList.HARD_LEVEL_3
                let evt3 = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE)
                evt3.eventType = GamePlaying.GAME_PLAYING
                evt3.obj = this
                SceneManager.getInstance().dispatchEvent(evt3)
                break;

            default:
                break;
        }
    }

    public updateLevel(level) {
        let obj = 'btn' + level.data
        this[obj].source = 'unlock_png'
    }

    public start() {

    }

    public end() {

    }
}