import { _decorator, Component, Node, Prefab, instantiate, ScrollView } from 'cc'
import { getUserRecords } from './serve'
import type { RecordItemI } from './serve'
import { RecordItem } from './RecordItem'
import { sendDingTalkApi } from './utils'
import { DialogDef, UIManager } from './UIManager'
const { ccclass, property } = _decorator

@ccclass('RecordPage')
export class RecordPage extends Component {
  @property(Prefab)
  recordItem: Prefab = null!

  @property(Node)
  content: Node = null!

  @property(Node)
  noData: Node = null!

  _status = 'unDone'

  _roundData: RecordItemI[] = []

  hideRecordPage(){
    UIManager.instance.closeDialog()
  }

  protected onEnable(): void {
    // 接口请求更新数据
    this.getData()
  }

  async getData() {
    try {
      this.content.removeAllChildren()

      const data = await getUserRecords().then(res => res?.data)
      ;({ records: this._roundData } = data)

      if (this._roundData?.length > 0) this.noData.active = false

      this.renderList(this._roundData.slice(0, 10))
      this._status = this._roundData.length <= 10 ? 'done' : 'unDone'
    } catch (error) {
      sendDingTalkApi({
        users: ['zhangjunjie4480'],
        fnName: 'getRecordDataApi',
        err: String(error)
      })
    }
  }

  renderList(items: RecordItemI[]) {
    for (let i = 0; i < items.length; i++) {
      const recordItemNode = instantiate(this.recordItem)
      this.content.addChild(recordItemNode)
      recordItemNode.getComponent(RecordItem)?.init(items[i])
    }
  }

  handleScroll(scrollView: ScrollView) {
    if (this._status === 'done') return
    if (scrollView.getScrollOffset().y > 200) {
      this._status = 'done'
      this.renderList(this._roundData.slice(10))
    }
  }
}
