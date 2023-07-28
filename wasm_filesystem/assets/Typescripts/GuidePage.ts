import { _decorator, Button, Component, Label, Node } from 'cc'
import {UIManager} from "./UIManager"
import { LocalizedManager } from './utils/i18n/LocalizedManager'
const { ccclass, property } = _decorator

@ccclass('GuidePage')
export class GuidePage extends Component {
  @property(Node)
  Mask:Node = null!

  @property(Label)
  GuideTxt: Label = null!

  private stepNum = -1
  private stepTxts: string[] = []

  protected start(): void {
    this.initLanguage()
    this.Mask.on(Node.EventType.TOUCH_START,this.closeGuidePage,this)
  }

  protected onDestroy(): void {
    this.Mask.off(Node.EventType.TOUCH_START,this.closeGuidePage,this)
  }

  initLanguage(): void {
    this.stepTxts = [LocalizedManager.getFinishStr('INTL_TASTYPARTY_TUTORIAL_ONE'), LocalizedManager.getFinishStr('INTL_TASTYPARTY_TUTORIAL_TWO')]

    this.changeStepExplanation()
  }

  changeStepExplanation() {
    this.stepNum++
    if (this.stepNum > 1) this.stepNum = 0
    this.GuideTxt.string = this.stepTxts[this.stepNum]
  }

  closeGuidePage() {
    UIManager.instance.closeDialog()
    localStorage.setItem('$_COCOS_SLOT', 'true')
  }
}
