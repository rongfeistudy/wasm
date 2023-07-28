import { _decorator, Component, Label, UITransform, Sprite } from "cc";
import { getStrByteLength } from "./utils";
const { ccclass, property } = _decorator;

@ccclass("Toast")
export class Toast extends Component {
  private _timer: any;

  _ToastTxt: Label | null | undefined = null;

  _ToastBg: Sprite | null | undefined = null;

  ToastTxtUITran: UITransform | null = null;

  ToastBgUITran: UITransform | null = null;

  show(txt: string, duration = 1200) {
    this.node.active = true;

    if (this._ToastTxt === null)
      this._ToastTxt = this.node
        .getChildByName("ToastTxt")
        ?.getComponent(Label);

    if (this._ToastBg === null) this._ToastBg = this.getComponent(Sprite);

    if (!this._ToastTxt || !this._ToastBg) return;
    const byteLength = getStrByteLength(txt);

    // 17 估算的每个字节的长度,400设定的最大宽度
    let width = byteLength * 17;
    debugger;
    width = width > 400 ? 400 : width;
    const line = Math.ceil(byteLength / 24); // 24估算一行的文字
    this._ToastTxt.string = txt;

    if (this.ToastTxtUITran === null)
      this.ToastTxtUITran = this._ToastTxt.getComponent(UITransform);

    if (this.ToastBgUITran === null)
      this.ToastBgUITran = this._ToastBg.getComponent(UITransform);

    if (this.ToastTxtUITran) this.ToastTxtUITran.width = width;

    if (this.ToastBgUITran) {
      this.ToastBgUITran.width = width + 40;
      this.ToastBgUITran.height = line * 52 + 30;
    }

    if (this._timer) {
      clearTimeout(this._timer);
    }
    this._timer = setTimeout(() => {
      // 最后一个Toast消失
      this.node.active = false;
    }, duration);
  }
}
