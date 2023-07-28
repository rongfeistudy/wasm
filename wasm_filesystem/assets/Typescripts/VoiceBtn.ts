import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc'
const { ccclass, property } = _decorator

@ccclass('VoiceBtn')
export class VoiceBtn extends Component {
  @property([SpriteFrame])
  bgs: SpriteFrame[] = []

  _voiceStatus = 1

  setVoiceStatus(val: number) {
    this._voiceStatus = val
    ;(this.node.getComponent(Sprite) as Sprite).spriteFrame = this.bgs[this._voiceStatus]
    localStorage.setItem('_SlotVoiceStatus', String(val))
  }
  getVoiceStatus() {
    return this._voiceStatus
  }

  onLoad() {
    this.setVoiceStatus(Number(localStorage.getItem('_SlotVoiceStatus') ?? 1))
  }

  handleClick() {
    this.setVoiceStatus(this._voiceStatus === 1 ? 0 : 1)
  }
}
