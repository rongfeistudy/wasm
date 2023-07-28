import { _decorator, Component, tween, Tween, Vec3, Node } from 'cc'
const { ccclass } = _decorator

@ccclass('Fade')
export class Fade extends Component {
  _fadeInTween: Tween<Node> | null = null
  _hideTween: Tween<Node> | null = null

  _initialScale: Vec3 = new Vec3(0, 0, 0)
  _finallyScale: Vec3 = new Vec3(1, 1, 1)

  _duration = 0.3

  onLoad() {
    this._fadeInTween = tween(this.node).set({ scale: this._initialScale }).to(this._duration, { scale: this._finallyScale }, { easing: 'fade' })

    this._hideTween = tween(this.node).set({ scale: this._finallyScale }).to(this._duration, { scale: this._initialScale }, { easing: 'fade' })
  }

  fade() {
    this.node.active = true
    this._fadeInTween.start()
  }

  hide() {
    this._hideTween.start()
    this.scheduleOnce(() => {
      this.node.active = false
    }, this._duration)
  }
  onDestroy() {
    this._fadeInTween.stop()
    this._hideTween.stop()
  }
}
