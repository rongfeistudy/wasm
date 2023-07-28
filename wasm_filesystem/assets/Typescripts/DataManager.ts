import { FirstDrawTip } from "./FirstDrawTip";
import { ModeType, GameStep } from "./Enums";
import type { BetResultT } from "./serve";
class DataManager {
  _curStepNum = 5;
  setCurStepNum(val: number) {
    this._curStepNum = val;
  }
  getCurStepNum() {
    return this._curStepNum;
  }

  _newBeeDrawState = 0;
  setNewBeeDrawState(val: number) {
    this._newBeeDrawState = val;
  }
  getNewBeeDrawState() {
    return this._newBeeDrawState;
  }
  // 当前游戏模式 暴击 or 普通
  _curGameMode = ModeType.Normal;
  setCurGameMode(mode: ModeType) {
    this._curGameMode = mode;
  }
  getCurGameMode() {
    return this._curGameMode;
  }

  _gameStep: GameStep = GameStep.GameStart;
  setGameStep(val: GameStep) {
    this._gameStep = val;
  }
  getGameStep() {
    return this._gameStep;
  }

  _gameResult: BetResultT | null = null;
  setGameResult(val: BetResultT) {
    this._gameResult = val;
  }
  getGameResult(): BetResultT | null {
    return this._gameResult;
  }
  // 首充节点
  _firstDrawTipNode: FirstDrawTip | null = null;

  setFirstDrawTipNode(val: FirstDrawTip) {
    this._firstDrawTipNode = val;
  }
  getFirstDrawTipNode() {
    return this._firstDrawTipNode;
  }

  reset() {
    this._gameStep = GameStep.GameStart;
    this._gameResult = null;
  }
}

export const dataManager = new DataManager();
