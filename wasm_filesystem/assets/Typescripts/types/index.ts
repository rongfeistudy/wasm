import { Vec3 } from 'cc'
import type { BetTypeEnum } from '../Enums'
export interface UserBetMes {
  userId: string
  userAvatar: string
  betResult: number
}

export interface BetRecordI {
  betType: BetTypeEnum
  betUnit: number
  betUnitNum: number
}

export interface AreaItem {
  leftTop: { x: number; y: number }
  rightBottom: { x: number; y: number }
  position: Vec3
}

export interface UserMes {
  userId: string
  userAvatar: string
  betResult: number
}

export interface BetDistributeI {
  userId: number
  bet: BetRecordI[]
}

export interface lastRoundTopUserI {
  topN: UserMes[]
  others: number
  me: number
}

export interface CardResultI {
  dragon: string
  tiger: string
  betType: BetTypeEnum
}

export type EnvType = 'dev' | 'staging' | 'prod'

export interface RecordDetailI {
  betType: string
  betNum: number
  winNum: number
}

export interface userBetRecordI {
  [userId: string]: { [betTypeBetUnit: string]: number }
}
