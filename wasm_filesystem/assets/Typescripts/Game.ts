import {
  _decorator,
  Component,
  Node,
  Animation,
  EventTouch,
  instantiate,
  Prefab,
  Vec3,
  UITransform,
  Vec2,
  resources,
  find,
} from "cc";
import { postBet, getBetConfig } from "./serve";
import type { BetResultT } from "./serve";
// eslint-disable-next-line
//@ts-ignore
import Bridge from "./utils/bridge.js";
import { LocalizedManager } from "./utils/i18n/LocalizedManager";
// eslint-disable-next-line
// @ts-ignore
import LiveBridge from "./utils/socket/live-bridge.umd.js";
import { Income } from "./Income";
import { Bulletin } from "./Bulletin";
import { Flashing } from "./Flashing";
import { Jackpot } from "./Jackpot";
import { StepController } from "./StepController";
import { WheelRoll } from "./WheelRoll";
import { dataManager } from "./DataManager";
import {
  GameStep,
  DrawResult,
  ModeType,
  AudioEnum,
  StartBtnStatus,
  GameModeType,
  RoomTypeEnum,
  StartBtnMode,
} from "./Enums";
import { PrizeCoinNum } from "./PrizeCoinNum";
import { Turntable } from "./Turntable";
import { StartBtn } from "./StartBtn";
import { Strike } from "./Strike";
import { Toast } from "./Toast";
import {
  urlParams,
  sendDingTalkApi,
  cancelLoading,
  isInApp,
  getLanguage,
  systemLangToLang,
  defaultLangs,
  statisticsMain,
  statisticsMainLanguageLoad,
  AudioManager,
} from "./utils";
import { DialogDef, UIManager } from "./UIManager";
import { FirstDrawTip } from "./FirstDrawTip";

const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  @property(Jackpot)
  JackpotNode: Jackpot = null!;

  @property(WheelRoll)
  WheelRollNode: WheelRoll = null!;

  @property(Bulletin)
  BulletinNode: Bulletin = null!;

  @property(Income)
  IncomeNode: Income = null!;

  @property(StepController)
  StepControllerNode: StepController = null!;

  @property(Flashing)
  FlashingNode: Flashing = null!;

  @property(Strike)
  strikeBtn: Strike = null!;

  @property(Node)
  smallPrizeNode: Node = null!;

  @property(PrizeCoinNum)
  prizeCoinNumNode: PrizeCoinNum = null!;

  @property(Node)
  greyMaskNode: Node = null!;

  @property(StartBtn)
  startBtnNode: StartBtn = null!;

  @property(Node)
  morePlaneNode: Node = null!;

  @property(Toast)
  ToastNode: Toast = null!;

  @property(Prefab)
  ClickParticleEffect: Prefab = null!;

  turnTableNode: Turntable = null!;

  bigPrizeTipNode: Node = null!;

  _isTurnTableStarted = false;

  _curGameMode: GameModeType = GameModeType.Normal; // 自动模式 or 非自动模式

  // 暴击模式还是非暴击模式
  _curGameCriticalStrikeMode: ModeType = ModeType.Normal;

  _isStartBtnNodeEnableClick = true;

  _morePlaneNodeVisible = false;

  _liveMode: string = RoomTypeEnum.video;
  _liveType: string = "";
  _anchorId = "-1";

  _isPress = false;

  _isOpenPage = false;

  _isCancelSettleAccounts = false;

  _isSettleAccounts = false; // 是否再结算中

  _SceneSize: { width: number; height: number } = { width: 0, height: 0 };

  _Container: Node = null!;

  onLoad() {
    // @ts-ignore
    window.ccOnLoaded = true;
    // @ts-ignore
    console.log('>>>time:Game:onLoad:', Date.now() - window.initProjectTime);
    this.init();
    this.WheelRollNode.init();
    this.FlashingNode.init();
    this.startBtnNode.init();
    this.strikeBtn.init();
    this.startBtnNodeInitEvent();
    this.strikeBtnInitEvent();
    this.tryShowGuidePage();
  }

  init() {
    const urlParamsObj: { [propName: string]: string } = urlParams();
    this._liveMode = urlParamsObj.liveMode ?? "";
    this._liveType = urlParamsObj.liveType ?? "";
    this._anchorId = urlParamsObj.anchorId ?? "-1";
    this._Container = find(`Canvas/Container`) as Node;

    this.initLanguage();

    this.initData();

    this.scheduleOnce(() => {
      // 动态添加AudioManager
      AudioManager.instance.insertGame();
    }, 0.4);

    this.scheduleOnce(() => {
      // 动态加载大奖素材
      resources.load(
        ["ui/prefab/BigPrizeTip", "ui/prefab/Turntable"],
        Prefab,
        (
          error,
          [{ data: BigPrizeTipIntance }, { data: TurntableInstance }]
        ) => {
          if (error !== undefined) return;
          const BigPrizeTipNode = instantiate(BigPrizeTipIntance);
          BigPrizeTipNode.active = false;
          this._Container.addChild(BigPrizeTipNode);
          this.bigPrizeTipNode = BigPrizeTipNode;

          const TurntableNode = instantiate(TurntableInstance);
          TurntableNode.active = false;
          this._Container.addChild(TurntableNode);
          this.turnTableNode = TurntableNode.getComponent(Turntable);
        }
      );
    }, 0.6);

    setTimeout(statisticsMain, 0);
    // 如果页面没有打开则打开
    this.scheduleOnce(this.openPage, 1);
  }

  async initData() {
    try {
      const res = await getBetConfig();
      const { newbeeFreeDraw, betConfig, dailyRevenue } = res.data;

      this.IncomeNode.updateIncome(dailyRevenue);
      // 首抽必中吗 1 => 必中 ===> 注意先设置用户的首充状态，应该在档位初始化时，有气泡的展示逻辑
      dataManager.setNewBeeDrawState(newbeeFreeDraw);
      // 初始化档位 ===> 档位初始化后japot后更新
      this.StepControllerNode.init(betConfig);
      

      if (newbeeFreeDraw === 1) {
        // 初始化新手指导气泡
        resources.load(
          "ui/prefab/FirstDrawTip",
          Prefab,
          (error: Error, data) => {
            if (error) return;
            const firstDrawTipNode = instantiate(data);
            firstDrawTipNode.active = true;
            const parentNode = find("Canvas/Container/FirstDrawTipNode");
            parentNode?.addChild(firstDrawTipNode);
            const firstDrawTip = firstDrawTipNode.getComponent(FirstDrawTip);
            dataManager.setFirstDrawTipNode(firstDrawTip as FirstDrawTip);
            firstDrawTip?.fadeIn();
          }
        );
      }
    } catch (error) {
      sendDingTalkApi({
        users: ["zhangjunjie4480"],
        err: `初始化项目失败:${String(error)}`,
      });
    }
  }

  bet() {
    try {
      // 改变 startBtnNode 的状态
      if (this._curGameMode === GameModeType.Automatic) {
        this.startBtnNode.setMode(StartBtnMode.Automatic);
      } else {
        this.startBtnNode.setMode(StartBtnMode.GameIn);
      }

      const result = dataManager.getGameResult();
      const gameStep = dataManager.getGameStep();
      // 额外游戏禁止点击
      if (gameStep === GameStep.ExtraGame) return;

      switch (gameStep) {
        // 结算期间,直接展示结果
        case GameStep.Settlement:
          this.cancelSettleAccountsAnimation(result);
          break;
        // 第一个滚轴动画结束到第三个滚轴结束期间，点击直接展示结果
        case GameStep.GameIn:
          if (!result) return;
          this.WheelRollNode.stop();
          this.showPrizeResult();
          break;
        // 游戏未开始，点击开始游戏
        case GameStep.GameStart:
          this.startWheelRoll();
      }
    } catch (err) {
      this.restoreGameInitStatus();

      sendDingTalkApi({
        users: ["zhangjunjie4480"],
        err: `bet catch,${String(err)}`,
      });
      this.ToastNode.show(
        LocalizedManager.getFinishStr("INTL_TASTYPARTY_DEDUCT_FAILED")
      );
    }
  }
  // 开始滚动
  async startWheelRoll() {
    try {
      this.setStartBtnDisable(true);

      const res = await postBet({
        anchorId: this._anchorId,
        betNum: dataManager.getCurStepNum(),
        liveMode: this._liveMode,
        liveType: this._liveType,
      });

      const code = res.meta.code;
      const results = res.data?.wheelResult;
      const newbeeFreeDraw = res.data?.newbeeFreeDraw;

      if (code === 41600) {
        this.restoreGameInitStatus();
        this.quitAutoMaticMode();
        LiveBridge.showTTCoinDialog({ from: "intl_slot1" });
        return;
      }

      if (code !== 200 || !results) {
        this.restoreGameInitStatus();
        this.quitAutoMaticMode();

        this.ToastNode.show(
          LocalizedManager.getFinishStr("INTL_TASTYPARTY_DEDUCT_FAILED")
        );
        return;
      }

      dataManager.setGameStep(GameStep.GameIn);

      dataManager.setGameResult(res.data);

      // 隐藏首充
      if (newbeeFreeDraw === 0) {
        const firstDrawTipNode = dataManager.getFirstDrawTipNode();
        if (firstDrawTipNode !== undefined) {
          firstDrawTipNode?.node.removeFromParent();
        }
      }

      this.WheelRollNode.scroll(
        results,
        () => {
          // 第一个转动结束后 转动结束后
          this.setStartBtnDisable(false);
        },
        () => {
          // 展示结果
          this.showPrizeResult();
        }
      );
    } catch (err) {
      this.restoreGameInitStatus();
      this.quitAutoMaticMode();
      sendDingTalkApi({
        users: ["zhangjunjie4480"],
        err: `下注失败catcherror ${String(err)}`,
      });
    }
  }

  restoreGameInitStatus() {
    this._isTurnTableStarted = false;
    dataManager.reset();
    this.setStartBtnDisable(false);
  }

  showPrizeResult() {
    const result = dataManager.getGameResult();
    if (!result) {
      this.restoreGameInitStatus();
      this.quitAutoMaticMode();
      sendDingTalkApi({
        users: ["zhangjunjie4480"],
        err: String(`showPrizeResult error: result 不存在`),
      });
      return;
    }
    AudioManager.instance.stopBgm();

    switch (result.drawResult) {
      // 未中奖
      case DrawResult.None:
        // 更新收益
        this.IncomeNode.updateIncome(result.dailyRevenue);
        // 推出新手模式
        if (result?.newbee === false) this.StepControllerNode.changeBetConfig();
        // 重制数据
        this.reset();
        this._curGameMode === GameModeType.Automatic && this.bet();
        break;
      // 特殊大奖
      case DrawResult.A3:
        this.showBigPrize();
        break;
      // 普通中奖==>结算
      default:
        dataManager.setGameStep(GameStep.Settlement);
        this.scheduleOnce(() => {
          this.settleAccounts(result);
        }, 0.5);
    }
  }
  // 大奖
  showBigPrize() {
    dataManager.setGameStep(GameStep.ExtraGame);
    if (!this.turnTableNode) {
      this.restoreGame();
    }
    // 重制转盘旋转角度为0
    this.turnTableNode.reset();
    this.greyMaskNode.active = true;

    if (this.bigPrizeTipNode) {
      this.bigPrizeTipNode.active = true;
      this.bigPrizeTipNode.getComponent(Animation)?.play("bigPrizeTipFade");
    }

    AudioManager.instance.playShot(AudioEnum.Win);

    this.scheduleOnce(() => {
      this.turnTableNode.fade();

      this.scheduleOnce(() => {
        this.turnTableNode.showCountDown().then(() => {
          // 倒计时结束，尝试开启倒计时
          !this._isTurnTableStarted && this.startTurnTable();
        });
      }, 0.5);
    }, 2);
  }
  // 结算 （数字滚动效果）
  settleAccounts(result: BetResultT) {
    if (!result || result.coinNum === undefined) {
      sendDingTalkApi({
        users: ["zhangjunjie4480"],
        err: String(`settleAccounts error:${String(result)}`),
      });

      this.restoreGameInitStatus();
      this.quitAutoMaticMode();
      return;
    }

    this._isSettleAccounts = true;

    dataManager.setGameStep(GameStep.Settlement);

    AudioManager.instance.playShot(AudioEnum.GoldCoin);

    const coinNum = result.coinNum;
    const rollTime =
      coinNum < 1000 ? 2 : coinNum > 1000 && coinNum < 10000 ? 3 : 4;
    this.settleAccountsAnimation(coinNum, rollTime);
    this.scheduleOnce(this.restoreGame, rollTime + 0.5);
  }

  settleAccountsAnimation(coinNum: number, rollTime: number) {
    this.FlashingNode.setMode(ModeType.Rush);

    this.smallPrizeNode.active = true;

    this.BulletinNode.showPrizeMes(rollTime);

    this.JackpotNode.reset();

    this.prizeCoinNumNode.fade(coinNum, rollTime, 0);
  }

  cancelSettleAccountsAnimation(result: BetResultT | null) {
    if (!this._isSettleAccounts || this._isCancelSettleAccounts) return;

    if (!result) {
      sendDingTalkApi({
        users: ["zhangjunjie4480"],
        err: String(`cancelSettleAccountsAnimation error:result is undefined`),
      });
      this.restoreGameInitStatus();
      this.quitAutoMaticMode();
      this.startBtnNode.setMode(StartBtnMode.Normal);
      return;
    }

    this._isCancelSettleAccounts = true;
    this.unschedule(this.restoreGame);
    this.prizeCoinNumNode.stopRoll();
    this.scheduleOnce(this.restoreGame, 1);
  }

  restoreGame() {
    // 更新余额
    const result = dataManager.getGameResult();

    result && this.IncomeNode.updateIncome(result.dailyRevenue);

    if (result) {
      //收益更新
      this.IncomeNode.updateIncome(result.dailyRevenue);
      if (result?.newbee === false) this.StepControllerNode.changeBetConfig();
    }

    this.smallPrizeNode.active = false;
    this.BulletinNode.hidePrizeMes();
    this.prizeCoinNumNode.hide();
    this.FlashingNode.setMode(ModeType.Normal);

    if (this._curGameMode === GameModeType.Automatic) {
      this.scheduleOnce(() => {
        this.reset();
        this.bet();
      }, 0.5);
    } else {
      this.reset();
    }
  }
  // 转盘开始转动
  startTurnTable() {
    if (this._isTurnTableStarted) return;
    const result = dataManager.getGameResult();

    if (
      result?.extraGameResult === undefined ||
      result.extraGameResult === -1
    ) {
      sendDingTalkApi({
        users: ["zhangjunjie4480"],
        err: String(`extraGameResult error:${result?.extraGameResult}`),
      });
      return;
    }

    this._isTurnTableStarted = true;
    this.turnTableNode.hideCountDown();
    this.turnTableNode.rollUp(result.extraGameResult).then(() => {
      // 选中奖品区域高亮
      this.turnTableNode.setResultTipVisible(true);

      AudioManager.instance.playShot(AudioEnum.TurnTableResultTip);

      this.scheduleOnce(() => {
        this.turnTableNode.setResultTipVisible(false);
        this.turnTableNode.hide();
        this.greyMaskNode.active = false;
        this._isTurnTableStarted = false;
        // 展示结算部分
        this.settleAccounts(result);
      }, 1.2);
    });
  }

  tryShowGuidePage() {
    if (localStorage.getItem("$_COCOS_SLOT") !== "true") {
      UIManager.instance.openDialog(DialogDef.Guide, true);
    }
  }

  startBtnNodeInitEvent() {
    this.startBtnNode.node.on(
      Node.EventType.TOUCH_START,
      this.startBtnClickStart,
      this
    );
    this.startBtnNode.node.on(
      Node.EventType.TOUCH_END,
      this.startBtnClickEnd,
      this
    );
    this.WheelRollNode.node.on(
      Node.EventType.TOUCH_END,
      this.startBtnClickEnd,
      this
    );
  }

  strikeBtnInitEvent() {
    this.strikeBtn.node.on(
      Node.EventType.TOUCH_END,
      this.changeGameCriticalStrikeMode,
      this
    );
  }

  changeGameCriticalStrikeMode() {
    this._curGameCriticalStrikeMode =
      this._curGameCriticalStrikeMode === ModeType.Normal
        ? ModeType.Rush
        : ModeType.Normal;
    this.strikeBtn.setState(this._curGameCriticalStrikeMode);
    dataManager.setCurGameMode(this._curGameCriticalStrikeMode);
  }

  startBtnClickStart() {
    if (!this._isStartBtnNodeEnableClick) return; // 禁用状态
    this.startBtnNode.setState(StartBtnStatus.Press);
    this.scheduleOnce(this.startBtnClickPress, 0.7);
  }

  startBtnClickPress() {
    if (dataManager.getGameStep() !== GameStep.GameStart) return;
    this._isPress = true;
    this.startBtnNode.setState(StartBtnStatus.Normal);
    // 长按设置自动模式
    if (this._curGameMode !== GameModeType.Normal) return;
    this._curGameMode = GameModeType.Automatic;

    this.startBtnNode.setMode(StartBtnMode.Automatic);
    this.bet();
  }

  startBtnClickEnd() {
    if (this._isPress) return (this._isPress = false);
    if (!this._isStartBtnNodeEnableClick) return; // 禁用状态
    this.unschedule(this.startBtnClickPress);

    this.startBtnNode.setState(StartBtnStatus.Normal);

    if (this._curGameMode === GameModeType.Automatic) {
      this.quitAutoMaticMode();
    } else {
      this.bet();
    }
  }

  setStartBtnDisable(isDisable: boolean) {
    this.startBtnNode.setState(
      isDisable ? StartBtnStatus.Disabled : StartBtnStatus.Normal
    );
    this._isStartBtnNodeEnableClick = !isDisable;
  }

  quitAutoMaticMode() {
    const step = dataManager.getGameStep();
    this._curGameMode = GameModeType.Normal;
    if (step === GameStep.GameStart) {
      this.startBtnNode.setMode(StartBtnMode.Normal);
    } else {
      this.startBtnNode.setMode(StartBtnMode.GameIn);
    }
  }

  setMorePlaneVisible() {
    this.morePlaneNode.active = this._morePlaneNodeVisible =
      !this._morePlaneNodeVisible;
  }

  hideMorePlane(event: EventTouch) {
    this.clickParticleEffect(event);
    this._morePlaneNodeVisible = this.morePlaneNode.active = false;
  }

  clickParticleEffect(event: EventTouch) {
    if (this._SceneSize.width === 0) {
      const sceneUITransform = this.getComponent(UITransform);
      this._SceneSize.width = sceneUITransform?.width ?? 0;
      this._SceneSize.height = sceneUITransform?.height ?? 0;
    }
    if (this._SceneSize.width !== 0) {
      const uiLocaltion = event.getUILocation();
      const pos = this.transformCenterPos(uiLocaltion);
      const clickParticleEfect = instantiate(this.ClickParticleEffect);
      clickParticleEfect.active = true;
      this.node.addChild(clickParticleEfect);
      clickParticleEfect.setPosition(pos);
      this.scheduleOnce(() => {
        clickParticleEfect.destroy();
      }, 1);
    }
  }

  transformCenterPos(uiLocaltion: Vec2): Vec3 {
    const x = uiLocaltion.x - this._SceneSize.width / 2;
    const y = uiLocaltion.y - this._SceneSize.height / 2;
    return new Vec3(x, y, 0);
  }

  async initLanguage() {
    // 获取语言
    const defaultLang = "tantan-h5-en-US";
    let language = "tantan-h5-en-US";
    if (isInApp) {
      Bridge.getSystemInfo().then((res: any) => {
        language = systemLangToLang[res.language];
        language = defaultLangs.some((item) => language === item)
          ? language
          : defaultLang;
        // 加载语言包
        this.loadLanguage(language);
      });
    } else {
      language = getLanguage();
      language = defaultLangs.some((item) => language === item)
        ? language
        : defaultLang;
      // 加载语言包
      this.loadLanguage(language);
    }
  }

  async closeWebview() {
    const gameStep = dataManager.getGameStep();
    // 额外游戏禁止点击
    if (gameStep === GameStep.ExtraGame) return;
    const roomConfig = await LiveBridge.getRoomConfig();
    if (
      roomConfig.roomType === RoomTypeEnum.video ||
      roomConfig.roomType === RoomTypeEnum.voice
    ) {
      return LiveBridge.closeLiveCampaignDialog();
    } else {
      return Bridge.closeWebview();
    }
  }

  loadLanguage(language: string) {
    LocalizedManager.changeLanguage(language, (res) => {
      if (res) {
        this.BulletinNode.initLanguage();
        this.openPage();
      }
    });
  }
  // 重置页面状态
  reset(): void {
    this._isSettleAccounts = false;
    this._isCancelSettleAccounts = false;
    this.restoreGameInitStatus(); // 重置数据状态
    this.startBtnNode.setMode(StartBtnMode.Normal); // 恢复开始按钮样式状态
  }

  openPage() {
    // loading 页面，操作模版中的Dom
    if (!this._isOpenPage) {
      this._isOpenPage = true;
      statisticsMainLanguageLoad();
      cancelLoading();
    }
  }

  showTTCoinDialog() {
    LiveBridge.showTTCoinDialog({
      from: "intl_slot1",
    });
  }

  onDestroy() {
    this.startBtnNode.node.off(
      Node.EventType.TOUCH_START,
      this.startBtnClickStart,
      this
    );
    this.startBtnNode.node.off(
      Node.EventType.TOUCH_END,
      this.startBtnClickEnd,
      this
    );
    this.WheelRollNode.node.off(
      Node.EventType.TOUCH_END,
      this.startBtnClickEnd,
      this
    );
  }
}
