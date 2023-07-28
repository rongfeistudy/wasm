import {
  _decorator,
  Component,
  Node,
  resources,
  Sprite,
  SpriteFrame,
  Prefab,
  instantiate,
} from "cc";
import { ModeType, AudioEnum } from "./Enums";
import { LocalizedManager } from "./utils/i18n/LocalizedManager";
import { Toast } from "./Toast";
import { AudioManager } from "./utils";

const { ccclass, property } = _decorator;

@ccclass("Strike")
export class Strike extends Component {
  StrikeActiveNode: Node = null!;

  @property([SpriteFrame])
  bgs: SpriteFrame[] = [];

  @property(Toast)
  ToastNode: Toast = null!;

  _sprite: Sprite = null!;

  _state: ModeType = ModeType.Normal;

  setState(state: ModeType) {
    this._state = state;
    switch (state) {
      case ModeType.Normal:
        this._sprite.spriteFrame = this.bgs[0];
        if (this.StrikeActiveNode) this.StrikeActiveNode.active = false;
        break;
      case ModeType.Rush:
        this._sprite.spriteFrame = this.bgs[1];
        
        this.ToastNode.show(LocalizedManager.getFinishStr("INTL_TASTYPARTY_SPEED_MODE_TOAST"));

        if (this.StrikeActiveNode !== null) {
          this.StrikeActiveNode.active = true;
        } else {
          resources.load(
            "ui/prefab/StrikeActive",
            Prefab,
            (error: Error, data: Prefab) => {
              if (error !== undefined) return;
              const strikeActiveNode = instantiate(data);
              strikeActiveNode.active = true;
              this.StrikeActiveNode = strikeActiveNode;
              this.node.addChild(this.StrikeActiveNode);
            }
          );
        }

        AudioManager.instance.playShot(AudioEnum.TurnOnSpeedMode);
        break;
    }
  }

  init() {
    this._sprite = this.getComponent(Sprite) as Sprite;
    this.setState(ModeType.Normal);
  }
}
