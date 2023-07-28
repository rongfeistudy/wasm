// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import LiveBridge from "./socket/live-bridge.umd.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Bridge from "./bridge.js";

export const locationAddQuery = (
  location: string,
  key: string,
  value: string | number
): string => {
  if (typeof location !== "string") {
    throw new Error("location is not a string");
  }
  if (key === undefined || key === null || key !== key) {
    throw new Error("query部分key请添加添加合法值");
  }
  const QUESTION_MARK = "?";
  const AND_MARK = "&";
  if (location.indexOf(QUESTION_MARK) === -1) {
    location += `${QUESTION_MARK}${encodeURIComponent(
      key
    )}=${encodeURIComponent(value)}`;
  } else {
    location += `${AND_MARK}${encodeURIComponent(key)}=${encodeURIComponent(
      value
    )}`;
  }
  return location;
};

export function convertToThousandths(num: number) {
  const numStr = `${num / 1000}`;
  // 如果不存在小数
  if (numStr.indexOf(".") < 0) {
    return `${numStr}k`;
  } else {
    return numStr.slice(0, numStr.indexOf(".") + 2) + "k";
  }
}

/**
 *
 * 获取url形式字符串的query参数, 区分于URLSearchParams
 *
 * ### Example
 * ```typescript
 * import { urlParams } from 'tantan-frontend-utils'
 * const params = urlParams('http://live-web.tantanapp.com/page?sid=5f63596bf4e92b1b85d1b120&type=person')
 * // => { sid: '5f63596bf4e92b1b85d1b120', type: 'person' }
 * ```
 *
 * @param url 解析参数的字符串, 若存在?, 首个?往后字符串视为search, 若不存在?, 整个字符串视为search
 */
export function urlParams(url = window.location.search): {
  [proName: string]: string;
} {
  let match;
  const pl = /\+/g; // 正则替换了+号为空格
  const search = /([^&=]+)=?([^&]*)/g;
  const decode = (s: string) => {
    return decodeURIComponent(s.replace(pl, " "));
  };
  const rm = url.slice(url.indexOf("?") + 1);
  const obj: { [protoName: string]: string } = {};
  while ((match = search.exec(rm))) {
    obj[decode(match[1])] = decode(match[2]);
  }
  return obj;
}

const ua = navigator.userAgent.toLowerCase();

export const isInApp =
  ua.includes("tantan-android") || ua.includes("tantan-ios");

let roomConfig: any;
export async function handleGetRoomConfig() {
  if (roomConfig) return roomConfig;
  roomConfig = await LiveBridge.getRoomConfig();
  return roomConfig;
}

export function getStrByteLength(str: string) {
  let strlen = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255)
      //如果是汉字，则字符串长度加2
      strlen += 2;
    else strlen++;
  }
  return strlen;
}

// 处理字符串为指定长度加省略号
export function stringAddEllipsis(str: string, maxLen: number) {
  const strlen = getStrByteLength(str);
  return strlen >= maxLen ? str.slice(0, maxLen) + "..." : str;
}

/**
 * 格式化时间 dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
 * @example
 * @param fmt
 * @param date
 * @returns
 */
export function dateFormat(fmt: string, date: Date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };

  for (const k in opt) {
    if (Object.prototype.hasOwnProperty.call(opt, k)) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
        );
      }
    }
  }
  return fmt;
}

export function cancelLoading() {
  const loadingContainer = document.querySelector("#loadingContainer");
  if (loadingContainer)
    (loadingContainer as HTMLDivElement).style.display = "none";
  const gameSection = document.querySelector("#gameSection");
  if (gameSection) (gameSection as HTMLElement).style.overflow = "visible";
}

export function toMillimeter(num: number | string) {
  const re = /(?=(?!(\b))(\d{3})+$)/g;
  return String(num).replace(re, ",");
}

// 统计 App 部分运营位到H5页面的转化率打点
const SOURCES = [
  "videoLT",
  "videoRB",
  "voiceRB",
  "voiceRBSmall",
  "videoRBOrVoiceRB",
];
export function statisticsMain() {
  // 过滤掉非第一次
  if (sessionStorage.getItem("_isFirstEntry")) return;
  sessionStorage.setItem("_isFirstEntry", "1");

  const { _source, _offline, campaign_type } = urlParams() as any;
  if (SOURCES.indexOf(_source) > -1) {
    Bridge.trackNew({
      pageId: "p_main_page_pv",
      type: "PV",
      extras: {
        source: _source,
        offline: _offline ?? "0",
        campaign_type: campaign_type ?? "unknow",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        load_scene_need_time: Date.now() - window.initProjectTime,
      },
    });
  }
}

export function statisticsMainLanguageLoad() {
  const { _source, _offline, campaign_type } = urlParams() as any;
  if (SOURCES.indexOf(_source) > -1) {
    Bridge.trackNew({
      pageId: "p_main_page_init_language_pv",
      type: "PV",
      extras: {
        source: _source,
        offline: _offline ?? "0",
        campaign_type: campaign_type ?? "unknow",
      },
    });
  }
}

// export function testPerformance(Fn: () => void) {
//   const startTime = performance.now()
//   for (let index = 0; index < 1000000000; index++) {
//     Fn()
//   }
//   console.log('endTime', performance.now() - startTime)
// }

// export function testPerformance1(Fn: () => void) {
//   const startTime = performance.now()
//   for (let index = 0; index < 1000000000; index++) {
//     Fn()
//   }
//   console.log('endTime1', performance.now() - startTime)
// }

// export function testPerformance2(Fn: () => void) {
//   const startTime = performance.now()
//   for (let index = 0; index < 1000000000; index++) {
//     Fn()
//   }
//   console.log('endTime2', performance.now() - startTime)
// }
