import { _decorator, Component } from "cc";
import { getBetConfig } from "./serve";
import { dataManager } from "./DataManager";
import { JackpotNum } from "./JackpotNum";
import { sendDingTalkApi } from "./utils";

const { ccclass, property } = _decorator;

@ccclass("Jackpot")
export class Jackpot extends Component {
  @property(JackpotNum)
  JackpotNumNode: JackpotNum = null!;

  async reset() {
    try {
      this.unschedule(this.reset);
      this.schedule(this.reset, 60);
      const res = await getBetConfig();
      const curBetConfig = res.data.betConfig.filter(
        (config) => config.betNum === dataManager.getCurStepNum()
      );

      if (curBetConfig.length > 0)
        this.JackpotNumNode.rolling({
          endNum: curBetConfig[0].jackpotNum,
          duration: 1,
          delay: 0,
        });
    } catch (error) {
      sendDingTalkApi({
        users: ["zhangjunjie4480"],
        err: `获取档位奖池失败:${String(error)}`,
      });
    }
  }

  onDestroy() {
    this.unschedule(this.reset);
  }
}
