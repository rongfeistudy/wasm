import { _decorator, Node, Tween, Vec3, tween, Label } from 'cc'
import { NumRoll } from './NumRoll'
const { ccclass, property } = _decorator

@ccclass('PrizeCoinNum')
export class PrizeCoinNum extends NumRoll {
  _fadeInTween: Tween<Node> | null = null

  _initialScale: Vec3 = new Vec3(0, 0, 0)
  _finallyScale: Vec3 = new Vec3(1, 1, 1)

  _duration = 0.3

  label!: Label

  onLoad() {
    this._fadeInTween = tween(this.node).set({ scale: this._initialScale }).to(this._duration, { scale: this._finallyScale }, { easing: 'fade' })

    this.label = this.getComponent(Label) as Label
  }

  fade(endNum: number, duration: number, delay: number) {
    this.node.active = true
    this._fadeInTween?.start()
    this.reset()
    this.rolling({ endNum, duration, delay })
  }

  hide() {
    this.node.active = false
  }

  onDestroy() {
    this._fadeInTween?.stop()
  }
}
