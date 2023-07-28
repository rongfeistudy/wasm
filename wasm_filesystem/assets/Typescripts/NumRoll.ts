import { _decorator, Component, Node, Label } from "cc";
import { toMillimeter } from "./utils";
const { ccclass, executeInEditMode, property } = _decorator;

interface RollingConfigI {
  endNum: number;
  duration: number;
  delay: number;
}
@ccclass("NumRoll")
export class NumRoll extends Component {
  endNum = 0;
  duration = 1.0;
  delay = 0.0;
  isRolling = false;
  startTime = 0;
  currentNumber = 0;
  label!: Label;
  isAdd = true;

  rolling(val: RollingConfigI) {
    const { endNum, duration, delay } = val;
    this.endNum = endNum;
    this.duration = duration;
    this.delay = delay ?? this.delay;
    this.isAdd = endNum > this.currentNumber;

    if (this.isRolling) {
      this.isRolling = false;
      this.unschedule(this.updateLabel);
    }
    if (this.delay > 0) {
      this.scheduleOnce(this.startRolling, this.delay);
    } else {
      this.startRolling();
    }
  }

  startRolling() {
    if (!this.isRolling) {
      this.isRolling = true;
      this.startTime = Date.now();
      this.updateLabel();
      this.schedule(this.updateLabel, 0.05);
    }
  }

  updateLabel() {
    const elapsedTime = (Date.now() - this.startTime) / 1000;
    if (elapsedTime >= this.duration) {
      // 结束滚动
      this.unschedule(this.updateLabel);
      this.currentNumber = Math.round(this.endNum);
      // 更新标签
      this.label && (this.label.string = toMillimeter(this.currentNumber));
      this.isRolling = false;
    } else {
      // 计算当前数字
      const progress = elapsedTime / this.duration;
      const deltaNumber = Math.round(
        progress * (this.endNum - this.currentNumber)
      );

      // 更新当前数字
      if (deltaNumber !== 0) {
        this.currentNumber = this.isAdd
          ? Math.min(this.currentNumber + deltaNumber, Math.round(this.endNum))
          : Math.max(this.currentNumber + deltaNumber, Math.round(this.endNum));
        // 更新标签
        this.label && (this.label.string = toMillimeter(this.currentNumber));
      }
    }
  }

  reset() {
    this.currentNumber = 0;
    this.label && (this.label.string = this.currentNumber.toString());
  }

  stopRoll() {
    this.unschedule(this.updateLabel);
    this.isRolling = false;
    this.currentNumber = this.endNum;
    this.label && (this.label.string = toMillimeter(this.currentNumber));
  }

  onDestroy() {
    this.unschedule(this.updateLabel);
  }
}
