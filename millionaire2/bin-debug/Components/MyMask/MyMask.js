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
var MyMask = (function (_super) {
    __extends(MyMask, _super);
    function MyMask() {
        var _this = _super.call(this) || this;
        _this.isAdded = false;
        _this.skinName = 'src/Components/MyMask/MyMask.exml';
        _this.enabled = true;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.handleClick, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.setTitle, _this);
        return _this;
    }
    MyMask.prototype.setTitle = function () {
        if (!this.isAdded) {
            return;
        }
        this.title.text = MyMask.result;
    };
    MyMask.prototype.createCompleteEvent = function () {
        this.title.text = MyMask.result;
        this.isAdded = true;
    };
    MyMask.prototype.handleClick = function (e) {
        if (e.target.name === 'list') {
            this.back();
        }
        if (e.target.name === 'retry') {
            this.retry();
            var evt = new ChangeSceneEvent(ChangeSceneEvent.RESET);
            SceneManager.getInstance().dispatchEvent(evt);
        }
    };
    MyMask.prototype.back = function () {
        var evt = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE);
        evt.obj = this.parent;
        evt.eventType = GameLevelList.GAME_LIST;
        SceneManager.getInstance().dispatchEvent(evt);
        if (GamePlaying.currentScoreNumber === GamePlaying.totalScoreNumber) {
            var num = Number(GamePlaying.CURRENT_LEVEL) + 1;
            this.unlock(num);
        }
    };
    MyMask.prototype.retry = function () {
        if (this.parent) {
            this.parent.removeChild(this);
            GamePlaying.currentScoreNumber = 0;
        }
    };
    MyMask.prototype.unlock = function (arg) {
        var evt = new ChangeSceneEvent(ChangeSceneEvent.UN_LOCK);
        evt.data = arg;
        SceneManager.getInstance().dispatchEvent(evt);
    };
    return MyMask;
}(eui.Component));
__reflect(MyMask.prototype, "MyMask");
