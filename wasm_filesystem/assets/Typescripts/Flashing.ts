import { _decorator, Component, SpriteFrame, Sprite, Prefab, instantiate, Node } from 'cc'
import { ModeType } from './Enums'
const { ccclass, property } = _decorator

@ccclass('Flashing')
export class Flashing extends Component {
  @property([SpriteFrame])
  bgs: SpriteFrame[] = []

  @property(Prefab)
  flashingPre: Prefab = null!

  _duration = 0
  _index = 0
  _spacing = 91

  // 1 是蓝色灯，0是红色灯
  lights: { [protoName: string]: { status: number; position: { x: number; y: number }; spriteNode: Node }[] } = {
    top: [
      { status: 0, position: { x: -273, y: 696 }, spriteNode: null },
      { status: 1, position: { x: -182, y: 696 }, spriteNode: null },
      { status: 0, position: { x: -91, y: 696 }, spriteNode: null },
      { status: 1, position: { x: 0, y: 696 }, spriteNode: null },
      { status: 0, position: { x: 91, y: 696 }, spriteNode: null },
      { status: 1, position: { x: 182, y: 696 }, spriteNode: null },
      { status: 0, position: { x: 273, y: 696 }, spriteNode: null }
    ],
    top2: [
      { status: 0, position: { x: -273, y: 567 }, spriteNode: null },
      { status: 1, position: { x: -182, y: 567 }, spriteNode: null },
      { status: 0, position: { x: -91, y: 567 }, spriteNode: null },
      { status: 1, position: { x: 0, y: 567 }, spriteNode: null },
      { status: 0, position: { x: 91, y: 567 }, spriteNode: null },
      { status: 1, position: { x: 182, y: 567 }, spriteNode: null },
      { status: 0, position: { x: 273, y: 567 }, spriteNode: null }
    ],
    right: [
      { status: 0, position: { x: 332, y: 625 }, spriteNode: null },
      { status: 1, position: { x: 332, y: 534 }, spriteNode: null },
      { status: 0, position: { x: 332, y: 443 }, spriteNode: null },
      { status: 1, position: { x: 332, y: 352 }, spriteNode: null },
      { status: 0, position: { x: 332, y: 261 }, spriteNode: null },
      { status: 1, position: { x: 332, y: 170 }, spriteNode: null },
      { status: 0, position: { x: 332, y: 79 }, spriteNode: null }
    ],
    bottom: [
      { status: 1, position: { x: -273, y: 74 }, spriteNode: null },
      { status: 0, position: { x: -182, y: 74 }, spriteNode: null },
      { status: 1, position: { x: -91, y: 74 }, spriteNode: null },
      { status: 0, position: { x: 0, y: 74 }, spriteNode: null },
      { status: 1, position: { x: 91, y: 74 }, spriteNode: null },
      { status: 0, position: { x: 182, y: 74 }, spriteNode: null },
      { status: 1, position: { x: 273, y: 74 }, spriteNode: null }
    ],
    left: [
      { status: 0, position: { x: -332, y: 625 }, spriteNode: null },
      { status: 1, position: { x: -332, y: 534 }, spriteNode: null },
      { status: 0, position: { x: -332, y: 443 }, spriteNode: null },
      { status: 1, position: { x: -332, y: 352 }, spriteNode: null },
      { status: 0, position: { x: -332, y: 261 }, spriteNode: null },
      { status: 1, position: { x: -332, y: 170 }, spriteNode: null },
      { status: 0, position: { x: -332, y: 79 }, spriteNode: null }
    ]
  }

  _mode: ModeType = ModeType.Normal
  setMode(mode: ModeType) {
    this._mode = mode
    this._duration = this._mode === ModeType.Normal ? 2 : 0.2
    this.unschedule(this.flicker)
    this.schedule(this.flicker, this._duration)
  }

  flicker() {
    for (const key in this.lights) {
      if (Object.prototype.hasOwnProperty.call(this.lights, key)) {
        const elements = this.lights[key]
        elements.forEach(element => {
          element.status = element.status === 0 ? 1 : 0
          element.spriteNode.getComponent(Sprite).spriteFrame = this.bgs[element.status]
        })
      }
    }
  }

  init() {
    for (const key in this.lights) {
      if (Object.prototype.hasOwnProperty.call(this.lights, key)) {
        const elements = this.lights[key]
        for (let index = 0; index < elements.length; index++) {
          const element = elements[index]
          element.spriteNode = instantiate(this.flashingPre)
          element.spriteNode.getComponent(Sprite).spriteFrame = this.bgs[element.status]
          element.spriteNode.setPosition(element.position.x, element.position.y, 0)
          this.node.addChild(element.spriteNode)
        }
      }
    }
    this.setMode(ModeType.Normal)
  }
}
