import { _decorator, Label } from 'cc'
import { NumRoll } from './NumRoll'
const { ccclass, property } = _decorator

@ccclass('JackpotNum')
export class JackpotNum extends NumRoll {
  onLoad() {
    this.label = this.node.getComponent(Label)
  }
}
