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
var Money = (function (_super) {
    __extends(Money, _super);
    function Money() {
        var _this = _super.call(this) || this;
        _this.speedY = 30;
        _this.source = 'img_money_png';
        _this.name = 'money';
        var timer = new egret.Timer(70, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, _this.move, _this);
        timer.start();
        return _this;
    }
    Money.prototype.move = function () {
        this.y += this.speedY;
        if (this.parent) {
            if (this.y > 500) {
                this.parent.removeChild(this);
            }
        }
    };
    return Money;
}(eui.Image));
__reflect(Money.prototype, "Money");
