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
var GameHomePanel = (function (_super) {
    __extends(GameHomePanel, _super);
    function GameHomePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = 'src/Scene/GameHomePanel/GameHomePanel.exml';
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
        return _this;
    }
    GameHomePanel.prototype.createCompleteEvent = function (event) {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        this.btnPlay.touchEnabled = true;
        this.btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleBtnClick, this);
    };
    GameHomePanel.prototype.handleBtnClick = function () {
        var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE);
        changeEvent.obj = this;
        changeEvent.eventType = GameLevelList.GAME_LIST;
        SceneManager.getInstance().dispatchEvent(changeEvent);
    };
    GameHomePanel.prototype.start = function () {
    };
    GameHomePanel.prototype.end = function () {
    };
    GameHomePanel.GAME_HOME = "gameHome";
    return GameHomePanel;
}(eui.Component));
__reflect(GameHomePanel.prototype, "GameHomePanel");
