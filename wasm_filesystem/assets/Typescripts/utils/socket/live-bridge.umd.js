;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('../bridge')) : typeof define === 'function' && define.amd ? define(['exports', '@tantan/tantan-js-bridge'], factory) : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self), factory((global.bridgeMap = {}), global.tt))
})(this, function (exports, tt) {
  'use strict'

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : { default: e }
  }

  var tt__default = /*#__PURE__*/ _interopDefaultLegacy(tt)

  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

  var __assign = function () {
    __assign =
      Object.assign ||
      function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }

  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }

  function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (((f = 1), y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)) return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }

  var ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : ''
  var isAndroid = ~ua.indexOf('android')
  var isiOS = ~ua.indexOf('iphone') || ua === 'tantan-ios' || /iphone|ios/.test(ua)
  /**
   * 判断method方法是否可用
   * @param method 方法名
   */
  // export const canIUse = (method: string): boolean => {
  //     if (!method || typeof method !== 'string') {
  //         console.error('invalid param method!');
  //         return false;
  //     }
  //     if (isiOS) {
  //         return ios_method_checker(method);
  //     }
  //     if (isAndroid) {
  //         return androidMethodAccessible(method);
  //     }
  //     return false;
  // }
  // export const methodCheckerOld = (methodName: string, param: {reporter?: any}) => {
  //     if(process.env.NODE_ENV !== 'production') {
  //         console.log('========================')
  //         console.info('method ', methodName, ' is being called')
  //         console.info('param:')
  //         console.info(param)
  //         console.log('========================')
  //     }
  //     if (!canIUseOld(methodName)) {
  //         const warningText = `method=>${methodName} is not supported in your app version`;
  //         if (param && typeof param.reporter === 'function' || typeof window['liveBridgeErrorReporter'] === 'function') {
  //             const reporter = window['liveBridgeErrorReporter'] || param.reporter;
  //             reporter(warningText);
  //         }
  //         console.log(`%c${warningText}`, "color: #ffffff;background: #bd3d27;font-weight: 600;font-size: 20px");
  //         return !1;
  //     }
  //     return !0;
  // }
  var methodChecker = function (methodName, param) {
    // if (process.env.NODE_ENV !== 'production') {
    //   console.log('========================')
    //   console.info('method ', methodName, ' is being called')
    //   console.info('param:')
    //   console.info(param)
    //   console.log('========================')
    // }
    if (!tt.canIUse({ module: 'tantan_live', name: methodName })) {
      var warningText = 'method=>' + methodName + ' is not supported in your app version'
      if ((param && typeof param.reporter === 'function') || typeof window['liveBridgeErrorReporter'] === 'function') {
        var reporter = window['liveBridgeErrorReporter'] || param.reporter
        reporter(warningText)
      }
      console.log('%c' + warningText, 'color: #ffffff;background: #bd3d27;font-weight: 600;font-size: 20px')
      return !1
    }
    return !0
  }
  /**
   * 判断版本号是否符合要求
   * @param versionStr 待比较版本号
   * @param allowVersion 目标版本号
   */
  var compareVersion = function (versionStr, allowVersion) {
    var _a = versionStr.trim().split('.'),
      major = _a[0],
      minor = _a[1],
      patch = _a[2]
    var _b = allowVersion.split('.'),
      majorAllow = _b[0],
      minorAllow = _b[1],
      patchAllow = _b[2]
    return major > majorAllow || (major === majorAllow && minor > minorAllow) || (major === majorAllow && minor === minorAllow && patch > patchAllow) || (major === majorAllow && minor === minorAllow && patch === patchAllow)
  }
  var emptyCallBack = function (res) {
    console.log('callBack 结果为', res)
  }
  var paramUnsetConsole = function (params) {
    console.error('required param ' + params.toString() + ' is unset!')
  }
  var paramInvalidConsole = function (params) {
    console.error(params.length ? 'params: ' + params.toString() + ' are invalid!' : 'param ' + params.toString() + ' is invalid!')
  }
  var methodDeprecatedConsole = function (methodName, replaceMethodName) {
    console.log('%c' + methodName + '\u5DF2\u4E0D\u63A8\u8350\u4F7F\u7528' + (replaceMethodName ? ',\u63A8\u8350\u4F7F\u7528' + replaceMethodName : ''), 'color: #ffffff;background: #bd3d27;font-weight: 600;font-size: 20px')
  }
  function urlParams(url) {
    if (url === void 0) {
      url = window.location.search
    }
    // eslint-disable-next-line functional/no-let
    var match
    var pl = /\+/g // 正则替换了+号为空格
    var search = /([^&=]+)=?([^&]*)/g
    var decode = function (s) {
      return decodeURIComponent(s.replace(pl, ' '))
    }
    var rm = url.slice(url.indexOf('?') + 1)
    // eslint-disable-next-line functional/prefer-readonly-type
    var obj = {}
    // eslint-disable-next-line functional/no-loop-statement, no-cond-assign
    while ((match = search.exec(rm))) {
      // eslint-disable-next-line functional/immutable-data
      obj[decode(match[1])] = decode(match[2])
    }
    return obj
  }

  tt__default['default'].register('tantan_live', 'campaignController', '5.3.3', '5.3.6')
  /**
   * 直播活动控制器
   * @param
   */
  var campaignController = function (param) {
    if (!methodChecker('campaignController', param)) {
      return
    }
    var _a = param.action,
      action = _a === void 0 ? '' : _a,
      _b = param.content,
      content = _b === void 0 ? '' : _b,
      _c = param.callBack,
      callBack = _c === void 0 ? Function.prototype : _c
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'campaignController',
      restParams: {
        action: action,
        content: content,
        callBack: callBack
      }
    })
  }
  /**
   * 打开指定的scheme(该方法派生于campaignController)
   * @param param
   */
  var goToScheme = function (param) {
    var scheme = param.scheme,
      reporter = param.reporter,
      _a = param.callBack,
      callBack = _a === void 0 ? emptyCallBack : _a
    campaignController({
      action: 'scheme',
      content: scheme,
      reporter: reporter,
      callBack: callBack
    })
  }
  /**
   * 【已废弃】根据活动ID打开新的活动(该方法派生于campaignController)
   * @param param
   */
  var alertCampaign = function (param) {
    methodDeprecatedConsole('alertCampaign', 'openH5')
    var campaignId = param.campaignId,
      reporter = param.reporter,
      _a = param.callBack,
      callBack = _a === void 0 ? emptyCallBack : _a
    if (!campaignId) {
      return paramUnsetConsole(['campaignId'])
    }
    campaignController({
      action: 'alertCampaign',
      content: campaignId,
      callBack: callBack,
      reporter: reporter
    })
  }
  /**
   * 打开指定用户的用户资料卡(该方法派生于campaignController)
   * @param param
   */
  var showUserProfileCard = function (param) {
    methodDeprecatedConsole('showUserProfileCard', 'showUserCard')
    var userId = param.userId,
      reporter = param.reporter,
      _a = param.callBack,
      callBack = _a === void 0 ? emptyCallBack : _a
    campaignController({
      action: 'showUserProfileCard',
      content: userId,
      reporter: reporter,
      callBack: callBack
    })
  }
  /**
   * 直播间内打开新的H5页面(该方法派生于campaignController)
   * @param param
   */
  var openH5 = function (param) {
    var url = param.url,
      _a = param.hash,
      _b = param.hashPath,
      hashPath = _b === void 0 ? '' : _b,
      _c = param.gravity,
      gravity = _c === void 0 ? '1' : _c,
      _d = param.widthRadio,
      _e = param.widthRatio,
      widthRatio = _e === void 0 ? '1' : _e,
      _f = param.heightRatio,
      heightRatio = _f === void 0 ? '0.75' : _f,
      _g = param.needCloseBtn,
      needCloseBtn = _g === void 0 ? '0' : _g,
      _h = param.transparent,
      transparent = _h === void 0 ? '0' : _h,
      _j = param.extraQuery,
      extraQuery = _j === void 0 ? {} : _j,
      _k = param.reporter,
      reporter = _k === void 0 ? Function.prototype : _k,
      _l = param.callBack,
      callBack = _l === void 0 ? emptyCallBack : _l
    if (!url) {
      return paramUnsetConsole(['url'])
    }
    var finalUrl = url.indexOf('?') > 0 ? url + '&' : url + '?' // 暂时不处理诸如xxx.com?或者xxx.com?name=?xx之类的异常情况
    if (Object.keys(extraQuery).length) {
      Object.keys(extraQuery).forEach(function (key) {
        finalUrl += key + '=' + extraQuery[key] + '&'
      })
    }
    var hashPathTemp = ''
    if (hashPath) {
      hashPathTemp = hashPath ? '#' + (/^\//.test(hashPath) ? hashPath : '/' + hashPath) : '#/'
    }
    finalUrl = finalUrl + 'gravity=' + gravity + '&widthRatio=' + widthRatio + '&heightRatio=' + heightRatio + '&needCloseBtn=' + needCloseBtn + '&transparent=' + transparent + hashPathTemp
    campaignController({
      action: 'scheme',
      content: 'tantanapp://live/room/showH5?h5Url=' + encodeURIComponent(finalUrl),
      callBack: callBack,
      reporter: reporter
    })
  }
  /**
   * 直播间内打开礼物面板(该方法派生于campaignController)
   * @param param
   */
  var showGiftDialog = function (param) {
    var _a = param.tabIds,
      tabIds = _a === void 0 ? [] : _a,
      _b = param.callBack,
      callBack = _b === void 0 ? emptyCallBack : _b,
      reporter = param.reporter
    if (!Array.isArray(tabIds)) {
      return paramInvalidConsole(['tabIds'])
    }
    campaignController({
      action: 'scheme',
      content: 'tantanapp://live/room/showGiftDialog?tabId=' + tabIds.toString(),
      callBack: callBack,
      reporter: reporter
    })
  }
  /**
   * 直播间内打开聊聊输入框(该方法派生于campaignController)
   * @param param
   */
  var showChatInput = function (param) {
    var _a = param.chatType,
      chatType = _a === void 0 ? '1' : _a,
      content = param.content,
      _b = param.callBack,
      callBack = _b === void 0 ? emptyCallBack : _b,
      reporter = param.reporter
    if (typeof content === 'undefined') {
      return paramInvalidConsole(['content'])
    }
    campaignController({
      action: 'scheme',
      content: 'tantanapp://live/room/showChatInput?content=' + content + '&chatType=' + chatType,
      callBack: callBack,
      reporter: reporter
    })
  }
  /**
   * 跳转直播圈榜单
   * @param param
   */
  var showLiveRankPage = function (param) {
    var reporter = param.reporter
    campaignController({
      action: 'showLiveRankPage',
      content: '',
      reporter: reporter
    })
  }
  function openHalfPage(path, params) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, appVersion, needCloseBtn, opt, _b, anchorId, isAnchor, str, url
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            return [4 /*yield*/, tt.getSystemInfo()]
          case 1:
            ;(_a = _c.sent().appVersion), (appVersion = _a === void 0 ? '' : _a)
            needCloseBtn = isiOS ? (compareVersion(appVersion, '4.3.2') ? '0' : 'true') : '0'
            opt = {
              gravity: '1',
              widthRatio: '1.0',
              heightRatio: '0.75',
              needCloseBtn: needCloseBtn
            }
            ;(_b = urlParams()), (anchorId = _b.anchorId), (isAnchor = _b.isAnchor)
            anchorId && Object.assign(opt, { anchorId: anchorId })
            isAnchor && Object.assign(opt, { isAnchor: isAnchor })
            params && Object.assign(opt, params)
            str = Object.entries(opt)
              .map(function (_a) {
                var k = _a[0],
                  v = _a[1]
                return encodeURIComponent(k) + '=' + encodeURIComponent(v)
              })
              .join('&')
            url = '' + (path.includes('http') ? '' : window.location.origin) + path + '?' + str
            tt.triggerAction({
              module: 'tantan_live',
              actionType: 'campaignController',
              restParams: {
                action: 'scheme',
                content: 'tantanapp://live/room/showH5?h5Url=' + encodeURIComponent(url),
                callBack: function () {}
              }
            })
            return [2 /*return*/]
        }
      })
    })
  }

  tt__default['default'].register('tantan_live', 'closeLiveCampaignDialog', '5.3.3', '5.3.6')
  /**
   * 直播环境内的webview关闭方法(仅能用于关闭从底部划出or居中展示的弹窗类webview)
   * @param param
   */
  var closeLiveCampaignDialog = function (param) {
    if (!methodChecker('closeLiveCampaignDialog', param || {})) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'closeLiveCampaignDialog',
      restParams: {}
    })
  }

  tt__default['default'].register('tantan_live', 'closeOperationWebview', '5.3.3', '5.3.6')
  /**
   * 用于关闭运营位2期的抽屉类webview
   */
  var closeOperationWebview = function (param) {
    if (!methodChecker('closeOperationWebview', param || {})) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'closeOperationWebview',
      restParams: {}
    })
  }

  tt__default['default'].register('tantan_live', 'fanBaseController', '5.3.3', '5.3.6')
  /**
   * since 4.3.1安卓
   * @param param
   */
  var fanBaseController = function (param) {
    if (!methodChecker('fanBaseController', param)) {
      return
    }
    var _a = param.action,
      action = _a === void 0 ? '' : _a,
      _b = param.content,
      content = _b === void 0 ? '' : _b,
      _c = param.callBack,
      callBack = _c === void 0 ? Function.prototype : _c
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'fanBaseController',
      restParams: {
        action: action,
        content: JSON.stringify(content),
        callback: callBack
      }
    })
  }
  var joinFanBase = function (param) {
    var userId = param.userId,
      anchorId = param.anchorId,
      reporter = param.reporter,
      _a = param.callBack,
      callBack = _a === void 0 ? emptyCallBack : _a
    if (!userId || !anchorId) {
      return paramUnsetConsole(['userId', 'anchorId'])
    }
    fanBaseController({
      action: 'joinFanBase',
      content: { userId: userId, anchorId: anchorId },
      reporter: reporter,
      callBack: callBack
    })
  }

  tt__default['default'].register('tantan_live', 'follow', '5.3.3', '5.3.6')
  /**
   *
   * @param params
   */
  function follow(params) {
    if (!methodChecker('follow', params)) {
      return
    }
    var _a = params.otherUid,
      otherUid = _a === void 0 ? '' : _a,
      _b = params.source,
      source = _b === void 0 ? '' : _b,
      _c = params.liveId,
      liveId = _c === void 0 ? '' : _c,
      _d = params.success,
      success = _d === void 0 ? Function.prototype : _d,
      _e = params.fail,
      fail = _e === void 0 ? Function.prototype : _e,
      _f = params.isFollow,
      isFollow = _f === void 0 ? true : _f
    if (!otherUid) {
      return paramUnsetConsole(['otherUid'])
    }
    var restParams = {
      otherUid: otherUid,
      source: source,
      liveId: liveId,
      success: success,
      fail: fail,
      isFollow: isFollow
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'follow',
      restParams: restParams
    })
  }

  tt__default['default'].register('tantan_live', 'getIntlConfig', '5.3.3', '5.3.6')
  /**
   * 获取国际化直播相关配置(大区信息等)
   * @param param
   */
  var getIntlConfig = function (param) {
    if (!methodChecker('getIntlConfig', param || {})) {
      //   if (process.env.NODE_ENV === 'development') {
      //     return Promise.resolve({
      //       liveRegionTag: 'mainland'
      //     })
      //   }
      return Promise.reject('method not support')
    }
    if (tt__default['default'].is_mk) {
      return new Promise(function (resolve) {
        tt.triggerAction({
          module: 'tantan_live',
          actionType: 'getIntlConfig',
          restParams: {
            success: function (res) {
              resolve(JSON.parse(res))
            }
          }
        })
      })
    }
    if (isAndroid) {
      var res = tt.triggerAction({
        actionType: 'getIntlConfig'
      })
      return Promise.resolve(res ? JSON.parse(res) : {})
    }
    if (isiOS) {
      return new Promise(function (resolve) {
        tt.triggerAction({
          actionType: 'getIntlConfig',
          restParams: {
            success: function (res) {
              resolve(JSON.parse(res))
            }
          }
        })
      })
    }
    return Promise.reject()
  }

  tt__default['default'].register('tantan_live', 'getRoomConfig', '5.3.3', '5.3.6')
  /** 获取直播间信息 */
  var getRoomConfig = function (param) {
    if (!methodChecker('getRoomConfig', param || {})) {
      //   if (process.env.NODE_ENV === 'development') {
      //     return Promise.resolve({
      //       anchorId: 'unknown',
      //       roomId: 'unknown',
      //       liveId: 'unknown',
      //       roomType: 'unknown',
      //       fanBaseId: 'unknown',
      //       fakeId: 'unknown',
      //       liveMode: 'normal'
      //     })
      //   }
      return Promise.reject('method not support')
    }
    return new Promise(function (resolve) {
      var defaultConfig = {
        anchorId: '-1',
        fakeId: '',
        roomId: '',
        liveId: ''
      }
      // 设置一个最大300ms的等待延时,如果超过该时间，则默认为非直播间环境(用于兼容旧版本客户端直播间外调用getRoomConfig不执行callback方法导致promise一直pending的问题)
      var timeoutId = window.setTimeout(function () {
        return resolve(defaultConfig)
      }, 300)
      tt.triggerAction({
        module: 'tantan_live',
        actionType: 'getRoomConfig',
        restParams: {
          callback: function (res) {
            console.log(res)
            try {
              clearTimeout(timeoutId)
              var parsed = JSON.parse(res)
              if (Object.keys(parsed).length === 0) {
                // 如果客户端回调里返回的是空的JSON对象,则说明在直播间外,直接resolve默认的config
                resolve(defaultConfig)
                return
              }
              resolve(
                __assign(__assign({}, parsed), {
                  fakeId: parsed.fakeId === '0' ? '' : parsed.fakeId // 兼容安卓端fakeId可能是字符串0的问题
                })
              )
            } catch (e) {
              resolve(defaultConfig)
            }
          }
        }
      })
    })
  }

  tt__default['default'].register('tantan_live', 'jumpRecharge', '5.3.3', '5.3.6')
  /**
   * 打开直播房间的充值面板
   * 该方法在客户端存在一个可以携带successHandler参数的重载
   * 有successHandler的，打开webview页面(全屏铺满) 不推荐使用
   * 推荐使用不带参数的(功能上一模一样)
   * @param param
   */
  var jumpRecharge = function (param) {
    if (!methodChecker('jumpRecharge', param || {})) {
      return
    }
    var rest = {}
    if (param) {
      var successHandler = param.successHandler
      rest.successHandler = successHandler
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'jumpRecharge',
      restParams: rest
    })
  }

  tt__default['default'].register('tantan_live', 'jumpToCover', '5.3.3', '5.3.6')
  /**
   * 跳转自己的封面
   * @param param
   */
  var jumpToCover = function (param) {
    if (!methodChecker('jumpToCover', param || {})) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'jumpToCover',
      restParams: {}
    })
  }

  tt__default['default'].register('tantan_live', 'jumpToLiveAnchor', '5.3.3', '5.3.6')
  /** h5跳到开播页，并结束当前h5页(安卓) */
  var jumpToLiveAnchor = function (param) {
    if (!methodChecker('jumpToLiveAnchor', param || {})) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'jumpToLiveAnchor',
      restParams: {}
    })
  }

  tt__default['default'].register('tantan_live', 'jumpToPreviewPage', '5.3.3', '5.3.6')
  // 与jumpToLiveAnchor一样，用jumpToLiveAnchor代替该方法
  /** Since 3.6 H5页面可以通过调用这个方法，让客户端进入预览页面，结束当前h5页 */
  /** 2021-07*/
  var jumpToPreviewPage = function (param) {
    var _a
    var type = (_a = param === null || param === void 0 ? void 0 : param.type) !== null && _a !== void 0 ? _a : 'video'
    var fnName = type === 'video' ? 'jumpToPreviewPage' : 'jumpToPreviewVoiceRoom'
    if (!methodChecker(fnName, param || {})) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: fnName,
      restParams: {}
    })
  }

  tt__default['default'].register('tantan_live', 'jumpToProfile', '5.3.3', '5.3.6')
  /** 跳到userId的个人资料页*/
  var jumpToProfile = function (param) {
    if (!methodChecker('jumpToProfile', param)) {
      return
    }
    var userId = param.userId,
      _a = param.from,
      from = _a === void 0 ? 'unknown' : _a,
      type = param.type
    var obj = isiOS ? { userId: userId, from: from, type: type } : { userId: userId, from: from }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'jumpToProfile',
      restParams: obj
    })
  }

  tt__default['default'].register('tantan_live', 'jumpToRoom', '5.3.3', '5.3.6')
  tt__default['default'].register('tantan_live', 'jumpToVoiceRoom', '5.3.3', '5.3.6')
  /**
   * 跳转至直播间
   */
  var jumpToRoom = function (params) {
    var _a = params.liveId,
      liveId = _a === void 0 ? '' : _a,
      _b = params.source,
      source = _b === void 0 ? '' : _b,
      _c = params.type,
      type = _c === void 0 ? 'video' : _c
    var fnName = 'jumpToVoiceRoom'
    var restParams = {
      liveId: liveId,
      source: source
    }
    if ('roomId' in params && type === 'video') {
      fnName = 'jumpToRoom'
      restParams = {
        liveId: liveId,
        roomId: params.roomId,
        source: source
      }
    }
    if (!methodChecker(fnName, params)) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: fnName,
      restParams: restParams
    })
  }

  tt__default['default'].register('tantan_live', 'liveGiftDialogController', '5.3.3', '5.3.6')
  var liveGiftDialogController = function (params) {
    return __awaiter(void 0, void 0, void 0, function () {
      var _a, appVersion, _b, type, _c, content, _d, callBack, contentParam, giftId, _e, traceActivityName, _f, traceModule, _g, giftCount, _h, showSendGiftConfirmDialogFlag, _j, userId, giftId
      return __generator(this, function (_k) {
        switch (_k.label) {
          case 0:
            if (!methodChecker('liveGiftDialogController', params)) {
              return [2 /*return*/, Promise.reject('method not support')]
            }
            return [4 /*yield*/, tt.getSystemInfo()]
          case 1:
            ;(_a = _k.sent().appVersion), (appVersion = _a === void 0 ? '' : _a)
            ;(_b = params.type), (type = _b === void 0 ? 'sendGift' : _b), (_c = params.content), (content = _c === void 0 ? '' : _c), (_d = params.callBack), (callBack = _d === void 0 ? Function.prototype : _d)
            // cyb 2020-06-08 若当前版本ios大于等于4.0.8, android大于等于4.0.9且type为sendGift，则需要使用新参数格式的liveGiftDialogController方法，参数格式沿用老的方法时需做兼容处理
            if (type === 'sendGift') {
              contentParam = void 0
              if ((isiOS && compareVersion(appVersion, '4.0.8')) || (isAndroid && compareVersion(appVersion, '4.0.9'))) {
                if (typeof content !== 'object') {
                  // 兼容大于目标版本传入非对象参数的情况
                  console.info('当前版本content需为对象类型')
                  contentParam = {
                    giftId: content,
                    traceActivityName: '',
                    traceModule: 'main'
                  }
                } else {
                  // 大于等于4.0.8版本正常参数的情况
                  ;(giftId = content.giftId),
                    (_e = content.traceActivityName),
                    (traceActivityName = _e === void 0 ? '' : _e),
                    (_f = content.traceModule),
                    (traceModule = _f === void 0 ? 'main' : _f),
                    (_g = content.giftCount),
                    (giftCount = _g === void 0 ? 1 : _g),
                    (_h = content.showSendGiftConfirmDialogFlag),
                    (showSendGiftConfirmDialogFlag = _h === void 0 ? '1' : _h),
                    (_j = content.userId),
                    (userId = _j === void 0 ? '' : _j)
                  contentParam = {
                    giftId: giftId,
                    traceActivityName: traceActivityName,
                    traceModule: traceModule,
                    giftCount: giftCount,
                    showSendGiftConfirmDialogFlag: showSendGiftConfirmDialogFlag,
                    userId: userId
                  }
                }
                return [
                  2 /*return*/,
                  tt.triggerAction({
                    module: 'tantan_live',
                    actionType: 'liveGiftDialogController',
                    restParams: {
                      type: type,
                      content: isAndroid ? JSON.stringify(contentParam) : contentParam,
                      callBack: callBack
                    }
                  })
                ]
              } else {
                contentParam = content
                if (typeof content === 'object') {
                  // 兼容小于4.0.8版本传入新版本参数的情况
                  giftId = content.giftId
                  contentParam = giftId
                }
                return [
                  2 /*return*/,
                  tt.triggerAction({
                    module: 'tantan_live',
                    actionType: 'liveGiftDialogController',
                    restParams: {
                      type: type,
                      content: contentParam,
                      callBack: callBack
                    }
                  })
                ]
              }
            }
            tt.triggerAction({
              module: 'tantan_live',
              actionType: 'liveGiftDialogController',
              restParams: {
                type: type,
                content: content,
                callBack: callBack
              }
            })
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 送礼
   * @param params
   */
  var sendGift = function (params) {
    var giftId = params.giftId,
      _a = params.giftCount,
      giftCount = _a === void 0 ? 1 : _a,
      _b = params.traceActivityName,
      traceActivityName = _b === void 0 ? '' : _b,
      _c = params.traceModule,
      traceModule = _c === void 0 ? 'main' : _c,
      _d = params.showSendGiftConfirmDialogFlag,
      showSendGiftConfirmDialogFlag = _d === void 0 ? '1' : _d,
      callBack = params.callBack,
      reporter = params.reporter,
      _e = params.userId,
      userId = _e === void 0 ? '' : _e
    liveGiftDialogController({
      type: 'sendGift',
      content: {
        giftId: giftId,
        giftCount: giftCount,
        traceActivityName: traceActivityName,
        traceModule: traceModule,
        showSendGiftConfirmDialogFlag: showSendGiftConfirmDialogFlag,
        userId: userId
      },
      callBack: callBack,
      reporter: reporter
    })
  }
  /**
   * 打开快捷充值面板
   * @param params
   */
  var showFastRecharge = function (params) {
    liveGiftDialogController(__assign({ type: 'showFastRecharge' }, params))
  }
  /**
   * 关闭礼物栏上方的皮肤webview
   */
  var closeSkinWebview = function () {
    liveGiftDialogController({
      type: 'closeH5Skin'
    })
  }

  tt__default['default'].register('tantan_live', 'liveNewUserRedPacketController', '5.3.3', '5.3.6')
  /**
   * 新用户红包用来获取红包状态和倒计时
   * @param param
   * 4.0.0
   */
  var liveNewUserRedPacketController = function (param) {
    if (!methodChecker('liveNewUserRedPacketController', param)) {
      return
    }
    var _a = param.type,
      type = _a === void 0 ? '' : _a,
      _b = param.content,
      content = _b === void 0 ? '' : _b,
      _c = param.callBack,
      callBack = _c === void 0 ? Function.prototype : _c
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'liveNewUserRedPacketController',
      restParams: {
        type: type,
        content: content,
        callBack: callBack
      }
    })
  }

  tt__default['default'].register('tantan_live', 'nativeDialogController', '5.3.3', '5.3.6')
  /**
   * since 4.3.1
   * @param param
   */
  var nativeDialogController = function (param) {
    if (!methodChecker('nativeDialogController', param)) {
      return
    }
    var _a = param.action,
      action = _a === void 0 ? '' : _a,
      _b = param.jsDialogConfig,
      jsDialogConfig = _b === void 0 ? '' : _b
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'nativeDialogController',
      restParams: {
        action: action,
        jsDialogConfig: jsDialogConfig
      }
    })
  }
  /**
   * 指定配置并打开原生弹窗
   * @param param
   */
  var showNativeDialog = function (param) {
    var name = param.name,
      canCloseDialogTouchOutSide = param.canCloseDialogTouchOutSide,
      _a = param.types,
      types = _a === void 0 ? [] : _a,
      reporter = param.reporter
    if (!name || !types.length) {
      return paramUnsetConsole(['name', 'types'])
    }
    var paramCopy = {
      name: name,
      canCloseDialogTouchOutSide: canCloseDialogTouchOutSide,
      types: types.map(function (item, index) {
        var salt = Math.ceil(Math.random() * 1000)
        window['nativeDialogController_' + param.name + '_' + salt + '_' + index] = item.callback || Function.prototype
        return __assign(__assign({}, item), { callback: 'nativeDialogController_' + param.name + '_' + salt + '_' + index })
      })
    }
    nativeDialogController({
      action: 'show',
      jsDialogConfig: JSON.stringify(paramCopy),
      reporter: reporter
    })
  }
  var closeNativeDialog = function (param) {
    var dialogName = param.dialogName
    if (!dialogName) {
      return paramUnsetConsole(['dialogName'])
    }
    nativeDialogController({
      action: 'dismiss',
      jsDialogConfig: dialogName
    })
  }

  /**
   * [该方法已废弃]
   * 红包打开后的 js 回调 客户端用来重新请求一次红包接口（右上角红包 icon），刷新红包
   */
  var onRedPacketOpen = function (param) {
    if (!methodChecker('onRedPacketOpen', param)) {
      return
    }
    var _a = param.isMarqueeRedPacket,
      isMarqueeRedPacket = _a === void 0 ? false : _a
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'onRedPacketOpen',
      restParams: {
        isMarqueeRedPacket: isMarqueeRedPacket
      }
    })
  }

  tt__default['default'].register('tantan_live', 'onTeenModeEnable', '5.3.3', '5.3.6')
  /**
   * 开关青少年模式
   */
  var onTeenModeEnable = function (param) {
    if (!methodChecker('onTeenModeEnable', param)) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'onTeenModeEnable',
      restParams: {
        enable: param.enable
      }
    })
  }

  tt__default['default'].register('tantan_live', 'refreshGuildAuth', '5.3.3', '5.3.6')
  /**
   * H5页面的主播公会认证通过后，会回调此方法让客户端刷新认证信息并关闭
   */
  var refreshGuildAuth = function (param) {
    if (!methodChecker('refreshGuildAuth', param || {})) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'refreshGuildAuth',
      restParams: {}
    })
  }

  tt__default['default'].register('tantan_live', 'refreshLiveAuth', '5.3.3', '5.3.6')
  /**
   * H5页面的主播认证通过后，会回调此方法让客户端刷新认证信息，若认证通过则跳转到开播预览页
   */
  var refreshLiveAuth = function (param) {
    if (!methodChecker('refreshLiveAuth', param || {})) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'refreshLiveAuth',
      restParams: {}
    })
  }

  tt__default['default'].register('tantan_live', 'sendChatMessage', '5.3.3', '5.3.6')
  /**
   * since 4.3.1
   * 发送聊聊消息
   */
  var sendChatMessage = function (param) {
    if (!methodChecker('sendChatMessage', param)) {
      return
    }
    var type = param.type,
      content = param.content
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'sendChatMessage',
      restParams: {
        type: type,
        content: content
      }
    })
  }

  tt__default['default'].register('tantan_live', 'showRechargeDialog', '5.3.3', '5.3.6')
  /**
   * 调起充值面板
   */
  var showRechargeDialog = function (param) {
    if (!methodChecker('showRechargeDialog', param || {})) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'showRechargeDialog',
      restParams: {}
    })
  }

  tt__default['default'].register('tantan_live', 'showTTCoinDialog', '5.3.3', '5.3.6')
  /**
   * 公共方法since 4.2.9
   * 弹出探探公共的充值面板
   */
  var showTTCoinDialog = function (param) {
    if (!methodChecker('showTTCoinDialog', param || {})) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'showTTCoinDialog',
      restParams: {
        from: (param === null || param === void 0 ? void 0 : param.from) || 'unknown'
      }
    })
  }

  /**
   * 订阅
   */
  var subscribeCampaign = function (params) {
    console.error('This method is DEPRECATED!!! Use @tantan/websocket instead')
    if (!methodChecker('subscribeCampaign', params)) {
      return
    }
    var _a = params.subscribeType,
      subscribeType = _a === void 0 ? 'test' : _a,
      _b = params.successHandler,
      successHandler = _b === void 0 ? Function.prototype : _b,
      _c = params.subscribeHandler,
      subscribeHandler = _c === void 0 ? Function.prototype : _c
    tt.triggerAction({
      actionType: 'subscribeCampaign',
      restParams: {
        subscribeType: subscribeType,
        successHandler: successHandler,
        subscribeHandler: subscribeHandler
      }
    })
  }

  tt__default['default'].register('tantan_live', 'userCardController', '5.3.3', '5.3.6')
  /**
   * since 4.3.1
   * 用于展示资料卡
   * @param param
   */
  var userCardController = function (param) {
    if (!methodChecker('userCardController', param)) {
      return
    }
    var _a = param.action,
      action = _a === void 0 ? '' : _a,
      _b = param.content,
      content = _b === void 0 ? '' : _b,
      _c = param.callBack,
      callBack = _c === void 0 ? Function.prototype : _c
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'userCardController',
      restParams: {
        action: action,
        content: content,
        callBack: callBack
      }
    })
  }
  /**
   * 展示用户资料卡
   * @param param
   */
  var showUserCard = function (param) {
    var userId = param.userId,
      _a = param.callBack,
      callBack = _a === void 0 ? emptyCallBack : _a,
      reporter = param.reporter
    userCardController({
      action: 'show',
      content: userId,
      callBack: callBack,
      reporter: reporter
    })
  }

  tt__default['default'].register('tantan_live', 'verifyTeenModePassword', '5.3.3', '5.3.6')
  /**
   * 验证青少年模式密码
   * @param param
   */
  var verifyTeenModePassword = function (param) {
    if (!methodChecker('verifyTeenModePassword', param)) {
      return
    }
    var verified = param.verified,
      scenes = param.scenes
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'verifyTeenModePassword',
      restParams: {
        verified: verified,
        scenes: scenes
      }
    })
  }

  tt__default['default'].register('tantan_live', 'liveNativeLog', '5.3.3', '5.3.6')
  var liveNativeLog = function (param) {
    if (!methodChecker('liveNativeLog', param)) {
      return
    }
    var keyword = param.keyword,
      extra = param.extra
    if (!param.keyword) {
      return paramUnsetConsole(['keyword'])
    }
    var keyInfo = ''
    try {
      keyInfo = JSON.stringify({ keyword: keyword, extra: extra })
    } catch (e) {
      throw e
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'liveNativeLog',
      restParams: {
        keyInfo: keyInfo
      }
    })
  }

  tt__default['default'].register('tantan_live', 'bindAlipay', '5.3.3', '5.3.6')
  /** 绑定支付宝 */
  function bindAlipay(param) {
    if (!methodChecker('bindAlipay', param || {})) {
      return Promise.reject('method bindAlipay is not supported')
    }
    var successAlipay = param.successAlipay,
      failAlipay = param.failAlipay
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'bindAlipay',
      restParams: isiOS
        ? {
            success: successAlipay,
            fail: failAlipay
          }
        : {
            successAlipay: successAlipay,
            failAlipay: failAlipay
          }
    })
  }

  /** 芝麻认证 */
  var bindZhimaAuth = function (param) {
    if (!methodChecker('bindZhimaAuth', param || {})) {
      return Promise.reject('method bindZhimaAuth is not supported')
    }
    var name = param.name,
      id = param.id,
      successZhima = param.successZhima,
      failZhima = param.failZhima
    tt.triggerAction({
      actionType: 'bindZhimaAuth',
      restParams: isiOS
        ? {
            name: name,
            id: id,
            success: successZhima,
            fail: failZhima
          }
        : {
            name: name,
            id: id,
            successZhima: successZhima,
            failZhima: failZhima
          }
    })
  }

  tt__default['default'].register('tantan_live', 'openToSchema', '5.3.3', '5.3.6')
  /**
   * H5页面的主播公会认证通过后，会回调此方法让客户端刷新认证信息并关闭
   */
  var openToSchema = function (schema) {
    if (!methodChecker('openToSchema', {})) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'openToSchema',
      restParams: {
        schema: schema
      }
    })
  }

  tt__default['default'].register('tantan_live', 'jumpIntoOfficialChannel', '5.3.3', '5.3.6')
  var jumpIntoOfficialChannel = function (param) {
    if (!methodChecker('jumpIntoOfficialChannel', param || {})) {
      return
    }
    var _a = param.liveId,
      liveId = _a === void 0 ? '' : _a,
      _b = param.channelId,
      channelId = _b === void 0 ? '' : _b,
      _c = param.module,
      module = _c === void 0 ? '' : _c
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'jumpIntoOfficialChannel',
      restParams: {
        liveId: liveId,
        channelId: channelId,
        module: module
      }
    })
  }

  /**
   * since 5.2.7(安卓) 5.2.8（IOS)
   * 订阅多人房麦位变更情况
   */
  var subscribeAudience = function (param) {
    if (!methodChecker('subscribeAudience', param || {})) {
      return
    }
    if (!param.callback) {
      return paramUnsetConsole(['callback'])
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'subscribeAudience',
      restParams: {
        callback: function (data) {
          if (data) {
            try {
              var parsed = JSON.parse(data)
              param.callback && param.callback(parsed.audienceList)
            } catch (e) {
              console.error('麦位订阅回调入参解析失败')
            }
          }
        }
      }
    })
  }

  tt__default['default'].register('tantan_live', 'imagePickerPhoto', '5.3.3', '5.3.6')
  var imagePickerPhoto = function (params) {
    if (!methodChecker('imagePickerPhoto', params || {})) {
      return
    }
    if (isiOS) {
      tt.triggerAction({
        module: 'tantan_live',
        actionType: 'imagePickerPhoto',
        restParams: params
      })
    }
  }

  tt__default['default'].register('tantan_live', 'startMessagesAct', '5.3.3', '5.3.6')
  var startMessagesAct = function (params) {
    return __awaiter(void 0, void 0, void 0, function () {
      var _a, appVersion
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4 /*yield*/, tt.getSystemInfo()]
          case 1:
            ;(_a = _b.sent().appVersion), (appVersion = _a === void 0 ? '' : _a)
            if (!methodChecker('startMessagesAct', params || {})) {
              return [2 /*return*/]
            }
            if (isiOS) {
              tt.triggerAction({
                module: 'tantan_live',
                actionType: 'startMessagesAct',
                restParams: isiOS && appVersion === '4.7.8' ? { userId: params.otherUserId } : params
              })
            }
            return [2 /*return*/]
        }
      })
    })
  }

  tt__default['default'].register('tantan_live', 'showVoteResultDialog', '5.3.3', '5.3.6')
  var showVoteResultDialog = function (params) {
    if (!methodChecker('showVoteResultDialog', params || {})) {
      return
    }
    var _a = params.voteRecordId,
      voteRecordId = _a === void 0 ? '' : _a
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'showVoteResultDialog',
      restParams: {
        voteRecordId: voteRecordId
      }
    })
  }

  tt__default['default'].register('tantan_live', 'getShootGameConfig', '5.3.3', '5.3.6')
  var getShootGameConfig = function (params) {
    if (!methodChecker('getShootGameConfig', params || {})) {
      return
    }
    var callback = params.callback
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'getShootGameConfig',
      restParams: {
        callback: callback
      }
    })
  }

  tt__default['default'].register('tantan_live', 'syncShootGameStatus', '5.3.3', '5.3.6')
  var syncShootGameStatus = function (params) {
    if (!methodChecker('syncShootGameStatus', params || {})) {
      return
    }
    var autoReceive = params.autoReceive,
      status = params.status,
      stage = params.stage,
      duration = params.duration,
      ballCount = params.ballCount
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'syncShootGameStatus',
      restParams: {
        autoReceive: autoReceive,
        status: status,
        stage: stage,
        duration: duration,
        ballCount: ballCount
      }
    })
  }

  tt__default['default'].register('tantan_live', 'jumpToPreviewVoiceRoom', '5.3.3', '5.3.6')
  // 与jumpToLiveAnchor一样，用jumpToLiveAnchor代替该方法
  /** Since 3.6 H5页面可以通过调用这个方法，让客户端进入预览页面，结束当前h5页 */
  /** 2021-07*/
  var jumpToPreviewVoiceRoom = function () {
    if (!methodChecker('jumpToPreviewVoiceRoom', {})) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'jumpToPreviewVoiceRoom',
      restParams: {}
    })
  }

  tt__default['default'].register('tantan_live', 'closeDialogWebview', '5.3.3', '5.3.6')
  var closeDialogWebview = function (param) {
    if (!methodChecker('closeDialogWebview', param || {})) {
      return
    }
    return tt.triggerAction({
      module: 'tantan_live',
      actionType: 'closeDialogWebview',
      restParams: param
    })
  }

  // Android 5.4.8, iOS 5.5.1
  tt__default['default'].register('tantan_live', 'openVoiceSharePanel', '5.4.8', '5.5.1')
  /**
   * 仅支持语音房吊起分享面板
   */
  var openVoiceSharePanel = function () {
    if (!methodChecker('openVoiceSharePanel', {})) {
      return
    }
    tt.triggerAction({
      module: 'tantan_live',
      actionType: 'openVoiceSharePanel'
    })
  }

  //   if (process.env.NODE_ENV === 'development') {
  //     // dev环境下提示
  //     console.warn('You are using live-bridge in dev environment! Some method will resolve with the default value!')
  //   }

  Object.defineProperty(exports, 'canIUse', {
    enumerable: true,
    get: function () {
      return tt.canIUse
    }
  })
  exports.alertCampaign = alertCampaign
  exports.bindAlipay = bindAlipay
  exports.bindZhimaAuth = bindZhimaAuth
  exports.campaignController = campaignController
  exports.closeDialogWebview = closeDialogWebview
  exports.closeLiveCampaignDialog = closeLiveCampaignDialog
  exports.closeNativeDialog = closeNativeDialog
  exports.closeOperationWebview = closeOperationWebview
  exports.closeSkinWebview = closeSkinWebview
  exports.fanBaseController = fanBaseController
  exports.follow = follow
  exports.getIntlConfig = getIntlConfig
  exports.getRoomConfig = getRoomConfig
  exports.getShootGameConfig = getShootGameConfig
  exports.goToScheme = goToScheme
  exports.imagePickerPhoto = imagePickerPhoto
  exports.joinFanBase = joinFanBase
  exports.jumpIntoOfficialChannel = jumpIntoOfficialChannel
  exports.jumpRecharge = jumpRecharge
  exports.jumpToCover = jumpToCover
  exports.jumpToLiveAnchor = jumpToLiveAnchor
  exports.jumpToPreviewPage = jumpToPreviewPage
  exports.jumpToPreviewVoiceRoom = jumpToPreviewVoiceRoom
  exports.jumpToProfile = jumpToProfile
  exports.jumpToRoom = jumpToRoom
  exports.liveGiftDialogController = liveGiftDialogController
  exports.liveNativeLog = liveNativeLog
  exports.liveNewUserRedPacketController = liveNewUserRedPacketController
  exports.nativeDialogController = nativeDialogController
  exports.onRedPacketOpen = onRedPacketOpen
  exports.onTeenModeEnable = onTeenModeEnable
  exports.openH5 = openH5
  exports.openHalfPage = openHalfPage
  exports.openToSchema = openToSchema
  exports.openVoiceSharePanel = openVoiceSharePanel
  exports.refreshGuildAuth = refreshGuildAuth
  exports.refreshLiveAuth = refreshLiveAuth
  exports.sendChatMessage = sendChatMessage
  exports.sendGift = sendGift
  exports.showChatInput = showChatInput
  exports.showFastRecharge = showFastRecharge
  exports.showGiftDialog = showGiftDialog
  exports.showLiveRankPage = showLiveRankPage
  exports.showNativeDialog = showNativeDialog
  exports.showRechargeDialog = showRechargeDialog
  exports.showTTCoinDialog = showTTCoinDialog
  exports.showUserCard = showUserCard
  exports.showUserProfileCard = showUserProfileCard
  exports.showVoteResultDialog = showVoteResultDialog
  exports.startMessagesAct = startMessagesAct
  exports.subscribeAudience = subscribeAudience
  exports.subscribeCampaign = subscribeCampaign
  exports.syncShootGameStatus = syncShootGameStatus
  exports.userCardController = userCardController
  exports.verifyTeenModePassword = verifyTeenModePassword

  Object.defineProperty(exports, '__esModule', { value: true })
})
