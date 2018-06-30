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
var Cicle = (function (_super) {
    __extends(Cicle, _super);
    function Cicle() {
        var _this = _super.call(this) || this;
        _this.graphics.beginFill(0xfffff2222);
        _this.graphics.drawCircle(0, 0, 100);
        _this.graphics.endFill();
        _this.x = 400;
        _this.y = 400;
        return _this;
    }
    return Cicle;
}(egret.Sprite));
__reflect(Cicle.prototype, "Cicle");
//# sourceMappingURL=Cicle.js.map