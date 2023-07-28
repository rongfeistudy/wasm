import { _decorator, Label } from 'cc'
import { Fade } from './Fade'
import { LocalizedManager } from './utils/i18n/LocalizedManager'
const { ccclass } = _decorator

type emptyFunction = (value?: unknown) => void
@ccclass('CountDown')
export class CountDown extends Fade {
  _countDownNum = 11

  _timer = null

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _callBack: emptyFunction = () => {}

  startCountDown(resolve: emptyFunction) {
    this._countDownNum = 11
    this._callBack = () => this.countDownFn(resolve)
    this._callBack()
    this.schedule(this._callBack, 1)
  }

  stopCountDown() {
    this._countDownNum = 11
    this.unschedule(this._callBack)
  }

  countDownFn(resolve: emptyFunction) {
    if (--this._countDownNum < 0) {
      this._countDownNum = 0
      this.unschedule(this._callBack)
    }
    if (this._countDownNum === 0) resolve()
    ;(this.getComponent(Label) as Label).string = LocalizedManager.getFinishStr('INTL_TASTYPARTY_EXTRAGAME_COUNTDOWN', [String(this._countDownNum)])
  }

  onDestroy(): void {
    this.unschedule(this._callBack)
  }
}
