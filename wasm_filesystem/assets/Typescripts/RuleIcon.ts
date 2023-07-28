import { _decorator, Component, Node } from 'cc';
import { DialogDef, UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('RuleIcon')
export class RuleIcon extends Component {
    start() {
      this.node.on(Node.EventType.TOUCH_START,this.showRulePage,this)
    }

    showRulePage(){
      UIManager.instance.openDialog(DialogDef.Rule,true)
    }

    protected onDestroy(): void {
      this.node.off(Node.EventType.TOUCH_START,this.showRulePage,this) 
    }
}

