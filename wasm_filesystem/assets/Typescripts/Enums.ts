export enum AudioEnum {
  'WhellRollEnd',
  'Win',
  'TurnTableRoll',
  'TurnTableResultTip',
  'GoldCoin',
  'TurnOnSpeedMode'
}

export enum EnvEnum {
  'dev' = 'development',
  'devStaging' = 'devStaging',
  'staging' = 'staging',
  'pro' = 'production'
}

export enum RoomTypeEnum {
  'video' = 'video',
  'voice' = 'voice'
}

export enum LanguageType {
  'zh-Hans' = 'tantan-h5-zh',
  'en' = 'tantan-h5-en-US',
  'id' = 'tantan-h5-id-ID',
  'zh-Hant' = 'tantan-h5-zh-TW',
  'ja' = 'tantan-h5-ja',
  'ko' = 'tantan-h5-ko',
  'th' = 'tantan-h5-th-TH',
  'vi' = 'tantan-h5-vi-VN',
  'tr-TR' = 'tantan-h5-tr-TR'
}

// 正常模式和暴击模式
export enum ModeType {
  'Normal' = 'mormal',
  'Rush' = 'rush'
}

// 正常模式和自动模式
export enum GameModeType {
  'Normal' = 'mormal',
  'Automatic' = 'automatic'
}

// 正常模式和自动模式
export enum StartBtnMode {
  'Normal' = 'mormal',
  'Automatic' = 'automatic',
  'GameIn' = 'GameIn'
}

// 开始按钮状态
export enum StartBtnStatus {
  'Disabled' = 'disabled',
  'Normal' = 'normal',
  'Press' = 'Press'
}

export enum PrizeEnum {
  'A', //披萨
  'B', //炸鸡
  'C', //汉堡
  'D', //榴莲
  'E', //椰子
  'F' // 山竹
}

export enum GameStep {
  'GameStart' = 'gameStart',
  'GameIn' = 'gameIn',
  'Settlement' = 'Settlement',
  'ExtraGame' = 'ExtraGame'
}

export enum DrawResult {
  'A3' = 'A3',
  'A2' = 'A2',
  'A1' = 'A1',
  'B3' = 'B3',
  'C3' = 'C3',
  'D3' = 'D3',
  'E3' = 'E3',
  'F3' = 'F3',
  'None' = 'None'
}

export enum DrawResultToIndex {
  'A3',
  'A2',
  'A1',
  'B3',
  'C3',
  'D3',
  'E3',
  'F3'
}
