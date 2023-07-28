import { _decorator, Color, Component, instantiate, Label, Node, Prefab, Sprite, SpriteFrame, UITransform } from 'cc'
import type { RecordItemI } from './serve'
import { DrawResult, PrizeEnum } from './Enums'
const { ccclass, property } = _decorator

@ccclass('RecordItem')
export class RecordItem extends Component {
  @property(Label)
  RecordItemTitleNum: Label = null!

  @property(Prefab)
  ColumItem: Prefab = null!

  @property(Label)
  RecordItemTime: Label = null!

  @property(Node)
  WinNode: Node = null!

  @property(Node)
  NoWinNode: Node = null!

  @property([SpriteFrame])
  bgs: SpriteFrame[] = []

  LabelColor = new Color().fromHEX('#B8791B')

  init(data: RecordItemI) {
    this.RecordItemTitleNum.string = `${data.betNum}ttc`
    this.RecordItemTime.string = data.createdTime
    if (data.winResult === DrawResult.None) {
      return (this.NoWinNode.active = true)
    }

    this.WinNode.active = true
    data.winResult.split('').forEach(result => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const curBg = this.bgs[PrizeEnum[result]]
      if (curBg) {
        const icon = instantiate(this.ColumItem)

        ;(icon.getComponent(Sprite) as Sprite).spriteFrame = curBg

        const uiTransform = icon.getComponent(UITransform) as UITransform
        uiTransform.width = 40
        uiTransform.height = 40
        this.WinNode.addChild(icon)
      }
    })

    const resultTxtNode = new Node()
    resultTxtNode.addComponent(Label)
    const label: Label = resultTxtNode.getComponent(Label) as Label
    label.string = String(data.coinNum)
    label.fontSize = 30
    label.color = this.LabelColor
    this.WinNode.addChild(resultTxtNode)
  }
}
