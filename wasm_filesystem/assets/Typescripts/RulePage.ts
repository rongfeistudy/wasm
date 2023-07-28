import { Component, _decorator } from 'cc'
const { ccclass } = _decorator

@ccclass('RulePage')
export class RulePage extends Component {
  show(event, isShow: string) {
    this.node.active = isShow === 'true'
  }
}
