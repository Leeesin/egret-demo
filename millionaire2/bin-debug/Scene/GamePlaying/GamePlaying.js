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
var GamePlaying = (function (_super) {
    __extends(GamePlaying, _super);
    function GamePlaying() {
        var _this = _super.call(this) || this;
        _this.handSpeed = 150;
        _this.moneySpeed = 3000;
        _this.isStop = false;
        _this.moneyX = 315;
        _this.moneyY = 396;
        _this.skinName = 'src/Scene/GamePlaying/GamePlaying.exml';
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
        return _this;
    }
    GamePlaying.prototype.createCompleteEvent = function () {
        this.timer = new egret.Timer(2000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
        this.timer.start();
    };
    GamePlaying.prototype.start = function () {
        GamePlaying.currentScoreNumber = 0;
        GamePlaying.totalScoreNumber = Number(GamePlaying.CURRENT_LEVEL) * 2000;
        this.currentScore.text = String(GamePlaying.currentScoreNumber);
        this.totalScore.text = String(GamePlaying.totalScoreNumber);
        this.isStop = false;
        this.timer.start();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.grabMoney, this);
        this.currentLevel.text = GamePlaying.CURRENT_LEVEL;
        this.tween_cut = egret.Tween.get(this.cut, { loop: true });
        this.tween_cut.to({ y: 380 }, GamePlaying.HARD_LEVEL).wait(200).to({ y: 100 }, GamePlaying.HARD_LEVEL);
    };
    GamePlaying.prototype.end = function () {
        this.removeChild(this.maskPanel);
    };
    GamePlaying.prototype.grabMoney = function (e) {
        var _this = this;
        if (!this.isStop) {
            var x1 = e.stageX;
            var y1_1 = e.stageY;
            var hand = egret.Tween.get(this.hand);
            hand.to({ x: x1, y: y1_1 }, this.handSpeed).call(function () {
                if (_this.isFail()) {
                    _this.whenFail();
                }
                else {
                    _this.isGetMoney(y1_1);
                    var hand_1 = egret.Tween.get(_this.hand);
                    hand_1.to({ x: 312, y: 265 }, _this.handSpeed).call(function () {
                        _this.hand.source = 'hand_1_png';
                    });
                }
            });
        }
    };
    GamePlaying.prototype.isFail = function () {
        if (this.cut.y < this.hand.y + 60 && this.cut.y > this.hand.y - 60) {
            return true;
        }
        return false;
    };
    GamePlaying.prototype.isGetMoney = function (posY) {
        var _this = this;
        this.$children.forEach(function (item, index) {
            if (item.name === 'cut') {
                if (item.y <= posY + 70 && item.y > posY - 70) {
                    _this.hand.source = 'img_1113_png';
                    _this.whenFail();
                }
            }
            else if (item.name === 'money') {
                if (item.y <= posY + 100 && item.y > posY - 100) {
                    _this.removeChild(item);
                    GamePlaying.currentScoreNumber += 1000;
                    //抓到钱变成拳头
                    _this.hand.source = 'hand_2_png';
                    _this.putMoney();
                    _this.currentScore.text = String(GamePlaying.currentScoreNumber);
                    if (GamePlaying.currentScoreNumber === GamePlaying.totalScoreNumber) {
                        MyMask.result = '恭喜过关！';
                        _this.showPanel();
                    }
                }
            }
        });
    };
    GamePlaying.prototype.update = function () {
        var money = new Money();
        money.addEventListener(egret.TouchEvent.TOUCH_TAP, this.grabMoney, this);
        this.addChild(money);
    };
    GamePlaying.prototype.showPanel = function () {
        var stage = egret.lifecycle.stage;
        var color = 0x000000;
        // this.mask0 = new eui.Rect(489, 606, color);
        // this.mask0.x = 0;
        // this.mask0.alpha = 0.7
        // this.addChild(this.mask0);
        this.maskPanel = new MyMask();
        this.maskPanel.x = -60;
        this.addChild(this.maskPanel);
        this.stopGame();
    };
    GamePlaying.prototype.putMoney = function () {
        this.moneyY -= 4;
        this.moneyX += 4;
        var m = new eui.Image();
        m.source = 'img_money2_png';
        m.name = 'putM';
        this.addChild(m);
        m.x = this.moneyX;
        m.y = this.moneyY;
    };
    GamePlaying.prototype.stopGame = function () {
        this.timer.stop();
        this.isStop = true;
        this.tween_cut.pause();
    };
    GamePlaying.prototype.whenFail = function () {
        var _this = this;
        this.hand.source = 'img_1113_png';
        this.cutHandMove();
        this.stopGame();
        MyMask.result = '失敗';
        setTimeout(function () {
            _this.showPanel();
        }, 1000);
    };
    GamePlaying.prototype.bloodMove = function () {
        var _this = this;
        var ran = Math.random() * 40;
        var m = new eui.Image();
        m.source = 'img_blood_png';
        m.x = this.hand.x - this.hand.width + ran;
        m.y = this.hand.y - this.hand.height / 2 + 2 * ran;
        this.addChild(m);
        var blood = egret.Tween.get(m);
        blood.to({ x: 0, y: 500 }, 500).call(function () {
            _this.removeChild(m);
        });
    };
    GamePlaying.prototype.cutHandMove = function () {
        var _this = this;
        this.hand.x = this.stage.width;
        this.hand.anchorOffsetX = this.hand.width;
        this.hand.anchorOffsetY = this.hand.height / 2;
        var o = egret.Tween.get(this.hand, { loop: true });
        o.to({ rotation: 30 }, 1000).to({ rotation: -30 }, 1000);
        var timer = new egret.Timer(50, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, (function () {
            _this.bloodMove();
        }), this);
        timer.start();
    };
    GamePlaying.prototype.initHand = function () {
        this.removeChild(this.hand);
        this.hand = new eui.Image();
        this.hand.x = this.stage.width - 200;
        this.hand.y = this.stage.height / 2;
        this.hand.source = 'hand_1_png';
        this.addChild(this.hand);
        this.isStop = false;
        this.tween_cut = egret.Tween.get(this.cut, { loop: true });
        this.tween_cut.to({ y: 380 }, GamePlaying.HARD_LEVEL).wait(100).to({ y: 100 }, GamePlaying.HARD_LEVEL);
        this.timer = new egret.Timer(2000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
        this.timer.start();
    };
    // 重玩
    GamePlaying.prototype.reset = function () {
        this.initHand();
        this.currentScore.text = '0';
    };
    GamePlaying.GAME_PLAYING = "gamePlaying";
    GamePlaying.CURRENT_LEVEL = '1';
    GamePlaying.currentScoreNumber = 0;
    GamePlaying.totalScoreNumber = 2000;
    return GamePlaying;
}(eui.Component));
__reflect(GamePlaying.prototype, "GamePlaying");
