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
var GameLevelList = (function (_super) {
    __extends(GameLevelList, _super);
    function GameLevelList() {
        var _this = _super.call(this) || this;
        _this.skinName = 'src/Scene/GameLevelList/GameLevelList.exml';
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
        return _this;
    }
    GameLevelList.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseLevel, this);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleBackBtnClick, this);
    };
    GameLevelList.prototype.handleBackBtnClick = function () {
        var evt = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE);
        evt.obj = this;
        evt.eventType = GameHomePanel.GAME_HOME;
        SceneManager.getInstance().dispatchEvent(evt);
    };
    GameLevelList.prototype.chooseLevel = function (e) {
        if (e.target.source !== 'unlock_png') {
            return;
        }
        switch (e.target.$name) {
            case 'btn1':
                GamePlaying.CURRENT_LEVEL = '1';
                GamePlaying.HARD_LEVEL = GameLevelList.HARD_LEVEL_1;
                var evt = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE);
                evt.eventType = GamePlaying.GAME_PLAYING;
                evt.obj = this;
                SceneManager.getInstance().dispatchEvent(evt);
                break;
            case 'btn2':
                GamePlaying.CURRENT_LEVEL = '2';
                GamePlaying.HARD_LEVEL = GameLevelList.HARD_LEVEL_2;
                var evt2 = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE);
                evt2.eventType = GamePlaying.GAME_PLAYING;
                evt2.obj = this;
                SceneManager.getInstance().dispatchEvent(evt2);
                break;
            case 'btn3':
                GamePlaying.CURRENT_LEVEL = '3';
                GamePlaying.HARD_LEVEL = GameLevelList.HARD_LEVEL_3;
                var evt3 = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE);
                evt3.eventType = GamePlaying.GAME_PLAYING;
                evt3.obj = this;
                SceneManager.getInstance().dispatchEvent(evt3);
                break;
            default:
                break;
        }
    };
    GameLevelList.prototype.updateLevel = function (level) {
        var obj = 'btn' + level.data;
        this[obj].source = 'unlock_png';
    };
    GameLevelList.prototype.start = function () {
    };
    GameLevelList.prototype.end = function () {
    };
    GameLevelList.GAME_LIST = "gameList";
    GameLevelList.HARD_LEVEL_1 = 2000;
    GameLevelList.HARD_LEVEL_2 = 500;
    GameLevelList.HARD_LEVEL_3 = 300;
    GameLevelList.HARD_LEVEL_4 = 1700;
    GameLevelList.HARD_LEVEL_5 = 1600;
    GameLevelList.HARD_LEVEL_6 = 1500;
    GameLevelList.HARD_LEVEL_7 = 1400;
    GameLevelList.HARD_LEVEL_8 = 300;
    return GameLevelList;
}(eui.Component));
__reflect(GameLevelList.prototype, "GameLevelList");
