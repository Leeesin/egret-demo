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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.speed = 10;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.draw, _this);
        var timer = new egret.Timer(40, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, _this.update, _this);
        timer.start();
        return _this;
    }
    Main.prototype.draw = function () {
        this.r = new Rect();
        this.addChild(this.r);
        var c = new Cicle();
        this.addChild(c);
        this.txt = new egret.TextField();
        this.txt.text = '';
        this.txt.x = 400;
        this.txt.y = 540;
        this.addChild(this.txt);
    };
    Main.prototype.update = function () {
        if (this.$children.length == 70) {
            return;
        }
        if (this.r.y == 400) {
            this.isCollide();
            this.r = new Rect();
            this.addChild(this.r);
        }
    };
    Main.prototype.isCollide = function () {
        var _this = this;
        var is = 0;
        var no = 0;
        this.$children.forEach(function (obj) {
            var x = obj.hitTestPoint(400, 520, true);
            if (x) {
                _this.txt.text = '你输了！！！！';
                debugger;
            }
        });
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map