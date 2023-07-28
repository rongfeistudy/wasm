import {
  _decorator,
  Component,
  instantiate,
  Node,
  Prefab,
  Sprite,
  SpriteFrame,
  find,
} from "cc";
import { Game } from "./Game";
const { ccclass, property } = _decorator;

@ccclass("TurntableBg")
export class TurntableBg extends Component {
  _r = 300;
  rad = Math.PI / 8;

  _Game: Node | null = null;

  protected onLoad(): void {
    this.node.on(Node.EventType.TOUCH_END, this.touchEndHandle, this);
  }

  protected onDestroy(): void {
    this.node.off(Node.EventType.TOUCH_END, this.touchEndHandle, this);
  }

  touchEndHandle() {
    if (this._Game === null) this._Game = find("Canvas");
    if (this._Game !== null) {
      this._Game?.getComponent(Game)?.startTurnTable();
    }
  }
}
