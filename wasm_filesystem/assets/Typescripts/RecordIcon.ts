import { _decorator, Component, Node } from 'cc';
import { DialogDef, UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('RecordIcon')
export class RecordIcon extends Component {
    start() {
       this.node.on(Node.EventType.TOUCH_START,this.showRecordPage,this)
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_START,this.showRecordPage,this)
    }

    showRecordPage(){
        UIManager.instance.openDialog(DialogDef.Record,true)
    }
}

