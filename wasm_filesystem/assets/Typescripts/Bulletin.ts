import { _decorator, Component, Label, Vec3, Node, tween, Tween, UITransform, Sprite, SpriteFrame } from 'cc'
import { DrawResultToIndex } from './Enums'
import { LocalizedManager } from './utils/i18n/LocalizedManager'
import { dataManager } from './DataManager'
const { ccclass, property } = _decorator

@ccclass('Bulletin')
export class Bulletin extends Component {
  @property(Label)
  rollLabel1: Label = null!
  @property(Label)
  rollLabel2: Label = null!

  @property(Node)
  BulletinTxtBoxNode: Node = null!
  @property(Sprite)
  BulletinPrizeMes: Sprite = null!

  @property([SpriteFrame])
  SpriteFrames: SpriteFrame[] = []

  _lineHeight = 87
  _offset: Vec3 = new Vec3(0, this._lineHeight, 0)
  _rollLabelPos1: Vec3 = new Vec3(0, 0, 0)
  _rollLabelPos2: Vec3 = new Vec3(0, -this._lineHeight, 0)
  _isRollLabelAtFront = true
  _defaultTxtObjs: { txt: string; difference: number }[] = []
  _containerBoxWidth = 504

  _curTxtIndex = 0
  _nextTxtIndex = 1
  _speed = 250
  _defaultDifference = -1000 // - 1000的设置是随机的，只要保证 计算后 difference 肯定是一个不存在的值

  initLanguage() {
    this._defaultTxtObjs = []
    const transKey = ['INTL_TASTYPARTY_NOTICE_ONE', 'INTL_TASTYPARTY_NOTICE_TWO', 'INTL_TASTYPARTY_NOTICE_THREE']
    for (let index = 0; index < transKey.length; index++) {
      const txt = LocalizedManager.getFinishStr(transKey[index])
      this._defaultTxtObjs.push({ txt: txt, difference: this._defaultDifference })
    }

    this.rolling()
    this.schedule(this.rolling, 5)
  }

  rolling() {
    const curLabel = this._isRollLabelAtFront ? this.rollLabel1 : this.rollLabel2
    const nextLabel = this._isRollLabelAtFront ? this.rollLabel2 : this.rollLabel1

    const curTxtObj = this._defaultTxtObjs[this._curTxtIndex]
    const nextTxtObj = this._defaultTxtObjs[this._nextTxtIndex]

    curLabel.string = curTxtObj.txt
    nextLabel.string = nextTxtObj.txt

    setTimeout(() => {
      // 取值
      if (curTxtObj.difference === this._defaultDifference) {
        const txtWidth = curLabel.getComponent(UITransform)?.width ?? this._containerBoxWidth
        curTxtObj.difference = txtWidth - this._containerBoxWidth
      }

      if (nextTxtObj.difference === this._defaultDifference) {
        const txtWidth = nextLabel.getComponent(UITransform)?.width ?? this._containerBoxWidth
        nextTxtObj.difference = txtWidth - this._containerBoxWidth
      }

      const tweenA = tween(curLabel.node)
        .by(0.5, { position: this._offset })
        .call(() => {
          tweenA.stop()
        })
        .start()

      if (nextTxtObj.difference > 0) {
        const time = nextTxtObj.difference / this._speed

        const tweenB = tween(nextLabel.node)
          .by(0.5, { position: this._offset })
          .delay(0.6)
          .by(time, {
            position: new Vec3(-nextTxtObj.difference, 0, 0)
          })
          .delay(0.6)
          .by(time, { position: new Vec3(nextTxtObj.difference, 0, 0) })
          .call(() => {
            tweenB.stop()
            this._isRollLabelAtFront = !this._isRollLabelAtFront
            this._curTxtIndex = ++this._curTxtIndex % 3
            this._nextTxtIndex = ++this._nextTxtIndex % 3
            curLabel.node.setPosition(this._rollLabelPos2)
          })
          .start()
      } else {
        const tweenB = tween(nextLabel.node)
          .by(0.5, { position: this._offset })
          .call(() => {
            tweenB.stop()
            this._isRollLabelAtFront = !this._isRollLabelAtFront
            this._curTxtIndex = ++this._curTxtIndex % 3
            this._nextTxtIndex = ++this._nextTxtIndex % 3
            curLabel.node.setPosition(this._rollLabelPos2)
          })
          .start()
      }
    }, 100)
  }

  showPrizeMes(time: number) {
    const result = dataManager.getGameResult()
    if (!result) return
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const index = DrawResultToIndex[result.drawResult]
    if (index === undefined) return
    this.BulletinPrizeMes.spriteFrame = this.SpriteFrames[index]
    this.BulletinPrizeMes.node.active = true
    this.BulletinTxtBoxNode && (this.BulletinTxtBoxNode.active = false)
    this.scheduleOnce(this.hidePrizeMes, time)
  }

  hidePrizeMes() {
    this.unschedule(this.hidePrizeMes)
    this.BulletinPrizeMes.node.active = false
    this.BulletinTxtBoxNode && (this.BulletinTxtBoxNode.active = true)
  }
}
