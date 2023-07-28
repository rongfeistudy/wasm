import { defHttp } from './http/request'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Bridge from './bridge.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import LiveBridge from './socket/live-bridge.umd.js'

const userInfoPromise = Bridge.getUserInfo()

const systemInfoPromise = Bridge.getSystemInfo()

const intelConfigPromise = LiveBridge.getIntlConfig()

const actUrl = 'newSlot'

export function sendDingTalkApi({ users, err, ...rest }: { users: string[]; err: string; [protoName: string]: string | string[] }) {
  Promise.all([userInfoPromise, systemInfoPromise, intelConfigPromise]).then(res => {
    const [userInfo, systemInfo, intelConfigInfo] = res

    const systemPart = {
      os: systemInfo?.os,
      osVersion: systemInfo?.osVersion,
      appVersion: systemInfo?.appVersion,
      sdkVersion: systemInfo?.sdkVersion,
      brand: systemInfo?.brand,
      model: systemInfo?.model
    }

    const happenTime = new Date()
    const messageContent = {
      title: '报警',
      happenTime: happenTime.getTime(),
      robot: 'robot1',
      userId: userInfo?.userId,
      userName: userInfo?.userName,
      regionTag: intelConfigInfo?.liveRegionTag,
      systemInfo: systemPart,
      url: actUrl,
      atStaff: users,
      extra: {
        happenTime: happenTime.toLocaleString('zh-cn'),
        err,
        ...rest
      }
    }

    defHttp.post({
      url: '/v2/h5Message/dingDing',
      data: messageContent
    })
  })
}
