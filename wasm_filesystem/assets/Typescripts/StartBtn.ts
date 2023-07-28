import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from 'cc'
import { StartBtnStatus, StartBtnMode } from './Enums'
import { LocalizedManager } from './utils/i18n/LocalizedManager'
const { ccclass, property } = _decorator

@ccclass('StartBtn')
export class StartBtn extends Component {
  @property(Label)
  startBtnTitle: Label = null!

  @property(Label)
  startBtnTip: Label = null!

  @property([SpriteFrame])
  bgs: SpriteFrame[] = []

  _sprite: Sprite = null!

  _state: StartBtnStatus = StartBtnStatus.Normal
  setState(state: StartBtnStatus) {
    this._state = state
    switch (state) {
      case StartBtnStatus.Normal:
        this._sprite.spriteFrame = this.bgs[0]
        break
      case StartBtnStatus.Press:
        this._sprite.spriteFrame = this.bgs[1]
        break
      case StartBtnStatus.Disabled:
        this._sprite.spriteFrame = this.bgs[2]
        break
    }
  }

  init() {
    this._sprite = this.getComponent(Sprite) as Sprite
    this.setState(StartBtnStatus.Normal)
  }

  setMode(mode: StartBtnMode) {
    switch (mode) {
      case StartBtnMode.Automatic:
        this.startBtnTitle && (this.startBtnTitle.string = LocalizedManager.getFinishStr('INTL_TASTYPARTY_STOP_AUTO_MODE'))
        this.startBtnTip && (this.startBtnTip.node.active = false)
        break
      case StartBtnMode.Normal:
        this.startBtnTitle && (this.startBtnTitle.string = LocalizedManager.getFinishStr('INTL_TASTYPARTY_START_MAIN'))
        this.startBtnTip && (this.startBtnTip.node.active = true)
        break

      case StartBtnMode.GameIn:
        this.startBtnTitle && (this.startBtnTitle.string = LocalizedManager.getFinishStr('INTL_TASTYPARTY_STOP_AUTO'))
        this.startBtnTip && (this.startBtnTip.node.active = false)
        break
    }
  }
}
