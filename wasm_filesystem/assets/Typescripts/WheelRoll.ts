import {
  _decorator,
  Component,
  SpriteFrame,
  Prefab,
  instantiate,
  Sprite,
  tween,
  Vec3,
  Tween,
  Node,
} from "cc";
import { WheelColumn } from "./WheelColumn";
import { PrizeEnum, AudioEnum, ModeType } from "./Enums";
import { dataManager } from "./DataManager";
import { sendDingTalkApi, AudioManager } from "./utils";
const { ccclass, property } = _decorator;

/**
 *  动画设计
 *  第一个 0-0.8s 加速运动两圈，后边匀速运动到指定位置
 *
 */
@ccclass("WheelRoll")
export class WheelRoll extends Component {
  @property([WheelColumn])
  ColumnNodes: WheelColumn[] = [];

  @property([SpriteFrame])
  bgs: SpriteFrame[] = [];

  @property(Prefab)
  ColumnItemNode: Prefab = null!;

  // 每一列添加额外的三个奖品项,索引是 0 - 17
  _wheelsArr = [
    [
      "B",
      "A",
      "F",
      "F",
      "C",
      "E",
      "D",
      "C",
      "A",
      "E",
      "D",
      "B",
      "F",
      "D",
      "E",
      "B",
      "A",
      "F",
    ],
    [
      "A",
      "B",
      "C",
      "E",
      "A",
      "D",
      "B",
      "E",
      "F",
      "F",
      "D",
      "C",
      "E",
      "D",
      "F",
      "A",
      "B",
      "C",
    ],
    [
      "C",
      "A",
      "F",
      "D",
      "F",
      "B",
      "C",
      "A",
      "E",
      "B",
      "D",
      "E",
      "E",
      "F",
      "D",
      "C",
      "A",
      "F",
    ],
  ];

  // 每个奖品的尺寸
  _wheelSize = { width: 130, height: 130 };
  // 两个奖品之间的距离
  gap = 42;
  // ColumnNode 初始化位置索引
  _startPos = [10, 3, 3];
  // ColumnNode 的X坐标,固定的
  columnX = [-210, 0, 210];
  // 转动圈数
  circles = [1, 2, 4];

  _normalSpeed = 20;

  _rushSpeed = 30;

  speed = this._normalSpeed; // 普通模式速度 20 ，暴击为40

  _tweenArr: Tween<Node>[] = [];

  _results: number[] = [];

  init() {
    this.initAwards();
    this.initColumnPosition();
  }

  initColumnPosition() {
    for (let i = 0; i < this._startPos.length; i++) {
      const ColumnNodes = this.ColumnNodes[i];
      if (!ColumnNodes) continue;
      const posY = this.computedYPos(this._startPos[i]);
      ColumnNodes.node.setPosition(this.columnX[i], posY, 0);
    }
  }

  computedIndex(s: number) {
    /*
      70 ===>  this._wheelSize.height / 2
      210 ====>  this.gap + this._wheelSize.height   140 + 42
    */
    return Math.round(
      (s - this._wheelSize.width / 2) / (this._wheelSize.width + this.gap)
    );
  }

  computedYPos(n: number) {
    /*
      70 ===>  this._wheelSize.height / 2
      210 ====>  this.gap + this._wheelSize.height  
    */
    return Math.round(
      this._wheelSize.width / 2 + (this._wheelSize.width + this.gap) * n
    );
  }

  // 初始化盘面
  initAwards() {
    for (let k = 0; k < this.ColumnNodes.length; k++) {
      const column = this.ColumnNodes[k];
      column.node.removeAllChildren();
    }
    for (let i = 0; i < this._wheelsArr.length; i++) {
      const wheels = this._wheelsArr[i];
      if (!this.ColumnNodes[i]) continue;
      for (let j = 0; j < wheels.length; j++) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const wheelIndex = PrizeEnum[wheels[j]];
        const itemData = instantiate(this.ColumnItemNode);
        if (this.bgs[wheelIndex] && itemData) {
          (itemData.getComponent(Sprite) as Sprite).spriteFrame =
            this.bgs[wheelIndex];
          this.ColumnNodes[i].node.addChild(itemData);
        }
      }
    }
  }

  // 点击开始游戏
  scroll(results: number[], firstRollEnd: () => void, allRollEnd: () => void) {
    this._tweenArr = [];
    this._results = results;
    // 点击开始滚动
    AudioManager.instance.playBgm();

    for (let index = 0; index < results.length; index++) {
      this.columnNodesRun({ index, results, firstRollEnd, allRollEnd });
    }
  }
  // 停止动画直接展示结果
  stop() {
    if (!this._results || !Array.isArray(this._results)) {
      return sendDingTalkApi({
        users: ["zhangjunjie4480"],
        err: `WheelRoll stop error,result:${this._results}`,
      });
    }
    this._tweenArr.forEach((item) => {
      item?.stop();
    });
    this._results.forEach((result, index) => {
      const resultIndex = this.getResultIndex(result);
      this.ColumnNodes[index].node.setPosition(
        new Vec3(this.columnX[index], this.computedYPos(resultIndex), 0)
      );
    });
    AudioManager.instance.stopBgm();
    AudioManager.instance.playShot(AudioEnum.WhellRollEnd);
  }

  getResultIndex(resultIndex: number): number {
    if (resultIndex < 0 || resultIndex > 14) return -1;
    // 下标0 和1 单独处理
    return resultIndex === 0 ? 15 : resultIndex === 1 ? 16 : resultIndex;
  }

  columnNodesRun(val: {
    index: number;
    results: number[];
    firstRollEnd: () => void;
    allRollEnd: () => void;
  }) {
    const { index, results, firstRollEnd, allRollEnd } = val;
    const targetColumnNode = this.ColumnNodes[index].node;
    const x = this.columnX[index];
    const circle = this.circles[index];
    const startIndex = Math.round(
      this.computedIndex(targetColumnNode.getPosition().y)
    );
    const resultIndex = this.getResultIndex(results[index]);

    if (resultIndex === -1) return;

    this.speed =
      dataManager.getCurGameMode() === ModeType.Normal
        ? this._normalSpeed
        : this._rushSpeed;

    const tweenB =
      resultIndex >= startIndex
        ? tween(targetColumnNode)
            .to(
              (startIndex - 1) / this.speed,
              { position: new Vec3(x, this.computedYPos(1), 0) },
              { easing: "linear" }
            )
            .call(() => {
              targetColumnNode.setPosition(x, this.computedYPos(16), 0);
            })
            .to(
              (16 - resultIndex) / this.speed,
              { position: new Vec3(x, this.computedYPos(resultIndex), 0) },
              { easing: "linear" }
            )
        : tween(targetColumnNode).to((startIndex - resultIndex) / this.speed, {
            position: new Vec3(x, this.computedYPos(resultIndex), 0),
          });

    const tweenA = tween(targetColumnNode)
      // 到达最顶部
      .to(
        (startIndex - 1) / this.speed,
        { position: new Vec3(x, this.computedYPos(1), 0) },
        { easing: "linear" }
      )
      // 切换位置到最底部
      .call(() => {
        targetColumnNode.setPosition(x, this.computedYPos(16), 0);
      })
      .to(
        (16 - startIndex) / this.speed,
        { position: new Vec3(x, this.computedYPos(startIndex), 0) },
        { easing: "linear" }
      )
      .union()
      .repeat(circle)
      .then(tweenB)
      .call(() => {
        AudioManager.instance.playShot(AudioEnum.WhellRollEnd);
        tweenB.stop();
        tweenA.stop();
        if (index === 0 && firstRollEnd) firstRollEnd();
        if (index === 2 && allRollEnd) allRollEnd();
      })
      .start();

    this._tweenArr[index] = tweenA;
  }
}
