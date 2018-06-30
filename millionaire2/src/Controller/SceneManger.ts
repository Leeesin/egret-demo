class SceneManager extends egret.Sprite {
    public constructor() {
        super()
        this.init()
    }

    private static instance: SceneManager
    private gameHomePanel: GameHomePanel
    private gameLevelList: GameLevelList
    private gamePlaying: GamePlaying

    public init() {
        this.gameHomePanel = new GameHomePanel()
        this.gameLevelList = new GameLevelList()
        this.gamePlaying = new GamePlaying()

        this.addChild(this.gameHomePanel)
        this.gameHomePanel.start()

        this.addEventListener(ChangeSceneEvent.CHANGE_SCENE, this.onChangeScene, this)
        this.addEventListener(ChangeSceneEvent.UN_LOCK, this.unlockLevel, this)
        this.addEventListener(ChangeSceneEvent.RESET, this.reset, this)

    }

    public static getInstance(): SceneManager {
        if (SceneManager.instance == null) {
            SceneManager.instance = new SceneManager();
        }
        return SceneManager.instance;
    }

    public onChangeScene(e: ChangeSceneEvent) {
        e.obj.end();
        this.removeChildren();

        switch (e.eventType) {
            case GameHomePanel.GAME_HOME:
                this.gameHomePanel.start();
                this.addChild(this.gameHomePanel);
                break;
            case GameLevelList.GAME_LIST:
                this.gameLevelList.start();
                this.addChild(this.gameLevelList);
                break;

            case GamePlaying.GAME_PLAYING:
                this.gamePlaying.start();
                this.addChild(this.gamePlaying);
                break;

            default:
                break;
        }
    }

    public unlockLevel(level) {
        this.gameLevelList.updateLevel(level)
    }

    public reset(level) {
        this.gamePlaying.reset()
    }


}