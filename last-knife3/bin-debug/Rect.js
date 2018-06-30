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
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        var _this = _super.call(this) || this;
        _this.speedY = 40;
        _this.angle = 10;
        _this.isClick = false;
        _this.isCollide = false;
        _this.graphics.beginFill(0xfffff2222);
        _this.graphics.drawRect(0, 0, 10, 150);
        _this.graphics.endFill();
        _this.x = 400;
        _this.y = 800;
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () { _this.isClick = true; }, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.selfMove, _this);
        return _this;
    }
    Rect.prototype.selfMove = function () {
        var _this = this;
        var timer = new egret.Timer(40, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, function () {
            if (_this.isClick) {
                _this.y -= _this.speedY;
            }
            if (_this.y == 400) {
                _this.isCollide = true;
                _this.speedY = 0;
                _this.anchorOffsetY = _this.width * -10;
                _this.rotation += 10;
            }
        }, this);
        timer.start();
    };
    return Rect;
}(egret.Sprite));
__reflect(Rect.prototype, "Rect");
//# sourceMappingURL=Rect.js.map