import { Vec3, _decorator, tween, Sprite, Animation } from "cc";
import { Fade } from "./Fade";
import { CountDown } from "./CountDown";
import { TurntableBg } from "./TurntableBg";
import { AudioEnum } from "./Enums";
import { sendDingTalkApi, AudioManager } from "./utils";

const { ccclass, property } = _decorator;

@ccclass("Turntable")
export class Turntable extends Fade {
  @property(TurntableBg)
  TurntableBgNode: TurntableBg = null!;

  @property(CountDown)
  countDownNode: CountDown = null!;

  @property(Sprite)
  turnTableResultTip: Sprite = null!;

  _initEular = new Vec3(0, 0, 0);

  _perRad = 45;
  _maxSpeed = -500;
  _t = 1;
  _minSpeed = 0;
  _a = this._maxSpeed / this._t;
  _s = (1 / 2) * this._a * Math.pow(this._t, 2);

  _step1Eular = new Vec3(0, 0, this._s);

  _t1 = 2;
  _step2Num = this._s + this._maxSpeed * this._t1;

  _step2Eular = new Vec3(0, 0, this._step2Num);

  reset(): void {
    this.TurntableBgNode.node.setRotationFromEuler(this._initEular);
  }
  // 转盘旋转
  rollUp(extraGameResult: number): Promise<void> {
    return new Promise((resolve) => {
      if (extraGameResult === undefined || extraGameResult === -1)
        return sendDingTalkApi({
          users: ["zhangjunjie4480"],
          err: `转盘转动结果异常extraGameResult is:${String(extraGameResult)}`,
        });
      // 1s 加速
      // 2s 匀速
      // 1s 减速且回弹
      const _targetEular = -extraGameResult * this._perRad; // -45
      const _curEular = this._step2Num % 360; // -20
      // 2圈后停下
      const circle = 2;

      const _durationEular =
        _targetEular < _curEular
          ? -circle * 360 + _targetEular - _curEular
          : -(circle + 1) * 360 - _curEular + _targetEular;
      const _s = _durationEular + this._step2Num;

      AudioManager.instance.playShot(AudioEnum.TurnTableRoll);

      const tweenA = tween(this.TurntableBgNode.node)
        .to(1, { eulerAngles: this._step1Eular }, { easing: "quadIn" })
        .to(2, { eulerAngles: this._step2Eular }, { easing: "linear" })
        .to(
          _s / this._maxSpeed,
          { eulerAngles: new Vec3(0, 0, _s - 20) },
          { easing: "quadOut" }
        )
        .to(0.2, { eulerAngles: new Vec3(0, 0, _s) }, { easing: "quadOut" })
        .call(() => {
          tweenA.stop();
          resolve();
        })
        .start();
    });
  }

  showCountDown() {
    return new Promise((resolve) => {
      this.countDownNode.fade();
      this.countDownNode.startCountDown(resolve);
    });
  }

  hideCountDown() {
    this.countDownNode.hide();
    this.countDownNode.stopCountDown();
  }

  setResultTipVisible(isVisible: boolean) {
    this.turnTableResultTip.node.active = isVisible;
    this.turnTableResultTip.getComponent(Animation)?.play("breathingEffect");
  }
}
