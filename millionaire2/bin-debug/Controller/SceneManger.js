var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneManager = (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    SceneManager.prototype.init = function () {
        this.gameHomePanel = new GameHomePanel();
        this.gameLevelList = new GameLevelList();
        this.gamePlaying = new GamePlaying();
        this.addChild(this.gameHomePanel);
        this.gameHomePanel.start();
        this.addEventListener(ChangeSceneEvent.CHANGE_SCENE, this.onChangeScene, this);
        this.addEventListener(ChangeSceneEvent.UN_LOCK, this.unlockLevel, this);
        this.addEventListener(ChangeSceneEvent.RESET, this.reset, this);
    };
    SceneManager.getInstance = function () {
        if (SceneManager.instance == null) {
            SceneManager.instance = new SceneManager();
        }
        return SceneManager.instance;
    };
    SceneManager.prototype.onChangeScene = function (e) {
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
    };
    SceneManager.prototype.unlockLevel = function (level) {
        this.gameLevelList.updateLevel(level);
    };
    SceneManager.prototype.reset = function (level) {
        this.gamePlaying.reset();
    };
    return SceneManager;
}(egret.Sprite));
__reflect(SceneManager.prototype, "SceneManager");
