import { _decorator, Component, Animation } from "cc";
const { ccclass, property } = _decorator;

@ccclass("FirstDrawTip")
export class FirstDrawTip extends Component {
  fadeIn() {
    this.getComponent(Animation)?.play("FadeIn");
  }
  fadeOut() {
    this.getComponent(Animation)?.play("FadeOut");
  }
  fadeInEnd() {
    // 跳动动画
    this.getComponent(Animation)?.play("beat");
  }
}
