import { _decorator, Component, Node, Label, Sprite } from "cc";
import { Jackpot } from "./Jackpot";
import { dataManager } from "./DataManager";
import { getBetConfig } from "./serve";
import type { betConfigT } from "./serve";
import { GameStep } from "./Enums";
const { ccclass, property } = _decorator;

@ccclass("StepController")
export class StepController extends Component {
  @property(Label)
  CurStepNum!: Label;

  @property(Jackpot)
  JackpotNode!: Jackpot;

  _index = 0;
  _defaultStepArr: number[] = [5, 10, 50, 100];

  _isFadeIn = false;

  init(betConfig: betConfigT[]) {
    this._defaultStepArr = betConfig.map((config) => config.betNum);
    this.updateNum();
  }

  async changeBetConfig() {
    if(this._defaultStepArr[0] !== 1) return
    const res = await getBetConfig();
    const { betConfig } = res.data;
    this._defaultStepArr = betConfig.map((config) => config.betNum);
    if (dataManager.getCurStepNum() !== 1) {
      this.sub();
    } else {
      this._index = 0;
      this.updateNum();
    }
  }

  updateNum() {
    const betNum = this._defaultStepArr[this._index];
    const firstDrawTipNode = dataManager.getFirstDrawTipNode();
    // 1 写死到代码中啦，因为只有新手模式
    if (dataManager.getNewBeeDrawState() === 1 && betNum === 1) {
      // 新手并且档位是1显示
      this._isFadeIn = true;
      firstDrawTipNode?.fadeIn();
    } else if(dataManager.getNewBeeDrawState() === 1 && this._isFadeIn){
      // 新手指导存在则隐藏
        firstDrawTipNode?.fadeOut();
        this._isFadeIn = false;
    }
    this.CurStepNum.string = String(betNum);
    dataManager.setCurStepNum(betNum);
    this.JackpotNode.reset();
  }

  add() {
    if (dataManager.getGameStep() !== GameStep.GameStart) return;
    this._index++;
    if (this._index > this._defaultStepArr.length - 1) {
      this._index = 0;
    }
    this.updateNum();
  }
  sub() {
    if (dataManager.getGameStep() !== GameStep.GameStart) return;
    this._index--;
    if (this._index < 0) {
      this._index = this._defaultStepArr.length - 1;
    }
    this.updateNum();
  }
}
