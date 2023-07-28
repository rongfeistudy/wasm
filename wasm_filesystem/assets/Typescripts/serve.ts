import { defHttp } from "./utils/index";
import type { Result } from "./types/axios";

// 投注
export type BetArgT = {
  anchorId: string;
  betNum: number;
  liveMode: string;
  liveType: string;
};

export type BetResultT = {
  wheelResult: number[];
  drawResult: string; // 抽奖结果，分为A3、A2、A1、B3、C3、D3、E3、F3和None
  extraGameResult?: number; // extra game结果，仅有A3时展示，不为a3时为-1
  coinNum?: number;
  deductBalance: number;
  balance: number;
  dailyRevenue: number; // 当日收益(ttc)
  newbee: boolean;
  newbeeFreeDraw?: number;
};

export function postBet(betArg: BetArgT): Promise<Result<BetResultT>> {
  return defHttp.post({
    url: "/v2/live/tasty-party/draw",
    data: { ...betArg },
    headers: { "Content-Type": "application/json" },
  });
}

export type betConfigT = { betNum: number; jackpotNum: number };
// 获取投注档位奖池信息信息
export type BetResT = {
  newbee: boolean; // 新用户
  newbeeFreeDraw: 1; // 1 or 0
  dailyRevenue: 0; // 当日总收益ttc
  betConfig: betConfigT[];
};

export function getBetConfig(): Promise<Result<BetResT>> {
  return defHttp.get({ url: `/v2/live/tasty-party/detail` });
}

// 用户余额度
// export type BalanceT = { balance: number }

// export function getBalance(): Promise<Result<BalanceT>> {
//   return defHttp.get({ url: `/v2/live/tasty-party/balance` })
// }

// 下注记录
export type RecordItemI = {
  betNum: number; // 投注档位
  createdTime: string; // 抽奖时间
  winResult: string; // 中奖结果
  coinNum?: number; // 中奖金额，仅在中奖时返回，可选
};
export type RecordT = {
  records: RecordItemI[];
};
export function getUserRecords(): Promise<Result<RecordT>> {
  return defHttp.get({ url: `/v2/live/tasty-party/records` });
}
