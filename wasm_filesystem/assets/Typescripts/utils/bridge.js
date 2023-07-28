;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self), factory((global.bridge = {})))
})(this, function (exports) {
  'use strict'

  /**
   * Momo Bridge
   * repository: https://git.wemomo.com/mmf/bridge
   * Syntax compatible with ES5
   * No guarantee or warranty for any other purpose of usage.

   */

  var bridgeVersion = '1.0.2-beta.2'
  var lastModified = 'Tue May 31 2022 16:29:15 GMT+0800 (中国标准时间)'
  var MKTAG$1 = '[mkbridge]'
  if (mm$2) {
    console.warn(MKTAG$1, 'mm is already exist!')
  }

  var ua$1 = window.navigator.userAgent
  var is_webview = /mo(mo|live|moGame)WebView/.test(ua$1)
  var is_ios = /(iP(ad|hone|od))|tantan-ios/.test(ua$1)
  var is_android = /[aA]ndroid/.test(ua$1)
  var version = /momoWebView\/(\d+)\.(\d+)\.?(\d+)?/.exec(ua$1) || ['', '0', '0']
  var momo_version = version[1] + '.' + version[2] + (version[3] ? '.' + version[3] : '')
  var mk_versions = /momoKit\/(\d+)\.(\d+)\.?(\d)?/.exec(ua$1) || ['', '0', '0']
  var mk_version = mk_versions[1] + '.' + mk_versions[2] + (mk_versions[3] ? '.' + mk_versions[3] : '')
  var arr_build_version = /(ios|android)\/(\d+)\(/.exec(ua$1)
  var build_version = !!arr_build_version ? arr_build_version[2] : 0
  var platform$5 = is_ios ? 'ios' : is_android ? 'android' : 'unknown'
  var query = {}
  var netWorkString = /nt\/(\w+)/gi.exec(ua$1)
  var netWorkType = netWorkString && netWorkString[1]
  var is_mk = checkMK()
  var is_tantan = /tantan/.test(ua$1) || window.tantan

  /**
   * 通过momo版本号判断版本支持
   *  e.g., mm.compare('6.2.4') >= 0 表示当前版本号高于目标版本（6.2.4）
   * @param {object|number|string} ver
   * @returns {number}
   */
  function compare$1(ver) {
    var version
    var verType = typeof ver
    if (verType == 'string' || verType == 'number') {
      version = ver + ''
    } else if (verType == 'object') {
      version = ver[platform$5]
      if (!version) {
        return -101
      }
    } else {
      console.error(MKTAG$1, 'Error Version')
      return -102
    }
    var now = momo_version.split('.')
    var tar = version.toString().split('.')
    var len = Math.max(tar.length, now.length)
    try {
      for (var i = 0; i < len; i++) {
        var l = (isFinite(now[i]) && Number(now[i])) || 0,
          r = (isFinite(tar[i]) && Number(tar[i])) || 0
        if (l < r) {
          /* 目标版本低于当前版本 */
          return -1
        } else if (l > r) {
          /* 目标版本大于当前版本 */
          return 1
        }
      }
    } catch (e) {
      return -1
    }
    /* 相等 */
    return 0
  }

  /**
   * 通过momo版本号判断版本支持
   *  e.g., mm.compareMK('1.0') >= 0 表示当前版本号高于目标版本（1.0）
   * @param {object|number|string} ver
   * @returns {number}
   */
  function compareMK(ver) {
    var version
    var verType = typeof ver
    if (verType == 'string' || verType == 'number') {
      version = ver + ''
    } else if (verType == 'object') {
      version = ver[platform$5]
      if (!version) {
        return -101
      }
    } else {
      console.error(MKTAG$1, 'Error Version')
      return -102
    }
    var now = mk_version.split('.')
    var tar = version.toString().split('.')
    var len = Math.max(tar.length, now.length)
    try {
      for (var i = 0; i < len; i++) {
        var l = (isFinite(now[i]) && Number(now[i])) || 0,
          r = (isFinite(tar[i]) && Number(tar[i])) || 0
        if (l < r) {
          /* 目标版本低于当前版本 */
          return -1
        } else if (l > r) {
          /* 目标版本大于当前版本 */
          return 1
        }
      }
    } catch (e) {
      return -1
    }
    /* 相等 */
    return 0
  }

  /**
   * 判断mk及momo客户端版本号
   * @inner
   * @param version
   * @returns {boolean}
   * @private
   */
  function _checkVer(version) {
    if (!version.sdk) return false

    if (compareMK(version.sdk) < 0) {
      if (version.momo) {
        return compare$1(version.momo) >= 0
      } else {
        return false
      }
    } else {
      return true
    }
  }

  /**
   * bridge基本方法
   * @param module bridge命名空间
   * @param name bridge名称
   * @param param bridge传参
   * @param callback bridge回调
   * @returns {string} callbackID
   */
  function commonInvoke(module, name, param, callback) {
    var callbackID = ''
    if (param) {
      try {
        var _obj = typeof param == 'string' ? JSON.parse(param) : param

        if (param.callback && typeof param.callback == 'function') {
          _obj.callback = this.createCallback(name, param.callback)
          callbackID = _obj.callback
        }

        if (callback && typeof callback == 'function' && typeof _obj.callback == 'undefined') {
          _obj.callback = this.createCallback(name, callback)
          callbackID = _obj.callback
        }
        if (typeof param.callback == 'string') {
          callbackID = param.callback
        }

        param = JSON.stringify(_obj)
      } catch (err) {
        return
      }
    }
    var invokeArr = module ? [module, name, param] : [name, param]
    prepare._adapter.invoke.apply(prepare, invokeArr)
    return callbackID
  }

  /**
   * 用于检测当前环境是否为mk
   * @returns {boolean}
   */
  function checkMK() {
    return (is_ios && compare$1('8.11.3') >= 0 && !!navigator.isMK) || /momoKit/.test(ua$1)
  }

  /**
   * bridgeHandler构建函数
   * @param callbackID
   * @constructor
   */
  function BridgeHandler(callbackID) {
    this.callbackID = callbackID
  }

  BridgeHandler.prototype.release = function () {
    this.callbackID && new Function(this.callbackID + '= null')()
  }

  try {
    location.search
      .substr(1)
      .split('&')
      .forEach(function (item) {
        item.split('=')[0] in query ? query[item.split('=')[0]].push(item.split('=')[1]) : (query[item.split('=')[0]] = [item.split('=')[1]])
      })
  } catch (err) {
    console.error(MKTAG$1, err)
  }
  var mm$2 = {
    version: bridgeVersion,
    netWorkType: netWorkType,
    last_modified: lastModified,
    is_webview: is_webview, // momo客户端或其他独立客户端
    momo_version: momo_version,
    mk_version: mk_version,
    build_version: build_version,
    platform: platform$5,
    query: query,
    bid: query._bid ? query._bid[0] : '',
    _callbacks: {},
    host: location.host,
    protocol: location.protocol,
    pathname: location.pathname,
    is_mk: is_mk,
    is_tantan: is_tantan,
    _uniqueId: 1,
    /*
      Invoke a function from the adapter
      invoke 方法，兼容mk 非mk
      */
    invoke: function (module, name, param, callback) {
      if (typeof name != 'string') {
        callback = param
        param = name
        name = module
        module = null
      }
      if (typeof param == 'function') {
        callback = param
        param = {}
      }
      if (mm$2[module] && mm$2[module][name]) {
        return mm$2[module][name](param, callback)
      }
      return new BridgeHandler(commonInvoke.apply(this, arguments))
    },

    /**
     * 提供给各模块进行bridge构建的方法
     * @param {object} obj
     *  common: ios 、android 使用同一个配置
     *  ios: iOS的配置
     *  android: android的配置
     *  version: 开始支持的版本
     *
     * @returns {BridgeHandler}
     */
    build: function (obj) {
      if (obj.hasOwnProperty('common')) {
        obj.ios = obj.common
        obj.android = obj.common
      }
      if (!obj.hasOwnProperty(platform$5)) return
      var args = obj[platform$5]
      if (obj.version && !_checkVer(obj.version)) {
        console.error(MKTAG$1, '当前版本不支持此功能，请检查升级')
        var callback = args[args.length - 1]
        if (callback && typeof callback == 'function') {
          callback({
            status: '-99',
            message: '当前版本不支持此功能，请检查升级'
          })
        }
      } else {
        return new BridgeHandler(commonInvoke.apply(this, args))
      }
    },

    /**
     * 创建callback字符串
     * @param name
     * @param callback
     * @returns {string}
     */
    createCallback: function (name, callback) {
      var callbackId = '__BRIDGE_CALLBACK__' + this._uniqueId++ + '_' + new Date().getTime()
      if (!this._callbacks.hasOwnProperty(name)) {
        this._callbacks[name] = {}
      }
      this._callbacks[name][callbackId] = function () {
        var args = Array.prototype.slice.apply(arguments)
        // 处理转义字符

        if (name != 'getItem') {
          for (var i = 0; i < args.length; i++) {
            try {
              args[i] = JSON.parse(args[i])
            } catch (err) {}
          }
        }

        callback.apply(null, args)
      }
      return 'mm._callbacks.' + name + '.' + callbackId
    },

    /**
     * 事件传递时使用，为兼容直接invoke的调用，放到mm全局
     * @param type
     * @param name
     * @param data
     * @param origin
     */
    fireDocumentEvent: function (type, name, data, origin) {
      var evt
      if (type == 'bridgeEvent') {
        name = 'be:' + name
      }

      evt = document.createEvent('Events')
      evt.initEvent(name, false, false)
      evt.name = name
      if (data) {
        try {
          evt.data = JSON.parse(data)
        } catch (err) {
          evt.data = data
        }
      }
      if (origin) {
        evt.origin = origin
      }
      document.dispatchEvent(evt)
    },
    compare: compare$1,
    compareMK: compareMK
  }
  var prepare = {
    _native_obj: null,
    _adapter: null,
    initMK: function () {
      if (is_webview && is_ios) {
        this._adapter = this.iOS_MK_Adapter()
      } else if (is_webview && is_android) {
        this._adapter = this.Android_MK_Adapter()
      } else {
        this._adapter = this.MoAdapter()
      }
    },
    /**
     * 一个空的adapter实现
     * @returns {{name: string, invoke: invoke}}
     * @constructor
     */
    MoAdapter: function () {
      return {
        name: 'basic',
        invoke: function (module, name, param) {
          console.warn(MKTAG$1, module + '.' + name + '被调用，但无法执行对应行为。看看是不是不在mk环境？')
        }
      }
    },
    mkURL: function (module, name, param) {
      /*
              mk 拼接url
              */
      module = module || ''
      name = name || ''
      param = param || '{}'

      return 'mkjsbridge://' + module + '/' + name + '?param=' + encodeURIComponent(param)
    },
    iOS_MK_Adapter: function () {
      var _this = this

      function creatIframe(url) {
        var mkfrm = document.createElement('iframe')
        mkfrm.style.display = 'none'
        mkfrm.src = url
        document.documentElement.appendChild(mkfrm)
        var returnValue = mm$2.__RETURN_VALUE
        mm$2.__RETURN_VALUE = undefined

        mkfrm.parentNode.removeChild(mkfrm)
        return returnValue
      }

      return {
        name: 'ios',
        invoke: function (module, name, param) {
          setTimeout(function () {
            creatIframe(_this.mkURL(module, name, param))
          }, 0)
        }
      }
    },
    Android_MK_Adapter: function () {
      /*
              mk android
              */
      var _this = this
      if (window.mkAobj) {
        return {
          name: 'android aobj',
          invoke: function (module, name, param) {
            module = module || ''
            name = name || ''
            param = param || '{}'
            window.mkAobj.bridgejs(module, name, param)
          }
        }
      }
      return {
        name: 'android prompt',
        invoke: function (module, name, param) {
          window.prompt(_this.mkURL(module, name, param))
        }
      }
    }
  }
  if (!mm$2.is_mk) {
    console.warn('当前环境不是mk webview?')
  }
  prepare.initMK()
  if (window) {
    window['mm'] = mm$2
  }

  var globalEvent = {
    // 增加监听事件
    addEventListener: function (param, callback) {
      if (!/^bn/.test(param.name) && !param.target) {
        param.target = '*'
      }
      mm.build({
        common: ['globalEvent', 'addEventListener', param, callback],
        version: { sdk: '1.0' }
      })
    },
    // 移除监听事件
    removeEventListener: function (param) {
      if (!/^bn/.test(param.name) && !param.target) {
        param.target = '*'
      }
      mm.build({
        common: ['globalEvent', 'removeEventListener', param],
        version: { sdk: '1.0' }
      })
    },
    // 向监听事件发送消息
    postEvent: function (param) {
      if (!/^bn/.test(param.name) && !param.target) {
        param.target = '*'
      }
      mm.build({
        common: ['globalEvent', 'postEvent', param],
        version: { sdk: '1.0' }
      })
    }
  }

  // 设备相关
  var device$1 = {
    bindPhone: function (param, callback) {
      mm.build({
        common: ['device', 'bindPhone', {}, callback]
      })
    },
    /* 计步器获取步数 */
    getStepCounter: function (callback) {
      mm.build({
        common: ['device', 'getStepCounter', {}, callback]
      })
    },
    /*
          唤起原生短信界面，发送短信
          */
    sendSMS: function (param) {
      mm.build({
        common: ['device', 'sendSMS', param]
      })
    },
    callPhone: function (param) {
      mm.build({
        common: ['device', 'callPhone', param]
      })
    },
    /*
          获取用户系统信息
          返回值：
          systemName: 'iOS',// 系统内核 IOS/Android
          systemVersion: '8.0', // 系统内核版本
          model: 'iPhone',    // 系统型号
          modelVersion: '6',  // 系统型号版本
          */
    getSystemInfo: function (callback) {
      mm.build({
        common: ['device', 'getSystemInfo', {}, callback]
      })
    },
    getClientInfo: function (callback) {
      mm.build({
        common: ['device', 'getClientInfo', {}, callback]
      })
    },
    getScreenInfo: function (callback) {
      mm.build({
        common: ['device', 'getScreenInfo', {}, callback]
      })
    },
    getBatteryInfo: function (callback) {
      mm.build({
        common: ['device', 'getBatteryInfo', {}, callback]
      })
    },
    getNetworkType: function (callback) {
      mm.build({
        common: ['device', 'getNetworkType', {}, callback]
      })
    },
    startNetWorkListening: function (param) {
      mm.build({
        common: ['device', 'startNetWorkListening', param]
      })
    },

    getReferee: function (param, callback) {
      mm.build({
        common: ['device', 'getReferee', {}, callback]
      })
    }
  }

  var http$1 = {
    /**
     * 拉取json数据
     * @param {Object} param 请求参数
     *  - method: 客户端请求均为post
     *  - timeout: 超时时间，默认无超时时间
     * @param callback 回调
     * @doc http://local.m.immomo.com:8080/mk/#http-request
     */
    request: function (param, callback) {
      param.method = 'post'
      var is_encode
      if (mm.compareMK('1.0') < 0) {
        if (
          mm.compare('7.0.9') >= 0 &&
          mm.compare({
            ios: '7.4.1',
            android: '7.7'
          }) < 0
        ) {
          is_encode = true
          param.encode = 1
        }
      }
      if (param.encode === 1) {
        is_encode = true
      }
      var newCallback = function (info) {
        if (is_encode) {
          try {
            var codeInfo = window.atob(info)
            codeInfo = escape(codeInfo) // atob鍚庯紝澶勭悊涓枃
            codeInfo = decodeURIComponent(codeInfo)
            info = JSON.parse(codeInfo)
          } catch (err) {}
        } else {
          if (typeof info == 'string' && mm.platform === 'android') {
            try {
              var codeInfo = decodeURIComponent(info)
              info = JSON.parse(codeInfo)
            } catch (err) {}
          }
          if (typeof info == 'string') {
            try {
              var codeInfo = info
                .replace(/\\/g, '\\\\')
                .replace(/\t/g, '\\t')
                .replace(/\n/g, '\\n')
                .replace(/\f/g, '\\f')
                .replace(/\r/g, '\\r')
                .replace(/[\x00-\x1F\x7F-\x9F]/g, '')
              info = JSON.parse(codeInfo)
            } catch (err) {}
          }
        }

        callback && callback.call(null, info)
      }

      var handler = mm.build({
        common: [
          'http',
          'request',
          param,
          function (info) {
            newCallback.call(null, info)
            handler.release()
          }
        ]
      })
    },
    resetSession: function (callback) {
      mm.build({
        common: ['http', 'resetSession', {}, callback]
      })
    }
  }

  /**
   * @file 媒体bridge
   */

  var media$1 = {
    previewImage: function (param, callback) {
      mm.build({
        common: ['media', 'previewImage', param, callback],
        version: { sdk: '1.0', momo: '6.10' }
      })
    },

    readImages: function (param, callback) {
      mm.build({
        common: ['media', 'readImages', param, callback],
        version: { sdk: '1.0', momo: '6.3' }
      })
    },
    startAudio: function (param, callback) {
      mm.build({
        common: ['media', 'startAudio', param, callback],
        version: { sdk: '1.0', momo: '5.8' }
      })
    },
    startVideo: function (param) {
      mm.build({
        common: ['media', 'startVideo', param],
        version: { sdk: '1.0', momo: '6.0' }
      })
    },
    stopAudio: function (param) {
      mm.build({
        common: ['media', 'stopAudio', param],
        version: { sdk: '1.0', momo: '5.8' }
      })
    },
    getImageData: function (param, callback) {
      mm.build({
        common: ['media', 'getImageData', param, callback],
        version: { sdk: '1.0', momo: '6.5' }
      })
    },
    getImages: function (param, callback) {
      mm.build({
        common: ['media', 'getImages', param, callback]
      })
    },
    //截屏8.1新增,萌宠
    screenShot: function (param, callback) {
      mm.build({
        common: ['media', 'screenShot', param, callback],
        version: { sdk: '1.0', momo: '8.1' }
      })
    },
    uploadImages: function (param, callback) {
      mm.build({
        common: ['media', 'uploadImages', param, callback],
        version: { sdk: '1.0', momo: '8.1' }
      })
    },
    saveBase64File: function (param, callback) {
      mm.build({
        common: ['media', 'saveBase64File', param, callback],
        version: { sdk: '1.0', momo: '8.1' }
      })
    },
    saveImagesToAlbum: function (param, callback) {
      mm.build({
        common: ['media', 'saveImagesToAlbum', param, callback],
        version: { sdk: '1.0', momo: '8.1' }
      })
    },

    // 拍摄视频
    shotVideo: function (param, callback) {
      mm.build({
        common: ['media', 'shotVideo', param, callback],
        version: { sdk: '1.1', momo: '8.2.1' }
      })
    },

    // 本地文件上传
    uploadFile: function (param, callback) {
      mm.build({
        common: ['media', 'uploadFile', param, callback],
        version: { sdk: '1.0', momo: '8.2.1' }
      })
    },
    uploadFiles: function (param, callback) {
      mm.build({
        common: ['media', 'uploadFiles', param, callback],
        version: { sdk: '1.0', momo: '8.21' }
      })
    },
    //调起客户端录音界面
    recordSound: function (param, callback) {
      mm.build({
        common: ['media', 'recordSound', param, callback],
        version: { sdk: '1.0', momo: '8.2.3' }
      })
    },
    //自定义录音
    customRecord: function (param, callback) {
      mm.build({
        common: ['media', 'customRecord', param, callback],
        version: { sdk: '1.0', momo: '8.2.4' }
      })
    }
  }

  /**
   * @file 离线包bridge
   */

  var offline = {
    /**
     * @file 强制更新离线包，完成后回调
     * @param param
     *  bid
     *  url
     * @param callback
     *  status: 0,  // 更新离线包后的状态; 0 成功，1失败
     *  message: '' // 提示文字
     */
    //todo 未能成功验证
    update: function (param, callback) {
      mm.build({
        common: ['offline', 'update', param, callback],
        version: { sdk: '1.0', momo: '6.5' }
      })
    },

    /**
     * 强制批量更新离线包，完成后回调
     * @param param
     *  bid:[],
     *  url:[]
     * @param callback
     *  status: 0,  // 更新离线包后的状态; 0 成功，1失败
     *  list:[],    // 失败的离线包
     *  message: '' // 提示文字
     */
    //todo 未能成功验证
    batchUpdate: function (param, callback) {
      return mm.build({
        common: ['offline', 'batchUpdate', param, callback]
      })
    },

    checkUpdate: function (param, callback) {
      return mm.build({
        common: ['offline', 'checkUpdate', param, callback],
        version: { sdk: '1.0', momo: '6.5' }
      })
    },

    //todo 未能成功验证
    isCached: function (param, callback) {
      return mm.build({
        common: ['offline', 'isCached', param, callback]
      })
    },

    /**
     * 移除所有离线包
     * @param callback
     */
    clearCache: function (callback) {
      return mm.build({
        common: ['offline', 'clearCache', {}, callback],
        version: { sdk: '1.0', momo: '6.5' }
      })
    },

    /**
     * 移除某个离线包
     * @param param
     *  bid
     * @param callback
     */
    removeCache: function (param, callback) {
      return mm.build({
        common: ['offline', 'removeCache', param, callback],
        version: { sdk: '1.0', momo: '6.5' }
      })
    },

    /**
     * 获取zip包版本号
     * @param param
     * @param callback
     *  '10' // 0 if it's null
     */
    //todo 未能成功验证
    getVersion: function (param, callback) {
      return mm.build({
        common: ['offline', 'getVersion', param, callback],
        version: { sdk: '1.0', momo: '6.5' }
      })
    },

    //todo 未能成功验证
    isResourceOfflined: function (param, callback) {
      return mm.build({
        common: ['offline', 'isResourceOfflined', param, callback]
      })
    },

    //todo 未能成功验证
    sendOfflineRequest: function (param, callback) {
      return mm.build({
        common: ['offline', 'sendOfflineRequest', param, callback],
        version: { sdk: '1.0', momo: '8.1' }
      })
    }
  }

  /**
   * @file 本地存储
   */

  var storage$1 = {
    /**
     * 获取某条数据
     * @param param
     *  callid {string} 用来标示请求id, 返回时把该值传回
     *  host {string} 如果host不为空, 且是该页面的域名的父域名, 则往host写, 如果为空则往页面的域名写, 其他为错误
     *  path {string} 区分业务
     *  key {string} 数据对应的key
     * @param callback
     */
    getItem: function (param, callback) {
      if (!mm.is_webview) {
        var _val = localStorage.getItem(param.key)
        callback(_val)
        return
      }

      mm.build({
        common: ['storage', 'getItem', param, callback],
        version: { sdk: '1.0', momo: '6.5' }
      })
    },
    setItem: function (param) {
      param.value += ''
      if (!mm.is_webview) {
        localStorage.setItem(param.key, param.value)
        return
      }
      if (param.value.length > 100 * 1024 && mm.compareMK('1.0') >= 0) {
        throw 'setItem 字符超长'
      }

      if (param.value.length > 100 * 1024 && mm.compare(7.6) >= 0) {
        throw 'setItem 字符超长'
      }

      mm.build({
        common: ['storage', 'setItem', param],
        version: { sdk: '1.0', momo: '6.5' }
      })
    },
    removeItem: function (param) {
      if (!mm.is_webview) {
        localStorage.removeItem(param.path + param.key)
        return
      }
      mm.build({
        common: ['storage', 'removeItem', param],
        version: { sdk: '1.0', momo: '6.5' }
      })
    },
    clearItem: function (param) {
      if (!mm.is_webview) {
        localStorage.clear()
        return
      }
      //todo 双端check
      var name = 'clearItem'
      if (mm.platform === 'ios') {
        name = 'clear'
      }
      mm.build({
        common: ['storage', name, param],
        version: { sdk: '1.0', momo: '6.5' }
      })
    }
  }

  /**
   *  ui 相关bridge
   **/

  var hasRefreshed = true

  var ui$1 = {
    checkMK: function (callback) {
      mm.build({
        common: ['ui', 'checkMK', {}, callback]
      })
    },
    setBackBtn: function (callback) {
      mm.build({
        common: ['ui', 'setBackBtn', {}, callback],
        version: { sdk: '1.0', momo: '8.1' }
      })
    },
    openUrl: function (param) {
      var url = param.url
      if (!mm.is_webview) {
        setTimeout(function () {
          window.location.href = url
        }, 20)
        return false
      }

      if (param.pass) {
        param.url = 'https://passport.immomo.com/authorize?redirect_uri=' + encodeURIComponent(param.url)
      }
      mm.build({
        common: ['ui', 'openUrl', param]
      })
    },
    openGoto: function (param) {
      var endParam = param.param
      mm.build({
        common: ['ui', mm.platform === 'ios' ? 'openGoto' : 'directGoto', mm.platform === 'ios' ? { goto: endParam } : { param: endParam }]
      })
    },

    openLinkInExternalBrowser: function (param) {
      mm.build({
        common: ['ui', 'openLinkInExternalBrowser', param]
      })
    },
    goBack: function (param) {
      mm.build({
        common: ['ui', 'goBack', param]
      })
    },

    reload: function (param) {
      if (mm.is_webview) {
        mm.build({
          common: ['ui', 'reload', param]
        })
      } else {
        location.reload()
      }
    },
    close: function (param) {
      if (/momoPopup/.test(navigator.userAgent)) {
        mm.ui.closePopup(param)
        return
      }
      mm.build({
        common: ['ui', 'close', param]
      })
    },
    closePopup: function (param) {
      mm.build({
        common: ['ui', 'closePopup', param]
      })
    },
    showNavBar: function () {
      mm.build({
        common: ['ui', 'showNavBar', {}]
      })
    },
    hideNavBar: function () {
      mm.build({
        common: ['ui', 'hideNavBar', {}]
      })
    },
    showKeyboard: function (param) {
      mm.build({
        common: ['ui', 'showKeyboard', param]
      })
    },
    showMessage: function (param) {
      mm.build({
        common: ['ui', 'showMessage', param]
      })
    },
    showConfirm: function (param) {
      var newCallback = function (resp) {
        if (!resp) return
        switch (resp.button) {
          case 0:
            param.cancel && param.cancel()
            break
          case 1:
            param.callback1 && param.callback1()
            break
          case 2:
            param.callback2 && param.callback2()
            break
        }
        param.finish && param.finish(resp)
      }

      mm.build({
        common: ['ui', 'showConfirm', param, newCallback]
      })
    },
    setUI: function (param) {
      mm.build({
        common: ['ui', 'setUI', param]
      })
    },
    setTitle: function (param) {
      if (param && param.title) {
        document.title = param.title
      }
      mm.build({
        common: ['ui', 'setTitle', param]
      })
    },
    setPulldown: function (param) {
      mm.build({
        common: ['ui', 'setPulldown', param]
      })
    },
    setUIBtn: function (param, callback) {
      mm.build({
        common: ['ui', 'setUIBtn', param, callback]
      })
    },
    setUIGroup: function (param) {
      var newCallback = function (resp) {
        if (resp && typeof resp.btn != 'undefined') {
          param.btns[resp.btn].callback(resp)
        }
      }
      mm.build({
        common: ['ui', 'setUIGroup', param, newCallback]
      })
    },
    //todo wiki里没有
    clearPageCover: function (callback) {
      if (mm.platform !== 'ios') return
      mm.build({
        common: ['ui', 'clearPageCover', {}, callback]
      })
    },

    getVisibility: function (callback) {
      mm.build({
        common: ['ui', 'getVisibility', {}, callback]
      })
    },
    /* 下拉刷新 */
    refresh: function (callback) {
      hasRefreshed = true
      var t
      var reTime = function () {
        if (!hasRefreshed) {
          mm.ui.refreshEnd()
        }
      }
      var newCallback = function () {
        hasRefreshed = false
        clearTimeout(t)
        t = setTimeout(reTime, 16000)

        setTimeout(function () {
          callback && callback.call(null)
        }, 0)
      }
      mm.build({
        common: ['ui', 'refresh', {}, newCallback]
      })
    },
    /* 下拉刷新结束 */
    refreshEnd: function () {
      hasRefreshed = true
      mm.build({
        common: ['ui', 'refreshEnd', {}]
      })
    },
    /*禁止划动退出页面*/
    forbidLeftSlide: function (param) {
      mm.build({
        common: ['ui', 'forbidLeftSlide', param]
      })
    },
    /*展示礼物动效*/
    displayGift: function (param, callback) {
      mm.build({
        common: ['ui', 'displayGift', param, callback]
      })
    },
    postMessage: function (param, callback) {
      mm.build({
        common: ['ui', 'postMessage', param, callback]
      })
    },
    loadingView: function (param, callback) {
      mm.build({
        common: ['ui', 'loadingView', param, callback]
      })
    },
    whiteScreenView: function (param, callback) {
      mm.build({
        common: ['ui', 'whiteScreenView', param, callback]
      })
    }
  }

  /**
   *  view 预渲染 bridge
   **/

  var view = {
    prepare: function (param, callback) {
      mm.build({
        common: ['view', 'prepare', param, callback],
        version: { sdk: '1.0', momo: { ios: '8.2.4', android: '8.2.4' } }
      })
    },
    destroy: function (param, callback) {
      mm.build({
        common: ['view', 'destroy', param, callback],
        version: { sdk: '1.0', momo: { ios: '8.2.4', android: '8.2.4' } }
      })
    }
  }

  /**
   *  websocket bridge
   **/
  var websocket = {
    //建立连接
    connect: function (param, callback) {
      mm.build({
        common: ['websocket', 'connect', param, callback],
        version: { sdk: '1.0', momo: { ios: '8.11.3', android: '8.11.3' } }
      })
    },
    //断开连接
    disconnect: function (param, callback) {
      mm.build({
        common: ['websocket', 'disconnect', param, callback],
        version: { sdk: '1.0', momo: { ios: '8.11.3', android: '8.11.3' } }
      })
    },
    //发送请求
    send: function (param, callback) {
      mm.build({
        common: ['websocket', 'send', param, callback],
        version: { sdk: '1.0', momo: { ios: '8.11.3', android: '8.11.3' } }
      })
    }
  }

  var _isSupport7_1 = mm.compare('7.0.9') > 0
  var _analy = {
    // 发送统计ajax时间的对象
    firstTime: 0,
    lastTime: 0,
    sendCount: 0,
    count: 0,
    isLoaded: false,
    cache: false
  }
  var _allAnaly = {
    start: {},
    data: {},
    net: 'none'
  }

  // 获取网络情况
  var deviceBack = function (res) {
    _allAnaly.net = res.network_type
  }

  if (!mm.netWorkType) {
    mm.invoke('device', 'getNetworkType', {}, deviceBack)
  } else {
    _allAnaly.net = mm.netWorkType
  }

  function extend(to, _from) {
    for (var key in _from) {
      to[key] = _from[key]
    }
    return to
  }

  // ajax begin
  function addAjaxParam(key, value) {
    if (typeof value == 'function') value = value()
    if (value == null) value = ''
    return encodeURIComponent(key) + '=' + encodeURIComponent(value)
  }

  function getAjaxData(params, obj, scope, isNative) {
    var value,
      type,
      array = Array.isArray(obj) || obj instanceof Array
    Object.prototype.toString.call(obj) === '[object Object]' && Object.getPrototypeOf(obj) == Object.prototype

    for (var key in obj) {
      value = obj[key]
      type = typeof value

      // if (scope) key = scope + '[' + (hash || type == 'object' ? key : '') + ']'
      if (scope) key = scope + '[' + key + ']'
      // handle data in serializeArray() format
      if (!scope && array) {
        if (isNative) {
          params[key] = value
        } else {
          params.push(addAjaxParam(key, value))
        }
      }
      // recurse into nested objects
      else if (type == 'object') {
        getAjaxData(params, value, key, isNative)
      } else {
        if (isNative) {
          params[key] = value
        } else {
          params.push(addAjaxParam(key, value))
        }
      }
    }
  }

  function localAjax(ajaxOpt) {
    var xhr = new window.XMLHttpRequest(),
      data = ajaxOpt.data || '',
      url = ajaxOpt.url,
      ajaxError = ajaxOpt.error,
      ajaxSuccess = ajaxOpt.success

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        var result,
          error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && location.protocol == 'file:')) {
          result = xhr.responseText

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            result = /^\s*$/.test(result) ? null : JSON.parse(result)
          } catch (e) {
            error = e
          }

          if (error) {
            ajaxError(error, 'parsererror', xhr)
          } else {
            ajaxSuccess(result, xhr)
          }
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr)
        }
      }
    }
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.withCredentials = true // 携带跨域cookie

    if (data && typeof data != 'string') {
      var params = []
      getAjaxData(params, data)

      data = params.join('&').replace(/%20/g, '+')
    }

    xhr.send(data)
  }

  // ajax end

  window.addEventListener(
    'load',
    function () {
      _analy.isLoaded = true
      CommonSendAjaxMMA(true)
    },
    false
  )

  function CommonSendAjaxMMA(isLoadEvent, options) {
    if (!_analy) return
    if (!isLoadEvent && options.analy) {
      _analy.count++
      _analy.lastTime = Date.now()
    }

    if (_analy.isLoaded && _analy.sendCount <= _analy.count) {
      if (_analy.firstTime) {
        if (typeof MMA != 'undefined') {
          delete _analy.sendCount
          delete _analy.isLoaded
          MMA.addInit({
            ajax: _analy
          })
          if (MMA.sendLog) {
            MMA.sendLog(_allAnaly.data)
          }
          _analy = null
          _allAnaly.data = null
        }
      } else {
        _analy = null
      }
    }
  }

  function sendMMA(url, ext, cxp) {
    if (typeof MMA == 'undefined') return

    MMA.sendEvent(null, {
      api: 1,
      lucky: 1,
      et: 4,
      cu: url,
      cxp: cxp || 'ajax_error',
      ext: ext
    })
  }

  function getRequest(options, storageObj) {
    this.options = options
    this.storageObj = storageObj
    this.resp = null

    if (_analy) {
      if (!_analy.firstTime) _analy.firstTime = Date.now()
      if (options.analy) {
        _analy.sendCount++
      }
    }
    _allAnaly.start[options.url + storageObj.cacheKey] = Date.now()

    /*
        如果在陌陌客户端，执行mm.http.request
        如果不在陌陌客户端，执行ajax
        */
    if (options.useCache) {
      /*
          如果用缓存，获取localstorage中的值
          并执行ajax，与localstorage的值进行比较，如果不同，重复success操作
          如果不用缓存，每次进行请求
          */
      this.getLocalStorage.apply(this, arguments)
    } else {
      this.sendRequest.apply(this, arguments)
    }
  }

  var getSession = (function () {
    var isSet = false,
      sessionStatus = null,
      requestArr = [],
      errorArr = [],
      isLowAndroid = mm.platform == 'android' && mm.build_version < 1650 // android < 8.5版本，不支持立即获取到登陆信息

    return function (resp, options) {
      var canReload = !isLowAndroid && options.autoReload
      if (sessionStatus == 0) {
        // 如果已经获取过登陆信息，第一次请求返回xxx401，执行重复发送请求
        //                     第二次请求返回xxx401，返回失败 - false
        if (requestArr.indexOf(this) == -1 && canReload) {
          this.sendRequest()
          return true
        }
        return false
      } else if (sessionStatus == 1) {
        // 如果获取登陆信息失败，返回失败
        return false
      }

      // 获取登陆信息
      requestArr.push(this)
      errorArr.push(resp)
      if (!isSet) {
        isSet = true
        mm.invoke('http', 'resetSession', {}, function (sess) {
          // 高版本安卓、ios，获取登陆信息成功后，重新发送请求
          if (canReload && sess.status == 0) {
            sessionStatus = 0
            for (var i = 0; i < requestArr.length; i++) {
              requestArr[i].sendRequest()
            }
          }

          // 低版本安卓，或获取登陆信息失败，执行callback
          if (!canReload || sess.status != 0) {
            sessionStatus = 1
            for (var i = 0; i < requestArr.length; i++) {
              requestArr[i].onlineSuc(errorArr[i])
            }
          }
        })
      }
      return true
    }
  })()

  getRequest.prototype = {
    getLocalStorage: function () {
      var _self = this
      var options = this.options
      var storageObj = this.storageObj
      _self.sendRequest(arguments)

      var resp = localStorage.getItem(storageObj.path + storageObj.key)
      if (!resp) return

      var dt
      if (_isSupport7_1) {
        try {
          var dt = window.atob(resp)
          dt = escape(dt) // atob后，处理中文
          dt = decodeURIComponent(dt)
          options._mock.origin = dt
          dt = JSON.parse(dt)
        } catch (err) {
          dt = _self.changeCode(resp)
        }
      } else {
        dt = _self.changeCode(resp)
      }

      options._mock.originObj = dt
      options.success.call(options, dt)
      if (_analy) {
        _analy.cache = true
      }
    },
    changeCode: function (resp) {
      var dt
      try {
        dt = JSON.parse(resp)
      } catch (err) {
        try {
          var codeInfo = resp
            .replace(/\\/g, '\\\\')
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\f/g, '\\f')
            .replace(/\r/g, '\\r')
            .replace(/[\x00-\x1F\x7F-\x9F]/g, '')
          dt = JSON.parse(codeInfo)
        } catch (err) {
          dt = resp
        }
      }

      this.options._mock.origin = resp
      return dt
    },
    sendRequest: function () {
      var _self = this
      var options = this.options
      var sendObj = {
        url: options.url, // 请求的url
        data: options.data,
        dataType: 'json',
        type: 'POST', // 强制使用post
        encode: options.encode
      }

      // 如果是mk webview 使用bridge请求，否则用ajax请求
      if (mm.is_webview) {
        // 兼容android < 8.5 不支持data嵌套数组
        if (mm.platform == 'android') {
          var params = {}
          getAjaxData(params, sendObj.data, null, true)
          sendObj.data = params
        }
        mm.http.request(sendObj, function (resp) {
          if (resp) {
            if (typeof resp == 'object') {
              if (resp.ec && (resp.ec < 0 || resp.ec == 1)) {
                resp.em = '网络好像有点问题'
                options.success && options.success.call(options, resp)
                // 如果从cache获取到数据，执行finish
                if (options._mock.originObj && options.finish) {
                  options.finish.call(options, options._mock.originObj)
                }
                sendMMA(options.url, resp)
                return
              }
              if (/^\d\d\d401$/.test(resp.ec) && getSession.call(_self, resp, options)) {
                // 如果 getSession == true，即可以获取到session，则暂停后续操作
                // 如果 getSession == false，即没有session 或 没有session回调，则继续执行后续操作
                return
              }
            } else {
              sendMMA(options.url, resp, 'ajax_datatype')
            }
          }

          _self.onlineSuc(resp)
        })
      } else {
        try {
          sendObj.success = function (resp) {
            _self.onlineSuc.call(_self, resp)
          }
          sendObj.error = function (resp, textState) {
            if (resp) {
              _self.onlineErr(
                {
                  ready: resp.readyState,
                  status: resp.status,
                  text: textState
                },
                resp
              )
            }

            return
          }
          localAjax(sendObj)
        } catch (err) {
          console.warn('mock warn: $.ajax error')
        }
      }
    },
    onlineSuc: function (resp) {
      var options = this.options
      var storageObj = this.storageObj
      if (options.useCache && !!resp) {
        var is_obj = typeof resp == 'object'
        var dataStr = is_obj ? JSON.stringify(resp) : resp

        if (_isSupport7_1) {
          var dataStr = encodeURIComponent(dataStr)
          dataStr = unescape(dataStr)
          dataStr = window.btoa(dataStr)
        }

        if (!!options._mock.origin && options._mock.origin == dataStr && options.finish) {
          options.finish.call(options, resp)
          return false
        }

        if (!is_obj || (is_obj && (resp.ec == 200 || resp.ec == 0))) {
          extend(storageObj, {
            value: dataStr
          })
          localStorage.setItem(storageObj.path + storageObj.key, dataStr)
        }
      }
      options.end = true
      // 添加请求时间统计
      var now = Date.now()
      var send = {}
      send[now] = {
        type: 'ajax',
        data: {
          net: _allAnaly.net,
          uri: options.url.replace(/\?.*/, ''),
          wt: now - _allAnaly.start[options.url + storageObj.cacheKey],
          origin: location.href.replace(/\?.*/, ''),
          bid: mm.query._bid ? mm.query._bid[0] : ''
        }
      }
      if (_allAnaly.data) {
        _allAnaly.data[now] = send[now]
      } else {
        if (MMA.sendLog) {
          MMA.sendLog(send)
        }
      }

      if (options._mock.origin) {
        options.update.call(options, resp)
      } else {
        options.success.call(options, resp)
      }
      if (options.finish) {
        options.finish.call(options, resp)
      }
    },
    onlineErr: function (err, resp) {
      var options = this.options
      if (options.error) options.error.call(options, resp)
      sendMMA(options.url, err)
    }
  }

  var mock = {
    ajax: function (opt) {
      var options = extend({}, opt)
      var _success = options.success,
        _update = options.update,
        _error = options.error
      options.finish
      var _progress = options.progress,
        cacheKey = options.cacheKey
      options.encode = opt.encode || 0
      options._mock = {}
      // 初始化设置是否自动设置session并重新发送请求
      if (typeof options.autoReload == 'undefined') {
        options.autoReload = true
      }

      /*
          mk.immomo.com：
          pc 和 非mk：'https://m.immomo.com/mk' + url
          mk：'https://mk.immomo.com' + url
      */

      if (opt.host) {
        if (mm.is_webview) {
          options.url = opt.host + options.url
        } else {
          if (opt.host.indexOf('mk.immomo.com') > -1) {
            if (mm.is_webview) {
              mk.showError() // 非mk webview不支持加密域名
              sendMMA(opt.host + options.url, '', 'mk_url_error')
              return
            }
            options.url = '/mk' + options.url
          } else {
            // pc非mk.immomo.com的，统一添加host
            options.url = opt.host + options.url
          }
        }
      } else {
        if (mm.is_webview && !/^http/.test(options.url)) {
          options.url = mm.protocol + '//' + mm.host + options.url
        }
      }

      if (!cacheKey) {
        var opt_data = options.url
        if (options.data) {
          opt_data += options.url.indexOf('?') > -1 ? '&' : '?'
          var data_arr = []
          for (var k in options.data) {
            data_arr.push(k + '=' + options.data[k])
          }
          opt_data += data_arr.join('&')
        }
        cacheKey = encodeURI(opt_data)
      }
      var storageObj = {
        path: options.cachePath || '',
        key: cacheKey
      }

      // 线上数据返回 callback
      options.success = function (data, status, xhr) {
        CommonSendAjaxMMA(false, options)
        _success && _success.apply(options, arguments)
        _progress && _progress.apply(options, arguments)
      }

      // 数据更新时 callback
      options.update = function (data, status, xhr) {
        _update && _update.apply(options, arguments)
        _progress && _progress.apply(options, arguments)
      }

      options.error = function (xhr, errorType, error) {
        CommonSendAjaxMMA(false, options)
        _error && _error.apply(options, arguments)
      }

      new getRequest(options, storageObj)
    },
    /*
        错误提示，可以通过修改 mk.showError 来改变
        */
    showError: function (errorText) {
      errorText = errorText || '网络好像有点问题'
      if (typeof mm != 'undefined') {
        mm.invoke('ui', 'showMessage', {
          status: 2,
          message: errorText
        })
      }
    },
    post: function (url, data, success) {
      if (typeof data == 'function') (success = data), (data = undefined)

      return mk.ajax({
        url: url,
        data: data,
        success: success
      })
    }
  }

  if (window.mm) {
    mm.ajax = mock.ajax
  }

  // import action from './libs/basic/action';
  mm$2.device = device$1
  mm$2.http = http$1
  mm$2.media = media$1
  mm$2.offline = offline
  mm$2.storage = storage$1
  mm$2.ui = ui$1
  mm$2.view = view
  // mm.action = action;
  mm$2.websocket = websocket
  mm$2.globalEvent = globalEvent
  mm$2.ajax = mock.ajax
  mm$2.post = mock.post
  mm$2.showError = mock.showError

  mm$2.init = function () {
    mm$2.ui.setUIBtn()
  }

  var bridge_basic_mm = mm$2

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

  function __rest(s, e) {
    var t = {}
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]]
      }
    return t
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

  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length
    for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j]
    return r
  }

  var _platform = bridge_basic_mm.platform.toLowerCase()
  var _allBridgeStorage = []
  var _tantanVersionInfo = {
    loadingVersion: false,
    hasVersion: false,
    version: ''
  }
  var _canIUseBridgeMap = {}
  var tantan_version = getTantanVersion()
  /**
   * 陌陌mm.build封装为Promise
   * @param params
   * @returns
   */
  function mmWrapper(params) {
    return __awaiter(this, void 0, void 0, function () {
      var common, module, name, param, needCallback
      return __generator(this, function (_a) {
        common = params.common
        ;(module = common[0]), (name = common[1]), (param = common[2]), (needCallback = common[3])
        return [
          2 /*return*/,
          new Promise(function (resolve, reject) {
            var copyParam = __assign({}, param)
            // 其他回调函数原样传递
            var uid = genUuid$1()
            Object.keys(param).forEach(function (key) {
              if (typeof param[key] === 'function') {
                var fn = key + '_' + uid
                window[fn] = param[key]
                copyParam[key] = fn
              }
            })
            if (needCallback) {
              var callback = function (res) {
                resolve(res)
              }
              bridge_basic_mm.build({
                common: [module, name, copyParam, callback]
              })
            } else {
              bridge_basic_mm.build({
                common: [module, name, copyParam]
              })
              resolve('')
            }
          })
        ]
      })
    })
  }
  /**
   * 兼容旧bridge, 将成功和失败的回调放在param中
   * @param params
   * @returns
   */
  function oldWrapper(params) {
    return __awaiter(this, void 0, void 0, function () {
      var common, module, name, param
      return __generator(this, function (_a) {
        common = params.common
        ;(module = common[0]), (name = common[1]), (param = common[2])
        return [
          2 /*return*/,
          new Promise(function (resolve, reject) {
            var newParam = oldParamWrapper(param, resolve, reject)
            bridge_basic_mm.build({
              common: [module, name, newParam]
            })
          })
        ]
      })
    })
  }
  var genUuid$1 = function () {
    var d = +new Date()
    var range = Math.random().toFixed(3) * 1000
    return d + '_' + range
  }
  var oldParamWrapper = function (params, resolve, reject) {
    var uid = genUuid$1()
    var successFn = 'success' + uid
    var failFn = 'fail' + uid
    var newParams = __assign(__assign({}, params), { success: successFn, fail: failFn })
    Object.keys(params).forEach(function (key) {
      if (typeof params[key] === 'function') {
        var fn = key + '_' + uid
        window[fn] = params[key]
        newParams[key] = fn
      }
    })
    window[successFn] = function (res) {
      resolve(res)
    }
    window[failFn] = function () {
      reject()
    }
    return newParams
  }
  function getTantabVersionFromUserAgent() {
    var versionStr = ''
    // 若ua里面有appVersion, 则从ua里面取, 否则调用getSystemInfo获取
    var ua = window.navigator.userAgent
    var regexp = new RegExp('tantan-' + _platform + '/(\\d+).(\\d+).?(\\d+)?')
    var versionArr = regexp.exec(ua) || ['', '0', '0'] //用于获取tantan_version
    if (regexp.test(ua)) {
      versionStr = versionArr[1] + '.' + versionArr[2] + (versionArr[3] ? '.' + versionArr[3] : '')
    }
    return versionStr
  }
  function getTantanVersion() {
    return __awaiter(this, void 0, void 0, function () {
      var versionStr
      return __generator(this, function (_a) {
        versionStr = getTantabVersionFromUserAgent()
        // 不再使用getSystemInfo获取app版本, 因为getSystemInfo和useragent上线时间差不多
        // if (!versionStr)
        //   const res: ISystemInfo = await mmWrapper({
        //     common: ['tantan_device', 'getSystemInfo', {}, true],
        //   });;
        //   versionStr = res.appVersion;
        // }
        return [2 /*return*/, versionStr]
      })
    })
  }
  /**
   * 通过momo版本号判断版本支持
   *  e.g., mm.compare('6.2.4') >= 0 表示当前版本号高于目标版本（6.2.4）
   * @param {object|number|string} ver
   * @returns {number}
   */
  var MKTAG = '[ttmkbridge]'
  function compare(ver, appVersion) {
    var version
    var verType = typeof ver
    if (verType == 'string' || verType == 'number') {
      version = ver + ''
    } else if (verType == 'object') {
      version = ver[_platform]
      if (!version) {
        return -101
      }
    } else {
      console.error(MKTAG, 'Error Version')
      return -102
    }
    var now = appVersion.split('.')
    var tar = version.toString().split('.')
    var len = Math.max(tar.length, now.length)
    try {
      for (var i = 0; i < len; i++) {
        var l = (isFinite(Number(now[i])) && Number(now[i])) || 0,
          r = (isFinite(tar[i]) && Number(tar[i])) || 0
        if (l < r) {
          /* 目标版本低于当前版本 */
          return -1
        } else if (l > r) {
          /* 目标版本大于当前版本 */
          return 1
        }
      }
    } catch (e) {
      return -1
    }
    /* 相等 */
    return 0
  }
  /**
   * 注册bridge, 用于canIUse判断
   * @param module bridge命名空间
   * @param bridgeName bridge名称
   * @param androidVersion 安卓最低支持版本
   * @param iosVersion ios最低支持版本
   * @returns
   */
  function register(module, bridgeName, androidVersion, iosVersion) {
    if (!_canIUseBridgeMap[module]) {
      _canIUseBridgeMap[module] = {}
    }
    if (!_platform) {
      _canIUseBridgeMap[module][bridgeName] = false
      return
    }
    _allBridgeStorage.push({
      module: module,
      bridgeName: bridgeName,
      androidVersion: androidVersion,
      iosVersion: iosVersion
    })
    if (!_tantanVersionInfo.loadingVersion) {
      _tantanVersionInfo.loadingVersion = true
      var appVersion_1 = getTantabVersionFromUserAgent()
      _allBridgeStorage.forEach(function (_a) {
        var module = _a.module,
          bridgeName = _a.bridgeName,
          androidVersion = _a.androidVersion,
          iosVersion = _a.iosVersion
        var targetAppVersion = _platform === 'ios' ? iosVersion : androidVersion
        _canIUseBridgeMap[module][bridgeName] = targetAppVersion ? compare(targetAppVersion, appVersion_1) >= 0 : false
      })
      _tantanVersionInfo.version = appVersion_1
      _tantanVersionInfo.hasVersion = true
    } else if (_tantanVersionInfo.hasVersion) {
      // 其实走不到这里
      var targetAppVersion = _platform === 'ios' ? iosVersion : androidVersion
      _canIUseBridgeMap[module][bridgeName] = targetAppVersion ? compare(targetAppVersion, _tantanVersionInfo.version) >= 0 : false
    }
  }
  function canIUse$2(module, bridgeName) {
    if (_canIUseBridgeMap[module]) {
      return !!_canIUseBridgeMap[module][bridgeName]
    }
    return false
  }

  var genUuid = function () {
    var d = +new Date()
    var range = Math.random().toFixed(3) * 1000
    return d + '_' + range
  }
  var ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : ''
  // iPhone
  var isiOS = ~ua.indexOf('iphone') || ua === 'tantan-ios'
  // 安卓
  var isAndroid = ~ua.indexOf('android')
  var throwErr = function (errorMsg) {
    throw errorMsg
  }
  var checkIsFn = function (fnArray) {
    if (!Array.isArray(fnArray)) {
      throwErr('param must be array')
    }
    return fnArray.every(function (fn) {
      return fn && typeof fn === 'function'
    })
  }
  var android_method_checker = function (method) {
    return isAndroid && typeof window.tantan !== 'undefined' && typeof window.tantan[method] === 'function'
  }
  var ios_method_checker = function (method) {
    return isiOS && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[method] && typeof window.webkit.messageHandlers[method].postMessage === 'function'
  }
  var oldIOS_method_checker = function (method) {
    return isiOS && typeof window[method] === 'function'
  }
  var noop = function () {}
  var handleAndroidParamArr = function (array) {
    if (array === void 0) {
      array = []
    }
    return array.map(function (item) {
      var resultMap = {
        type: 'String',
        value: item
      }
      if (typeof item === 'number') {
        resultMap.type = 'Integer'
        if (/^\d+\.\d+$/.test(String(item))) {
          resultMap.type = 'Double'
        }
      }
      if (typeof item === 'boolean') {
        resultMap.type = 'Boolean'
      }
      if (Object.prototype.toString.call(item) === '[object Array]') {
        resultMap.isArray = true
      }
      return resultMap
    })
  }
  var customConsole = function (text) {
    console.warn('%c' + text, 'color: red;font-style: italic;font-size: 20px')
  }

  /** 1. 获取设备基础信息 */
  function saveBean() {
    return __awaiter(this, void 0, void 0, function () {
      var res
      return __generator(this, function (_a) {
        if (android_method_checker('saveBean')) {
          res = JSON.parse(window.tantan.saveBean())
          if (res.versionCode) {
            res.appVersion = res.versionCode
          }
          if (res.platform) {
            res.os = res.platform
          }
          return [2 /*return*/, Promise.resolve(res)]
        } else if (oldIOS_method_checker('saveBean')) {
          return [2 /*return*/, window.saveBean()]
        } else if (ios_method_checker('saveBean')) {
          return [
            2 /*return*/,
            new Promise(function (resolve, reject) {
              var uid = genUuid()
              window['saveBeanSuccess' + uid] = function (res) {
                var result = JSON.parse(res)
                if (result.versionCode) {
                  result.appVersion = result.versionCode
                }
                if (result.platform) {
                  result.os = result.platform
                }
                resolve(result)
              }
              window['saveBeanFail' + uid] = function (err) {
                reject(err)
              }
              window.webkit.messageHandlers.saveBean.postMessage({
                success: 'saveBeanSuccess' + uid,
                fail: 'saveBeanFail' + uid
              })
            })
          ]
        }
        console.info('无法获取设备信息: saveBean', 0.5)
        return [
          2 /*return*/,
          {
            schemeVersion: '',
            deviceId: '',
            language: '',
            userId: '10086',
            versionCode: ''
          }
        ]
      })
    })
  }
  /** 2. 关闭窗口 */
  function closeWebviewOld() {
    if (android_method_checker('closeWebview')) {
      window.tantan.closeWebview()
    } else if (oldIOS_method_checker('closeWebview')) {
      window.closeWebview()
    } else {
      console.info('无法关闭当前页面', 0.5)
    }
  }
  /**
   * 4. 打点
   * @param key 事件名
   * @param params 事件参数对
   */
  function track(key, params) {
    var kvs = []
    if (Object.prototype.toString.call(params) === '[object Object]') {
      for (var key_1 in params) {
        kvs = kvs.concat(String(key_1), String(params[key_1]))
      }
    } else if (Object.prototype.toString.call(params) === '[object Array]') {
      kvs = params
    }
    if (android_method_checker('track')) {
      window.tantan.track(key, kvs)
    } else if (oldIOS_method_checker('trackEvent')) {
      window.trackEvent(key, kvs)
    } else if (ios_method_checker('trackEvent')) {
      window.webkit.messageHandlers.trackEvent.postMessage({
        key: key,
        params: kvs
      })
    } else {
      console.info('无法打点', 0.5)
    }
  }
  /** 7. 刷新客户端直播个人主播认证信息 */
  function refreshLiveAuth() {
    if (android_method_checker('refreshLiveAuth')) {
      window.tantan.refreshLiveAuth()
    } else if (oldIOS_method_checker('refreshLiveAuth')) {
      window.refreshLiveAuth()
    } else if (ios_method_checker('refreshLiveAuth')) {
      return window.webkit.messageHandlers.refreshLiveAuth.postMessage({})
    } else {
      console.info('无法刷新认证信息', 0.5)
    }
  }
  /** 8. 跳转至充值页面 */
  function jumpRecharge(_a) {
    var successRecharge = _a.successRecharge
    var time = Math.floor(Math.random() * 100)
    if (android_method_checker('jumpRecharge')) {
      window['successRecharge' + time] = successRecharge
      if (!successRecharge) {
        return window.tantan.jumpRecharge()
      }
      window.tantan.jumpRecharge('successRecharge' + time)
    } else if (oldIOS_method_checker('jumpRecharge')) {
      window.jumpRecharge(successRecharge)
    } else if (ios_method_checker('jumpRecharge')) {
      return new Promise(function (resolve, reject) {
        window['successRecharge' + time] = function (res) {
          successRecharge()
          resolve(res)
        }
        window.webkit.messageHandlers.jumpRecharge.postMessage({
          success: 'successRecharge' + time
        })
      })
    } else {
      console.info('无法跳转至充值界面', 0.5)
    }
  }
  /** 10. 刷新客户端直播公会主播认证信息 */
  function refreshGuildAuth() {
    if (android_method_checker('refreshGuildAuth')) {
      window.tantan.refreshGuildAuth()
    } else if (oldIOS_method_checker('refreshGuildAuth')) {
      window.refreshGuildAuth()
    } else if (ios_method_checker('refreshGuildAuth')) {
      return window.webkit.messageHandlers.refreshGuildAuth.postMessage({})
    } else {
      console.info('无法刷新认证信息', 0.5)
    }
  }
  /** 11. 跳转去封面 */
  function jumpToCover() {
    if (android_method_checker('jumpToCover')) {
      window.tantan.jumpToCover()
    } else if (oldIOS_method_checker('jumpToCover')) {
      window.jumpToCover()
    } else if (ios_method_checker('jumpToCover')) {
      return window.webkit.messageHandlers.jumpToCover.postMessage({})
    } else {
      console.info('无法跳转去封面', 0.5)
    }
  }
  /** 12. 刷新客户端青少年模式状态 */
  function onTeenModeEnable(enable) {
    if (android_method_checker('onTeenModeEnable')) {
      window.tantan.onTeenModeEnable(enable)
    } else if (oldIOS_method_checker('onTeenModeEnable')) {
      window.onTeenModeEnable(enable)
    } else if (ios_method_checker('onTeenModeEnable')) {
      return window.webkit.messageHandlers.onTeenModeEnable.postMessage({ enable: enable })
    } else {
      console.info('无法刷新青少年模式状态', 0.5)
    }
  }
  /** 13. 客户端青少年模式输入密码回调 */
  function verifyTeenModePassword(verified, scenes) {
    if (android_method_checker('verifyTeenModePassword')) {
      window.tantan.verifyTeenModePassword(verified, scenes)
    } else if (oldIOS_method_checker('verifyTeenModePassword')) {
      window.verifyTeenModePassword(verified, scenes)
    } else if (ios_method_checker('verifyTeenModePassword')) {
      return window.webkit.messageHandlers.verifyTeenModePassword.postMessage({ verified: verified, scenes: scenes })
    } else {
      console.info('无法回调客户端青少年模式输入密码', 0.5)
    }
  }
  /** 关闭弹窗 */
  function closeLiveCampaignDialog() {
    if (android_method_checker('closeLiveCampaignDialog')) {
      window.tantan.closeLiveCampaignDialog()
    } else if (oldIOS_method_checker('closeLiveCampaignDialog')) {
      window.closeLiveCampaignDialog()
    } else if (ios_method_checker('closeLiveCampaignDialog')) {
      return window.webkit.messageHandlers.closeLiveCampaignDialog.postMessage({})
    } else {
      console.info('关闭弹窗', 0.5)
    }
  }
  /**
   * 刷新用户信息，用于vip合作运营活动页面用户抽取到"超级曝光"礼物时调用(客户端要求)
   */
  function refreshUserCounters() {
    if (android_method_checker('refreshUserCounters')) {
      window.tantan.refreshUserCounters()
    } else if (oldIOS_method_checker('refreshUserCounters')) {
      window.refreshUserCounters()
    } else if (ios_method_checker('refreshUserCounters')) {
      return window.webkit.messageHandlers.refreshUserCounters.postMessage({})
    } else {
      console.info('无法刷新用户信息', 0.5)
    }
  }
  /**
   * 该方法会根据主播是否通过认证进行页面的二次跳转(不关闭当前页),通过认证跳转直播预览页，未通过跳转认证页
   */
  function jumpToLiveAnchor() {
    if (android_method_checker('jumpToLiveAnchor')) {
      window.tantan.jumpToLiveAnchor()
    } else if (oldIOS_method_checker('jumpToLiveAnchor')) {
      window.jumpToLiveAnchor()
    } else if (ios_method_checker('jumpToLiveAnchor')) {
      return window.webkit.messageHandlers.jumpToLiveAnchor.postMessage({})
    } else {
      console.info('当前版本无法直接开播，请返回小助手页面点击开播', 0.5)
    }
  }
  /**
   * 该方法用于调用schema
   */
  function action$1(schema) {
    if (android_method_checker('action')) {
      window.tantan.action(schema)
    } else if (oldIOS_method_checker('action')) {
      window.action(schema)
    } else if (ios_method_checker('action')) {
      return window.webkit.messageHandlers.action.postMessage({ url: schema })
    } else {
      console.info('无法调用action', 0.5)
    }
  }
  /**
   * 跳转到profile页面
   */
  function jumpToProfile(userId, from) {
    if (android_method_checker('jumpToProfile')) {
      window.tantan.jumpToProfile(userId, from)
    } else if (oldIOS_method_checker('jumpToProfile')) {
      window.jumpToProfile(userId, from)
    } else if (ios_method_checker('jumpToProfile')) {
      return window.webkit.messageHandlers.jumpToProfile.postMessage({ userId: userId, from: from })
    } else {
      console.info('跳转到profile页面失败', 0.5)
    }
  }
  /**
   * 跳转到直播房间页面
   */
  function jumpToRoom(liveId, roomId, source) {
    if (android_method_checker('jumpToRoom')) {
      window.tantan.jumpToRoom(liveId, roomId, source)
    } else if (oldIOS_method_checker('jumpToRoom')) {
      window.jumpToRoom(liveId, roomId, source)
    } else if (ios_method_checker('jumpToRoom')) {
      return window.webkit.messageHandlers.jumpToRoom.postMessage({ liveId: liveId, roomId: roomId, source: source })
    } else {
      console.info('跳转到直播房间页面失败', 0.5)
    }
  }
  /**
   * 通知客户端红包已抢
   */
  function onRedPacketOpen(ismarqueeredpacket) {
    if (android_method_checker('onRedPacketOpen')) {
      window.tantan.onRedPacketOpen(ismarqueeredpacket)
    } else if (oldIOS_method_checker('onRedPacketOpen')) {
      window.onRedPacketOpen(ismarqueeredpacket)
    } else if (ios_method_checker('onRedPacketOpen')) {
      return window.webkit.messageHandlers.onRedPacketOpen.postMessage({ ismarqueeredpacket: ismarqueeredpacket })
    } else {
      console.info('无法调用onRedPacketOpen', 0.5)
    }
  }
  function subscribeCampaign(params) {
    var subscribeType = params.subscribeType,
      subscribeHandler = params.subscribeHandler,
      _a = params.successHandler,
      successHandler = _a === void 0 ? noop : _a
    var time = Math.floor(Math.random() * 100)
    if (android_method_checker('subscribeCampaign')) {
      window['successHandler' + time] = successHandler
      window['handler' + time] = subscribeHandler
      window.tantan.subscribeCampaign(subscribeType, 'successHandler' + time, 'handler' + time)
      return true
    } else if (oldIOS_method_checker('subscribeCampaign')) {
      window.subscribeCampaign(subscribeType, successHandler, subscribeHandler)
      return true
    } else if (ios_method_checker('subscribeCampaign')) {
      var time_1 = Math.floor(Math.random() * 100)
      window['successHandler' + time_1] = successHandler
      window['subscribeHandler' + time_1] = subscribeHandler
      window.webkit.messageHandlers.subscribeCampaign.postMessage({
        subscribeType: subscribeType,
        successHandler: 'successHandler' + time_1,
        subscribeHandler: 'subscribeHandler' + time_1
      })
      return true
    } else {
      console.info('无法订阅', 0.5)
      return false
    }
  }
  /**
   * 调起充值面板
   */
  function showRechargeDialog() {
    if (android_method_checker('showRechargeDialog')) {
      window.tantan.showRechargeDialog()
    } else if (oldIOS_method_checker('showRechargeDialog')) {
      window.showRechargeDialog()
    } else if (ios_method_checker('showRechargeDialog')) {
      return window.webkit.messageHandlers.showRechargeDialog.postMessage({})
    } else {
      console.info('无法刷新用户信息', 0.5)
    }
  }
  /**
   * 直播间送礼面板控制
   */
  function liveGiftDialogController(type, content, callBack) {
    if (content === void 0) {
      content = ''
    }
    if (callBack === void 0) {
      callBack = noop
    }
    var time = Math.floor(Math.random() * 100)
    window['liveGiftDialogControllerCallBack' + time] = callBack
    if (android_method_checker('liveGiftDialogController')) {
      window.tantan.liveGiftDialogController(type, content, 'liveGiftDialogControllerCallBack' + time)
    } else if (oldIOS_method_checker('liveGiftDialogController')) {
      window.liveGiftDialogController(type, content, callBack)
    } else if (ios_method_checker('liveGiftDialogController')) {
      return window.webkit.messageHandlers.liveGiftDialogController.postMessage({
        type: type,
        content: content,
        callBack: 'liveGiftDialogControllerCallBack' + time
      })
    } else {
      console.info('无法调用liveGiftDialogController', 0.5)
    }
  }
  /** 新手红包相关操作
   * type: startCountDown 开始倒计时
   * type: getStatusAndSeconds 提供观看直播秒数的
   * type: refreshStatus 刷新红包状态（消失/刷新状态）
   */
  function liveNewUserRedPacketController(type, content, callBack) {
    var time = Math.floor(Math.random() * 100)
    window['liveNewUserRedPacketControllerCallBack' + time] = callBack
    if (android_method_checker('liveNewUserRedPacketController')) {
      window.tantan.liveNewUserRedPacketController(type, content, 'liveNewUserRedPacketControllerCallBack' + time)
    } else if (oldIOS_method_checker('liveNewUserRedPacketController')) {
      window.liveNewUserRedPacketController(type, content, callBack)
    } else if (ios_method_checker('liveNewUserRedPacketController')) {
      window.webkit.messageHandlers.liveNewUserRedPacketController.postMessage({
        type: type,
        content: content,
        callBack: 'liveNewUserRedPacketControllerCallBack' + time
      })
    } else {
      console.info('无法调用liveNewUserRedPacketController', 0.5)
    }
  }
  function jumpToTopic(params) {
    var topicID = params.topicID,
      from = params.from
    if (ios_method_checker('jumpToTopic')) {
      return window.webkit.messageHandlers.jumpToTopic.postMessage({ topicID: topicID, from: from })
    }
    // if (oldIOS_method_checker("jumpToTopicAggregationAct")) {
    //     window.jumpToTopicAggregationAct(topicID, from);
    // }
    // if (oldIOS_method_checker("jumpToTopicVoteAggregationAct")) {
    //     window.jumpToTopicVoteAggregationAct(id, topicOwnerId, '-1');
    // }
  }
  var jumpTantanxDownload = function () {
    if (android_method_checker('jumpTantanxDownload')) {
      window.tantan.jumpTantanxDownload()
    } else if (oldIOS_method_checker('jumpTantanxDownload')) {
      window.jumpTantanxDownload()
    } else if (ios_method_checker('jumpTantanxDownload')) {
      return window.webkit.messageHandlers.jumpTantanxDownload.postMessage({})
    } else {
      console.info("can't jumpTantanxDownload", 0.5)
    }
  }
  // 跳转每日话题
  function jumpToTopicAggregationAct(id) {
    if (android_method_checker('jumpToTopicAggregationAct')) {
      window.tantan.jumpToTopicAggregationAct(id)
    } else {
      console.info('跳转到每日话题页面失败', 0.5)
    }
  }
  // 跳转投票
  function jumpToTopicVoteAggregationAct(id, topicOwnerId) {
    if (android_method_checker('jumpToTopicVoteAggregationAct')) {
      window.tantan.jumpToTopicVoteAggregationAct(id, topicOwnerId, '-1')
    } else {
      console.info('跳转投票失败', 0.5)
    }
  }
  // 跳转个人资料页
  function jumpToProfileAct$1(userId, from) {
    if (android_method_checker('jumpToProfileAct')) {
      window.tantan.jumpToProfileAct(userId, from)
    } else if (oldIOS_method_checker('jumpToProfileAct')) {
      window.jumpToProfileAct(userId, from)
    } else if (ios_method_checker('jumpToProfileAct')) {
      return window.webkit.messageHandlers.jumpToProfileAct.postMessage({ userId: userId, from: from })
    } else {
      console.info('跳转到每日话题页面失败', 0.5)
    }
  }
  // 跳转聊天页
  function startMessagesAct(id, from) {
    // 114093和115521是好友
    if (android_method_checker('startMessagesAct')) {
      window.tantan.startMessagesAct(id, from)
    } else if (oldIOS_method_checker('startMessagesAct')) {
      window.startMessagesAct(id, from)
    } else if (ios_method_checker('action')) {
      return window.webkit.messageHandlers.action.postMessage({ url: 'tantanapp://chat?uid=' + id + '&from=' + from })
    } else if (ios_method_checker('openWebview') && ios_method_checker('jumpWebview')) {
      // 增加jumpWebview的判断用来辨识是否为新版本
      return window.webkit.messageHandlers.openWebview.postMessage({ url: 'tantanapp://chat?uid=' + id + '&from=' + from })
    } else {
      console.info('跳转到每日话题页面失败', 0.5)
    }
  }
  function jumpToSeeOrBuySee() {
    var fnName = 'jumpToSeeOrBuySee'
    if (android_method_checker(fnName)) {
      window.tantan[fnName]()
    } else if (oldIOS_method_checker(fnName)) {
      window[fnName]()
    } else if (ios_method_checker(fnName)) {
      return window.webkit.messageHandlers[fnName].postMessage({})
    } else {
      console.info('跳转至see页面失败', 0.5)
    }
  }
  /**
   * 自定义右上角按钮
   */
  var registerBarRight = function (method, cb) {
    if (method === void 0) {
      method = 'mytantan'
    }
    var fnName = 'registerBarRight'
    var uid = genUuid()
    window['registerBarRight' + uid] = cb
    if (android_method_checker('registerBarRight')) {
      window.tantan[fnName](method, 'registerBarRight' + uid)
    } else if (oldIOS_method_checker(fnName)) {
      window[fnName](method, 'registerBarRight' + uid)
    } else if (ios_method_checker(fnName)) {
      window.webkit.messageHandlers[fnName].postMessage({
        key: method,
        callback: 'registerBarRight' + uid
      })
    }
  }
  function unRegisterBarRight() {
    var fnName = 'unRegisterBarRight'
    if (android_method_checker(fnName)) {
      window.tantan[fnName]()
    } else if (oldIOS_method_checker(fnName)) {
      window[fnName]()
    } else if (ios_method_checker(fnName)) {
      return window.webkit.messageHandlers[fnName].postMessage({})
    } else {
      console.info('无法卸载右上角按钮', 0.5)
    }
  }
  /**
   * 选取图片
   *
   * 1、如果 backMethod 为空，默认回调 adtp。
   * 2、如果图片上传成功，error 为 undefined
   * 3、如果用户取消操作，error 为 canceled
   * 4、如果用户选取的格式不支持，error 为 unknown
   * 5、如果上传图片失败，error 为对应的错误信息
   *
   */
  function imagePicker$1(callBack) {
    var time = Math.floor(Math.random() * 100)
    if (android_method_checker('imagePicker')) {
      window['imagePickerCallBack' + time] = callBack
      window.tantan.imagePicker('imagePickerCallBack' + time)
    } else if (oldIOS_method_checker('imagePicker')) {
      window.imagePicker(callBack)
    } else if (ios_method_checker('imagePicker')) {
      window['imagePickerCallBack' + time] = callBack
      window.webkit.messageHandlers.imagePicker.postMessage({
        success: 'imagePickerCallBack' + time
      })
    } else {
      console.info('无法选取图片', 0.5)
    }
  }
  /**
   * 设置导航栏标题
   * 注: newIos条件下容器会捕获页面的document.title属性并设置为导航栏标题
   * @param title
   */
  function setTitle(title) {
    var fnName = 'setTitle'
    if (android_method_checker(fnName)) {
      window.tantan[fnName](title)
    } else if (oldIOS_method_checker(fnName)) {
      window[fnName](title)
    }
    return '黑钻会员'
  }
  /**
   * 打开活动落地页or用户资料卡
   * 1，弹起用户资料卡片（action="showUserProfileCard" , content=userId）
   * 2，弹出某个活动(action="alertCampaign", content=活动 id)
   * @param action
   * @param content
   * @Param callBack
   */
  function campaignController(action, content, callBack) {
    var uid = genUuid()
    var fnName = 'campaignController'
    window[fnName + 'CallBack' + uid] = callBack
    if (android_method_checker(fnName)) {
      window.tantan[fnName](action, content, fnName + 'CallBack' + uid)
    } else if (oldIOS_method_checker(fnName)) {
      window[fnName](action, content, callBack)
    } else if (ios_method_checker(fnName)) {
      window.webkit.messageHandlers[fnName].postMessage({
        action: action,
        content: content,
        callBack: fnName + 'CallBack' + uid
      })
    } else {
      console.info('campaignController无法调用', 0.5)
    }
  }
  /**
   * 关注
   */
  function follow(params) {
    var uid = genUuid()
    var fnName = 'follow'
    var otherUid = params.otherUid,
      source = params.source,
      liveId = params.liveId,
      success = params.success,
      fail = params.fail,
      isFollow = params.isFollow
    var isNewFollow = Object.keys(params).indexOf('isFollow') > -1 // 新的follow方法在客户端函数名相同，参数多了isFollow
    if (android_method_checker(fnName)) {
      window['successFollow' + uid] = success
      window['failFollow' + uid] = fail
      if (isNewFollow) {
        window.tantan.follow(otherUid, source, liveId, 'successFollow' + uid, 'failFollow' + uid)
      } else {
        window.tantan.follow(otherUid, source, liveId, 'successFollow' + uid, 'failFollow' + uid, isFollow)
      }
    } else if (oldIOS_method_checker(fnName)) {
      window[fnName](otherUid, source, liveId, 'successFollow' + uid, 'failFollow' + uid)
    } else if (ios_method_checker('follow')) {
      return new Promise(function (resolve, reject) {
        window['followSuccess' + uid] = function (res) {
          success()
          resolve(res)
        }
        window['followFailed' + uid] = function (err) {
          fail()
          reject(err)
        }
        var iosParams = {
          otherUid: otherUid,
          source: source,
          liveId: liveId,
          success: 'followSuccess' + uid,
          fail: 'followFailed' + uid
        }
        if (isNewFollow) {
          iosParams.isFollow = isFollow
        }
        window.webkit.messageHandlers[fnName].postMessage(iosParams)
      })
    } else {
      console.info('无法关注', 0.5)
    }
  }

  var oldBridge = function (methodName, restParam) {
    switch (methodName) {
      case 'saveBean':
        return saveBean()
      case 'closeWebview':
        return closeWebviewOld()
      case 'refreshLiveAuth':
        return refreshLiveAuth()
      case 'jumpRecharge':
        return jumpRecharge(restParam)
      case 'refreshGuildAuth':
        return refreshGuildAuth()
      case 'jumpToCover':
        return jumpToCover()
      case 'onTeenModeEnable':
        return onTeenModeEnable(restParam.enable)
      case 'verifyTeenModePassword':
        var verified = restParam.verified,
          scenes = restParam.scenes
        return verifyTeenModePassword(verified, scenes)
      case 'closeLiveCampaignDialog':
        return closeLiveCampaignDialog()
      case 'refreshUserCounters':
        return refreshUserCounters()
      case 'jumpToLiveAnchor':
        return jumpToLiveAnchor()
      case 'action':
        return action$1(restParam.schema)
      case 'jumpToProfile':
        var userId = restParam.userId,
          from = restParam.from
        return jumpToProfile(userId, from)
      case 'jumpToRoom':
        var liveId = restParam.liveId,
          roomId = restParam.roomId,
          source = restParam.source
        return jumpToRoom(liveId, roomId, source)
      case 'onRedPacketOpen':
        return onRedPacketOpen(restParam.ismarqueeredpacket)
      case 'subscribeCampaign':
        return subscribeCampaign(restParam)
      case 'showRechargeDialog':
        return showRechargeDialog()
      case 'liveGiftDialogController':
        var type = restParam.type,
          content = restParam.content,
          callBack = restParam.callBack
        return liveGiftDialogController(type, content, callBack)
      case 'liveNewUserRedPacketController':
        return liveNewUserRedPacketController(restParam.type, restParam.content, restParam.callBack)
      case 'jumpToTopicAggregationAct':
        return jumpToTopicAggregationAct(restParam.id)
      case 'jumpToTopicVoteAggregationAct':
        return jumpToTopicVoteAggregationAct(restParam.id, restParam.topicOwnerId)
      case 'jumpToTopic':
        return jumpToTopic(restParam)
      case 'jumpToProfileAct':
        return jumpToProfileAct$1(restParam.userId, restParam.from)
      case 'startMessagesAct':
        return startMessagesAct(restParam.id, restParam.from)
      case 'jumpToSeeOrBuySee':
        return jumpToSeeOrBuySee()
      case 'registerBarRight':
        return registerBarRight(restParam.key, restParam.callback)
      case 'unRegisterBarRight':
        return unRegisterBarRight()
      case 'imagePicker':
        return imagePicker$1(restParam.success)
      case 'setTitle':
        return setTitle(restParam)
      case 'campaignController':
        return campaignController(restParam.action, restParam.content, restParam.callBack)
      case 'track':
        return track(restParam.key, restParam.params)
      case 'follow':
        return follow(restParam)
      case 'jumpTantanxDownload':
        return jumpTantanxDownload()
      default:
        return {}
    }
  }

  var androidMethodAccessible = function (methodName) {
    return window && window.tantan && typeof window.tantan.canIUse === 'function' && window.tantan.canIUse(methodName)
  }
  /**
   * 获取用户信息
   */
  var getUserInfo$2 = function () {
    var fnName = 'getUserInfo'
    if (androidMethodAccessible(fnName)) {
      try {
        var sourceRes = window.tantan.dispatch(fnName, JSON.stringify([]))
        var res = sourceRes ? JSON.parse(sourceRes) : {} // 未登录情况下安卓返回空串
        return Object.keys(res).length === 0 ? Promise.reject('unknown user') : Promise.resolve(res)
      } catch (e) {
        console.error('internal error')
      }
    }
    if (ios_method_checker(fnName)) {
      var uid_1 = genUuid()
      return new Promise(function (resolve, reject) {
        window[fnName + 'Success' + uid_1] = function (res) {
          resolve(JSON.parse(res))
        }
        window[fnName + 'Fail' + uid_1] = function () {
          reject('unknown user')
        }
        window.webkit.messageHandlers.getUserInfo.postMessage({
          success: fnName + 'Success' + uid_1,
          fail: fnName + 'Fail' + uid_1
        })
      })
    }
    // 若为旧版sdk，则调用saveBean方法
    if (android_method_checker('saveBean') || ios_method_checker('saveBean') || oldIOS_method_checker('saveBean')) {
      return oldBridge('saveBean')
    }
    customConsole('no method matched for getUserInfo')
    return Promise.resolve({
      userId: '10086',
      userName: ''
    })
  }
  /** AB分组的header头 */
  var getAbHeader$1 = function () {
    var fnName = 'getAbHeader'
    if (isAndroid) {
      if (androidMethodAccessible(fnName)) {
        var res = window.tantan.dispatch(fnName, JSON.stringify([]))
        return Promise.resolve(res)
      } else if (android_method_checker(fnName)) {
        return Promise.resolve(window.tantan[fnName]())
      }
    }
    if (oldIOS_method_checker(fnName)) {
      return Promise.resolve(window[fnName]())
    }
    if (ios_method_checker(fnName)) {
      console.log('enter into method getAbHeader')
      return new Promise(function (resolve, reject) {
        var uid = genUuid()
        window[fnName + 'Success' + uid] = function (res) {
          resolve(res)
        }
        window[fnName + 'Fail' + uid] = function (err) {
          reject(err)
        }
        window.webkit.messageHandlers[fnName].postMessage({
          success: fnName + 'Success' + uid,
          fail: fnName + 'Fail' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 获取系统信息
   */
  var getSystemInfo$1 = function () {
    var fnName = 'getSystemInfo'
    if (androidMethodAccessible(fnName)) {
      var res = JSON.parse(window.tantan.dispatch(fnName, JSON.stringify([])))
      if (res.appVersion) {
        res.versionCode = res.appVersion
      }
      if (res.sdkVersion) {
        res.schemeVersion = res.sdkVersion
      }
      if (res.os) {
        res.platform = res.os
      }
      return Promise.resolve(typeof res === 'object' ? res : {})
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        var uid = genUuid()
        window[fnName + 'Success' + uid] = function (res) {
          var result = JSON.parse(res)
          if (result.appVersion) {
            result.versionCode = result.appVersion
          }
          if (result.sdkVersion) {
            result.schemeVersion = result.sdkVersion
          }
          if (result.os) {
            result.platform = result.os
          }
          resolve(result)
        }
        window[fnName + 'Fail' + uid] = function (err) {
          reject(err)
        }
        window.webkit.messageHandlers[fnName].postMessage({
          success: fnName + 'Success' + uid,
          fail: fnName + 'Fail' + uid
        })
      })
    }
    // 若为旧版sdk，则调用saveBean方法
    if (android_method_checker('saveBean') || ios_method_checker('saveBean') || oldIOS_method_checker('saveBean')) {
      return oldBridge('saveBean')
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 获取网络信息
   */
  var getNetworkInfo$1 = function () {
    var fnName = 'getNetworkInfo'
    if (androidMethodAccessible(fnName)) {
      return Promise.resolve(window.tantan.dispatch(fnName, JSON.stringify([])))
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        var uid = genUuid()
        window[fnName + 'Success' + uid] = function (res) {
          var parsed = JSON.parse(res)
          parsed.networkType && resolve(parsed.networkType)
        }
        window[fnName + 'Fail' + uid] = function (err) {
          reject(err)
        }
        window.webkit.messageHandlers[fnName].postMessage({
          success: fnName + 'Success' + uid,
          fail: fnName + 'Fail' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 新开webview
   * @param urlOrSchema url地址或schema地址
   * @param title webview标题
   */
  var openWebview$1 = function (urlOrSchema, title) {
    if (title === void 0) {
      title = ''
    }
    if (!urlOrSchema) {
      throwErr('param url is REQUIRED!')
    }
    var fnName = 'openWebview'
    if (androidMethodAccessible(fnName)) {
      return window.tantan.dispatch(fnName, JSON.stringify(handleAndroidParamArr([urlOrSchema, title])))
    }
    if (ios_method_checker(fnName) && ios_method_checker('jumpWebview')) {
      // 新老版本都存在openwebview的情况，故增加用是否存在jumpWebview来区分是否为新版,若后续需要更精细化的区分，则调用获取系统信息来判断版本号
      var paramBody = urlOrSchema.indexOf('http') === 0 ? { url: urlOrSchema, title: title } : { schema: urlOrSchema, title: title }
      window.webkit.messageHandlers[fnName].postMessage(paramBody)
      return
    }
    // 兼容老版本没有openWebview，针对指定的schema调用老版的bridge方法
    // const migrateSchemas = [
    //     'tantanapp://profile/edit',
    //     'tantanapp://vip/vip/buy',
    //     'tantanapp://vip/boost/buy',
    //     'tantan://liveCover',
    // ]
    if (android_method_checker('action') || ios_method_checker('action') || oldIOS_method_checker('action')) {
      oldBridge('action', { schema: urlOrSchema })
    }
    customConsole('no method matched for openWebview')
  }
  /**
   * 新开webview同时关闭当前webview
   * @param urlOrSchema url地址或schema地址
   * @param title webview标题
   */
  var jumpWebview$1 = function (urlOrSchema, title) {
    if (title === void 0) {
      title = ''
    }
    if (!urlOrSchema) {
      throwErr('param url is REQUIRED!')
    }
    var fnName = 'jumpWebview'
    if (androidMethodAccessible(fnName)) {
      return window.tantan.dispatch(fnName, JSON.stringify(handleAndroidParamArr([urlOrSchema, title])))
    }
    if (ios_method_checker(fnName)) {
      var paramBody = urlOrSchema.indexOf('http') === 0 ? { url: urlOrSchema, title: title } : { schema: urlOrSchema, title: title }
      window.webkit.messageHandlers[fnName].postMessage(paramBody)
    }
    customConsole('no method matched for jumpWebview')
  }
  /**
   * 关闭当前webview
   */
  var closeWebview$1 = function () {
    var fnName = 'closeWebview'
    if (androidMethodAccessible(fnName)) {
      return window.tantan.dispatch(fnName, JSON.stringify([]))
    }
    if (ios_method_checker(fnName)) {
      window.webkit.messageHandlers[fnName].postMessage({})
      return
    }
    if (android_method_checker(fnName) || oldIOS_method_checker(fnName)) {
      return oldBridge(fnName)
    }
    customConsole('no method matched for ' + fnName)
  }
  /**
   * 获取城市信息
   */
  var getCityInfo$1 = function () {
    var fnName = 'getCityInfo'
    if (androidMethodAccessible(fnName)) {
      var res = JSON.parse(window.tantan.dispatch(fnName, JSON.stringify([])))
      return Promise.resolve(typeof res === 'object' ? res : {})
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        var uid = genUuid()
        window[fnName + 'Success' + uid] = function (res) {
          resolve(JSON.parse(res))
        }
        window[fnName + 'Fail' + uid] = function (err) {
          reject(err)
        }
        window.webkit.messageHandlers[fnName].postMessage({
          success: fnName + 'Success' + uid,
          fail: fnName + 'Fail' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 分享（需要指定分享渠道）
   * @param params
   */
  var share$2 = function (params) {
    var url = params.url,
      _a = params.title,
      title = _a === void 0 ? '' : _a,
      _b = params.description,
      description = _b === void 0 ? '' : _b,
      imgUrl = params.imgUrl,
      channel = params.channel
    // if (!url || !channel) { // 兼容 shareImage, url=''
    if (!channel) {
      throw 'param is invalid'
    }
    var fnName = 'share'
    if (isAndroid) {
      var uid_2 = genUuid()
      if (androidMethodAccessible(fnName)) {
        return new Promise(function (resolve, reject) {
          window['success' + uid_2] = function () {
            resolve()
          }
          window['error' + uid_2] = function (e) {
            reject(e)
          }
          var paramArr = JSON.stringify(handleAndroidParamArr([url, title, description, imgUrl, channel, 'success' + uid_2, 'error' + uid_2]))
          window.tantan.dispatch(fnName, paramArr)
        })
      } else if (android_method_checker(fnName)) {
        return new Promise(function (resolve, reject) {
          window['success' + uid_2] = function () {
            resolve()
          }
          window.tantan.share(url, title, description, imgUrl, channel, 'success' + uid_2)
        })
      }
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        var uid = genUuid()
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function (e) {
          console.log('err:', e)
          reject(e)
        }
        window.webkit.messageHandlers[fnName].postMessage({
          url: url,
          title: title,
          shareTitle: title,
          description: description,
          imgUrl: imgUrl,
          pic: imgUrl,
          channel: channel,
          success: 'success' + uid,
          fail: 'error' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 弹窗分享
   */
  var nativeShare$1 = function (params) {
    var url = params.url,
      _a = params.title,
      title = _a === void 0 ? '' : _a,
      _b = params.description,
      description = _b === void 0 ? '' : _b,
      imgUrl = params.imgUrl,
      _c = params.modalTitle,
      modalTitle = _c === void 0 ? '' : _c,
      _d = params.channels,
      channels = _d === void 0 ? '' : _d
    if (!url) {
      throw 'param is invalid'
    }
    var fnName = 'nativeShare'
    var uid = genUuid()
    console.log('nativeShare:', params)
    if (androidMethodAccessible(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        var paramArr = JSON.stringify(handleAndroidParamArr([url, title, description, imgUrl, 'success' + uid, 'error' + uid, modalTitle, channels]))
        window.tantan.dispatch(fnName, paramArr)
      })
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        window.webkit.messageHandlers[fnName].postMessage({
          url: url,
          title: title,
          shareTitle: title,
          description: description,
          imgUrl: imgUrl,
          pic: imgUrl,
          success: 'success' + uid,
          fail: 'error' + uid,
          modalTitle: modalTitle,
          dialogTitle: modalTitle,
          channels: channels,
          platform: channels
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 设置导航栏
   */
  var setNavigation$1 = function (params) {
    var _a = params.title,
      title = _a === void 0 ? '' : _a,
      _b = params.handler,
      handler = _b === void 0 ? Function.prototype : _b,
      _c = params.leftImgUrl,
      leftImgUrl = _c === void 0 ? '' : _c,
      _d = params.leftText,
      leftText = _d === void 0 ? '' : _d,
      _e = params.leftHandler,
      leftHandler = _e === void 0 ? Function.prototype : _e,
      _f = params.rightImgUrl,
      rightImgUrl = _f === void 0 ? '' : _f,
      _g = params.rightText,
      rightText = _g === void 0 ? '' : _g,
      _h = params.rightHandler,
      rightHandler = _h === void 0 ? Function.prototype : _h,
      _j = params.skipBack,
      skipBack = _j === void 0 ? false : _j
    if (!checkIsFn([handler, leftHandler, rightHandler])) {
      return throwErr('handler must be function')
    }
    if (!title) {
      return throwErr('param title is REQUIRED')
    }
    var fnName = 'setNavigation'
    var uid = genUuid()
    window['leftHandler' + uid] = leftHandler
    window['rightHandler' + uid] = rightHandler
    window['handler' + uid] = handler
    if (androidMethodAccessible(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        var paramArr = JSON.stringify(handleAndroidParamArr([title, 'handler' + uid, leftImgUrl, leftText && leftImgUrl ? '' : leftText, 'leftHandler' + uid, rightImgUrl, rightText && rightImgUrl ? '' : rightText, 'rightHandler' + uid, 'success' + uid, 'error' + uid, skipBack]))
        window.tantan.dispatch(fnName, paramArr)
      })
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        window.webkit.messageHandlers[fnName].postMessage({
          title: title,
          handler: 'handler' + uid,
          leftImgUrl: leftImgUrl,
          leftText: leftText && leftImgUrl ? '' : leftText,
          leftHandler: 'leftHandler' + uid,
          rightImgUrl: rightImgUrl,
          rightText: rightText && rightImgUrl ? '' : rightText,
          rightHandler: 'rightHandler' + uid,
          skipBack: skipBack,
          success: 'success' + uid,
          fail: 'error' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 设置导航栏标题
   * @param params
   */
  var setNavigationTitle$1 = function (params) {
    var _a = params.title,
      title = _a === void 0 ? '' : _a,
      _b = params.handler,
      handler = _b === void 0 ? Function.prototype : _b
    if (!checkIsFn([handler])) {
      return throwErr('handler must be function')
    }
    if (!title) {
      return throwErr('param title is REQUIRED')
    }
    var fnName = 'setNavigationTitle'
    var uid = genUuid()
    window['handler' + uid] = handler
    if (androidMethodAccessible(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        var paramArr = JSON.stringify(handleAndroidParamArr([title, 'handler' + uid, 'success' + uid, 'error' + uid]))
        window.tantan.dispatch(fnName, paramArr)
      })
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        window.webkit.messageHandlers[fnName].postMessage({
          title: title,
          handler: 'handler' + uid,
          success: 'success' + uid,
          fail: 'error' + uid
        })
      })
    }
    if (android_method_checker('setTitle') || oldIOS_method_checker('setTitle')) {
      oldBridge('setTitle', title)
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 隐藏导航栏
   */
  var hideNavigation$1 = function () {
    var fnName = 'hideNavigation'
    var uid = genUuid()
    if (androidMethodAccessible(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        var paramArr = JSON.stringify(handleAndroidParamArr(['success' + uid, 'error' + uid]))
        window.tantan.dispatch(fnName, paramArr)
      })
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        window.webkit.messageHandlers[fnName].postMessage({
          success: 'success' + uid,
          fail: 'error' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 设置导航栏左侧按钮
   * @param params
   */
  var setNavLeftButton$1 = function (params) {
    var _a = params.text,
      text = _a === void 0 ? '' : _a,
      _b = params.imgUrl,
      imgUrl = _b === void 0 ? '' : _b,
      skipBack = params.skipBack,
      _c = params.handler,
      handler = _c === void 0 ? Function.prototype : _c
    if (!checkIsFn([handler])) {
      return throwErr('handler must be function')
    }
    if (!text && !imgUrl) {
      throwErr('param missing')
    }
    var fnName = 'setNavLeftButton'
    var uid = genUuid()
    window['handler' + uid] = handler
    if (androidMethodAccessible(fnName)) {
      console.log('setNavLeftButton-oood:', [!text && imgUrl ? imgUrl : '', text, 'handler' + uid, 'success' + uid, 'error' + uid])
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          console.log('successssss-setleft')
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        var paramArr = JSON.stringify(handleAndroidParamArr([!text && imgUrl ? imgUrl : '', text, 'handler' + uid, 'success' + uid, 'error' + uid]))
        window.tantan.dispatch(fnName, paramArr)
      })
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          console.log('success-iosssss')
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        window.webkit.messageHandlers[fnName].postMessage({
          text: text,
          imgUrl: imgUrl,
          skipBack: skipBack,
          handler: 'handler' + uid,
          success: 'success' + uid,
          fail: 'error' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 设置导航栏右侧按钮
   * @param params
   */
  var setNavRightButton$1 = function (params) {
    var _a = params.text,
      text = _a === void 0 ? '' : _a,
      _b = params.imgUrl,
      imgUrl = _b === void 0 ? '' : _b,
      _c = params.handler,
      handler = _c === void 0 ? Function.prototype : _c
    if (!checkIsFn([handler])) {
      return throwErr('handler must be function')
    }
    if (!text && !imgUrl) {
      throwErr('param missing')
    }
    var fnName = 'setNavRightButton'
    var uid = genUuid()
    window['handler' + uid] = handler
    if (androidMethodAccessible(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        var paramArr = JSON.stringify(handleAndroidParamArr([!text && imgUrl ? imgUrl : '', text, 'handler' + uid, 'success' + uid, 'error' + uid]))
        window.tantan.dispatch(fnName, paramArr)
      })
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        window.webkit.messageHandlers[fnName].postMessage({
          text: text,
          imgUrl: imgUrl,
          handler: 'handler' + uid,
          success: 'success' + uid,
          fail: 'error' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 系统原生toast提醒
   * @param params
   */
  var showToast$1 = function (params) {
    var context = params.context,
      _a = params.duration,
      duration = _a === void 0 ? 3000 : _a
    if (!context) {
      return throwErr('param context is REQUIRED')
    }
    var fnName = 'showToast'
    if (androidMethodAccessible(fnName)) {
      var paramArr = JSON.stringify(handleAndroidParamArr([context, duration]))
      window.tantan.dispatch('showToast', paramArr)
      return
    }
    if (ios_method_checker(fnName)) {
      window.webkit.messageHandlers[fnName].postMessage({
        context: context,
        duration: duration
      })
      return
    }
    customConsole('no method matched for ' + fnName)
  }
  /**
   * 设置指定键值的本地存储
   * @param params
   */
  var setStorage$1 = function (params) {
    var key = params.key,
      data = params.data
    var fnName = 'setStorage'
    if (!key || !data) {
      return throwErr('param key & data is REQUIRED')
    }
    var uid = genUuid()
    if (androidMethodAccessible(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        var paramArr = JSON.stringify(handleAndroidParamArr([key, data, 'success' + uid, 'error' + uid]))
        window.tantan.dispatch(fnName, paramArr)
      })
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        window.webkit.messageHandlers[fnName].postMessage({
          key: key,
          data: data,
          success: 'success' + uid,
          fail: 'error' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 获取指定键值的本地存储
   * @param key
   */
  var getStorage$1 = function (key) {
    var handleJsonString = function (string) {
      if (!string) {
        return ''
      }
      if (/^{.*}$/.test(string)) {
        return JSON.parse(string)
      }
      return string
    }
    if (!key) {
      return throwErr('param key is REQUIRED')
    }
    var fnName = 'getStorage'
    if (androidMethodAccessible(fnName)) {
      var paramArr = JSON.stringify(handleAndroidParamArr([key]))
      var res = window.tantan.dispatch('getStorage', paramArr)
      console.log('getStorage:', res)
      if (res === 'KEY_NOT_EXIST') {
        return Promise.reject('1')
      } else {
        return Promise.resolve(handleJsonString(res))
      }
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        var uid = genUuid()
        window[fnName + 'Success' + uid] = function (res) {
          resolve(handleJsonString(res))
        }
        window[fnName + 'Fail' + uid] = function (err) {
          reject(err)
        }
        window.webkit.messageHandlers[fnName].postMessage({
          key: key,
          success: fnName + 'Success' + uid,
          fail: fnName + 'Fail' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 移除指定键值的本地存储
   * @param params
   */
  var removeStorage$1 = function (params) {
    var key = params.key
    if (!key) {
      return throwErr('param key is REQUIRED')
    }
    var fnName = 'removeStorage'
    var uid = genUuid()
    if (androidMethodAccessible(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        var paramArr = JSON.stringify(handleAndroidParamArr([key, 'success' + uid, 'error' + uid]))
        window.tantan.dispatch(fnName, paramArr)
      })
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        window.webkit.messageHandlers[fnName].postMessage({
          key: key,
          success: 'success' + uid,
          fail: 'error' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 清空本地存储
   */
  var clearStorage$1 = function () {
    var fnName = 'clearStorage'
    var uid = genUuid()
    if (androidMethodAccessible(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        var paramArr = JSON.stringify(handleAndroidParamArr(['success' + uid, 'error' + uid]))
        window.tantan.dispatch(fnName, paramArr)
      })
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        window.webkit.messageHandlers[fnName].postMessage({
          success: 'success' + uid,
          fail: 'error' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 客户端基于约定的消息完成对应的操作(比如刷新用户信息等)
   * @param params
   */
  var triggerAction$1 = function (params) {
    var actionType = params.actionType,
      _a = params.restParams,
      restParams = _a === void 0 ? {} : _a
    if (!actionType) {
      return throwErr('param actionType is REQUIRED')
    }
    //   if (process.env.NODE_ENV !== "production") {
    //       console.log("action type is => ", actionType);
    //       console.log("action params is");
    //       console.log(params);
    //   }
    var fnName = 'triggerAction'
    var uid = genUuid()
    var handleRestParams = function (params) {
      var resParams = {}
      Object.keys(params).forEach(function (key) {
        if (typeof params[key] === 'function') {
          window[actionType + '_' + key + '_' + uid] = params[key]
          return (resParams[key] = actionType + '_' + key + '_' + uid)
        }
        resParams[key] = params[key]
      })
      return resParams
    }
    if (actionType === 'track' && restParams.params && Object.prototype.toString.call(restParams.params) === '[object Object]') {
      var kvs = []
      for (var key in restParams.params) {
        kvs = kvs.concat(String(key), String(restParams.params[key]))
      }
      restParams.params = kvs
    }
    if (android_method_checker('triggerAction')) {
      var filterParams_1 = handleRestParams(restParams)
      // todo track的特殊逻辑是否要下放至业务项目
      var restParamsArr = Object.keys(filterParams_1).map(function (x) {
        return filterParams_1[x]
      })
      var paramArr = JSON.stringify(handleAndroidParamArr(restParamsArr))
      return window.tantan.triggerAction(actionType, paramArr)
    }
    if (ios_method_checker(fnName)) {
      return window.webkit.messageHandlers[fnName].postMessage(__assign({ actionType: actionType }, handleRestParams(restParams)))
    }
    var migrateMethods = [
      'refreshLiveAuth',
      'jumpRecharge',
      'refreshGuildAuth',
      'jumpToCover',
      'onTeenModeEnable',
      'verifyTeenModePassword',
      'dialogJumpRecharge',
      'closeLiveCampaignDialog',
      'refreshUserCounters',
      'jumpToLiveAnchor',
      'jumpToProfile',
      'jumpToRoom',
      'onRedPacketOpen',
      'subscribeCampaign',
      'showRechargeDialog',
      'liveGiftDialogController',
      'campaignController',
      'track',
      'jumpToSeeOrBuySee',
      'unRegisterBarRight',
      'registerBarRight',
      'follow',
      'liveNewUserRedPacketController',
      'imagePicker',
      'jumpToTopicAggregationAct',
      'jumpToTopicVoteAggregationAct',
      'jumpToTopic',
      'jumpToProfileAct',
      'jumpTantanxDownload'
    ]
    if (~migrateMethods.indexOf(actionType) && (android_method_checker(actionType) || ios_method_checker(actionType) || oldIOS_method_checker(actionType))) {
      console.log('method triggerAction not exist, enter oldBridgeHandler')
      return oldBridge(actionType, restParams)
    }
    // IOS中track方法名为trackEvent
    if (actionType === 'track' && (ios_method_checker('trackEvent') || oldIOS_method_checker('trackEvent'))) {
      return oldBridge(actionType, restParams)
    }
    customConsole('no method matched for ' + fnName)
  }
  /**
   * 订阅(h5订阅指定type的消息，当事件触发时客户端调用订阅该消息的webview传入的回调函数)
   * @param params
   */
  var subscribe$1 = function (params) {
    var subscribeType = params.subscribeType,
      _a = params.subscribeHandler,
      subscribeHandler = _a === void 0 ? Function.prototype : _a
    if (!subscribeType) {
      return throwErr('param subscribeType is REQUIRED')
    }
    if (!checkIsFn([subscribeHandler])) {
      return throwErr('handler must be function')
    }
    var fnName = 'subscribe'
    var uid = genUuid()
    window['subscribeHandler' + uid] = subscribeHandler
    if (androidMethodAccessible(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        var paramArr = JSON.stringify(handleAndroidParamArr([subscribeType, 'subscribeHandler' + uid, 'success' + uid, 'error' + uid]))
        window.tantan.dispatch(fnName, paramArr)
      })
    }
    if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function (res) {
          console.log('subscribe-success')
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        window.webkit.messageHandlers[fnName].postMessage({
          subscribeType: subscribeType,
          success: 'success' + uid,
          fail: 'error' + uid,
          subscribeHandler: 'subscribeHandler' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**获取HMAC版的授权码
   * getAuthorizationHeader函数被重载, 在安卓下不可进行重命名
   */
  var getAuthorizationHeader$1 = function (url, body) {
    var fnName = 'getAuthorizationHeader'
    if (isAndroid) {
      if (androidMethodAccessible(fnName)) {
        var paramArr = JSON.stringify(handleAndroidParamArr([url, body || '']))
        var res = window.tantan.dispatch(fnName, paramArr)
        return Promise.resolve(res)
      } else if (android_method_checker(fnName)) {
        if (body) {
          return Promise.resolve(window.tantan[fnName](url, JSON.stringify(body)))
        } else {
          return Promise.resolve(window.tantan[fnName](url))
        }
      }
    } else if (oldIOS_method_checker(fnName)) {
      if (body) {
        return window[fnName](url, JSON.stringify(body))
      } else {
        return window[fnName](url)
      }
    } else if (ios_method_checker(fnName)) {
      return new Promise(function (resolve, reject) {
        var uid = genUuid()
        window[fnName + 'Success' + uid] = function (res) {
          resolve(res)
        }
        window[fnName + 'Fail' + uid] = function (err) {
          reject(err)
        }
        window.webkit.messageHandlers.getAuthorizationHeader.postMessage({
          url: url,
          body: body ? JSON.stringify(body) : undefined,
          success: fnName + 'Success' + uid,
          fail: fnName + 'Fail' + uid
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /** 新打点 */
  function trackNew$1(trackData) {
    var fnName = 'trackNew'
    if (isAndroid) {
      var type = trackData.type,
        pageId = trackData.pageId,
        _a = trackData.eid,
        eid = _a === void 0 ? '' : _a,
        extras = trackData.extras
      var kvs = []
      if (extras) {
        for (var key in extras) {
          kvs = kvs.concat(String(key), String(extras[key]))
        }
      }
      if (androidMethodAccessible(fnName)) {
        var paramsArr = handleAndroidParamArr([type, eid, pageId, kvs])
        return window.tantan.dispatch(fnName, JSON.stringify(paramsArr))
      } else if (android_method_checker(fnName)) {
        return window.tantan.trackNew(type, eid, pageId, kvs)
      }
    } else if (oldIOS_method_checker('trackNew')) {
      window.trackNew(trackData)
    } else if (ios_method_checker('trackNew')) {
      return window.webkit.messageHandlers.trackNew.postMessage(trackData)
    } else {
      console.info('无法进行新打点', 0.5)
    }
  }
  /** 6. 绑定支付宝 */
  function bindAlipay$1(_a) {
    var successAlipay = _a.successAlipay,
      failAlipay = _a.failAlipay
    var uid = genUuid()
    var fnName = 'bindAlipay'
    if (isAndroid) {
      window['successAlipay' + uid] = successAlipay
      window['failAlipay' + uid] = failAlipay
      if (androidMethodAccessible(fnName)) {
        return window.tantan.dispatch(fnName, JSON.stringify(handleAndroidParamArr(['successAlipay' + uid, 'failAlipay' + uid])))
      } else if (android_method_checker(fnName)) {
        return window.tantan[fnName]('successAlipay' + uid, 'failAlipay' + uid)
      }
    } else if (oldIOS_method_checker(fnName)) {
      return window[fnName](successAlipay, failAlipay)
    } else if (ios_method_checker(fnName)) {
      window['successAlipay' + uid] = successAlipay
      window['failAlipay' + uid] = failAlipay
      window.webkit.messageHandlers.bindAlipay.postMessage({
        success: 'successAlipay' + uid,
        fail: 'failAlipay' + uid
      })
    } else {
      return console.info('无法绑定支付宝', 0.5)
    }
  }
  function getABNames$1() {
    return __awaiter(this, void 0, void 0, function () {
      var transStringToArr, fnName
      return __generator(this, function (_a) {
        transStringToArr = function (str, ios) {
          var result = []
          if (str.length > 2 && !ios) {
            result = str.slice(1, -1).split(',')
          }
          if (str.length > 2 && ios) {
            result = JSON.parse(str)
          }
          return result
        }
        fnName = 'getABNames'
        if (isAndroid) {
          return [2 /*return*/, Promise.resolve(transStringToArr(window.tantan.dispatch(fnName, JSON.stringify([])), false))]
        } else if (oldIOS_method_checker(fnName)) {
          return [2 /*return*/, transStringToArr(window[fnName](), true)]
        } else if (ios_method_checker(fnName)) {
          return [
            2 /*return*/,
            new Promise(function (resolve, reject) {
              var time = Math.floor(Math.random() * 100)
              window['getABNamesSuccess' + time] = function (res) {
                resolve(transStringToArr(res, true))
              }
              window['getABNamesFail' + time] = function (err) {
                reject(err)
              }
              window.webkit.messageHandlers.getABNames.postMessage({
                success: 'getABNamesSuccess' + time,
                fail: 'getABNamesFail' + time
              })
            })
          ]
        }
        return [2 /*return*/, Promise.reject('no method matched for ' + fnName)]
      })
    })
  }
  var getDeviceNotchInfo$1 = function () {
    var fnName = 'getDeviceNotchInfo'
    if (androidMethodAccessible(fnName)) {
      try {
        var res = window.tantan.dispatch(fnName, JSON.stringify([]))
        return Promise.resolve(res ? JSON.parse(res) : {})
      } catch (e) {
        console.error('internal error')
      }
    }
    if (ios_method_checker(fnName)) {
      var uid_3 = genUuid()
      return new Promise(function (resolve, reject) {
        window[fnName + 'Success' + uid_3] = function (res) {
          console.log('getDeviceNotchInfo-old:', res)
          var finalRes = res ? JSON.parse(res) : {}
          if (typeof finalRes.isNotch === 'number') {
            finalRes.isNotch = Boolean(finalRes.isNotch)
          }
          resolve(finalRes)
        }
        window[fnName + 'Fail' + uid_3] = function () {
          reject('getDeviceNotchInfoFail')
        }
        window.webkit.messageHandlers[fnName].postMessage({
          success: fnName + 'Success' + uid_3,
          fail: fnName + 'Fail' + uid_3
        })
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  /**
   * 设置状态栏背景色
   * @param color
   */
  var changeNotchBackgroundColor$1 = function (color) {
    if (!color || typeof color !== 'string') {
      throwErr('param color is invalid!')
    }
    var fnName = 'changeNotchBackgroundColor'
    var resColor = color.replace('#', '')
    if (androidMethodAccessible(fnName)) {
      return window.tantan.dispatch(fnName, JSON.stringify(handleAndroidParamArr([resColor])))
    }
    if (ios_method_checker(fnName)) {
      return window.webkit.messageHandlers[fnName].postMessage({
        color: resColor
      })
    }
    customConsole('no method matched for ' + fnName)
  }
  /**
   * 设置webview背景色
   * @param color
   */
  var changeWebviewBackgroundColor$1 = function (color) {
    if (!color || typeof color !== 'string') {
      throwErr('param color is invalid!')
    }
    var fnName = 'changeWebviewBackgroundColor'
    var resColor = color.replace('#', '')
    if (androidMethodAccessible(fnName)) {
      return window.tantan.dispatch(fnName, JSON.stringify(handleAndroidParamArr([resColor])))
    }
    if (ios_method_checker(fnName)) {
      console.log(fnName, resColor)
      return window.webkit.messageHandlers[fnName].postMessage({
        color: resColor
      })
    }
    customConsole('no method matched for ' + fnName)
  }
  /**
   * 隐藏状态栏
   */
  var hideNotch$1 = function () {
    var fnName = 'hideNotch'
    if (androidMethodAccessible(fnName)) {
      return window.tantan.dispatch(fnName, JSON.stringify(handleAndroidParamArr([])))
    }
    if (ios_method_checker(fnName)) {
      return window.webkit.messageHandlers[fnName].postMessage({})
    }
    customConsole('no method matched for ' + fnName)
  }
  /**
   * 显示状态栏
   */
  var showNotch$1 = function () {
    var fnName = 'showNotch'
    if (androidMethodAccessible(fnName)) {
      return window.tantan.dispatch(fnName, JSON.stringify(handleAndroidParamArr([])))
    }
    if (ios_method_checker(fnName)) {
      return window.webkit.messageHandlers[fnName].postMessage({})
    }
    customConsole('no method matched for ' + fnName)
  }
  /**
   * IOS 禁止页面回弹
   */
  var disableBounce$1 = function () {
    var fnName = 'disableBounce'
    if (isiOS) {
      if (ios_method_checker(fnName)) {
        return window.webkit.messageHandlers[fnName].postMessage({})
      }
      return customConsole('no method matched for ' + fnName)
    }
    customConsole(fnName + ' is only used in ios')
  }
  /**
   * 判断method方法是否可用
   * @param method
   */
  var canIUse$1 = function (method) {
    if (!method || typeof method !== 'string') {
      customConsole('invalid param method!')
      return false
    }
    if (isiOS) {
      return ios_method_checker(method)
    }
    if (isAndroid) {
      return androidMethodAccessible(method)
    }
    return false
  }
  // 添加新的bridge返回可分享渠道。
  function getShareChannel$1() {
    return __awaiter(this, void 0, void 0, function () {
      var fnName, sourceRes, res, uid_4
      return __generator(this, function (_a) {
        fnName = 'getShareChannel'
        if (androidMethodAccessible(fnName)) {
          try {
            sourceRes = window.tantan.dispatch(fnName, JSON.stringify([]))
            res = sourceRes ? JSON.parse(sourceRes) : {}
            return [2 /*return*/, Object.keys(res).length === 0 ? Promise.resolve([]) : Promise.resolve(res)]
          } catch (e) {
            console.error('internal error')
          }
        }
        if (ios_method_checker(fnName)) {
          uid_4 = genUuid()
          return [
            2 /*return*/,
            new Promise(function (resolve, reject) {
              window[fnName + 'Success' + uid_4] = function (res) {
                console.log(res)
                // iOS返回 wx / qq / wb 需要我们手动添加 mo / qz
                var resArr = JSON.parse(res)
                if (resArr.includes('wx')) resArr.push('mo')
                if (resArr.includes('qq')) resArr.push('qz')
                resolve(resArr)
              }
              window[fnName + 'Fail' + uid_4] = function () {
                reject('unknown user')
              }
              window.webkit.messageHandlers[fnName].postMessage({
                success: fnName + 'Success' + uid_4,
                fail: fnName + 'Fail' + uid_4
              })
            })
          ]
        }
        customConsole('no method matched for getShareChannel')
        // 默认旧版本app仅支持微信
        return [2 /*return*/, Promise.resolve(['wx'])]
      })
    })
  }
  var getNetworkEnv$1 = function (callback) {
    var fnName = 'getNetworkEnv'
    triggerAction$1({
      actionType: fnName,
      restParams: {
        setNetworkEnv: function (res) {
          console.log(fnName, '获取当前环境', res)
          if (res === '0') {
            // 当前是测试环境
            callback && callback('staging2')
          } else {
            // 当前是线上环境
            callback && callback('online')
          }
        }
      }
    })
  }
  var setOnKeyBack$1 = function (params) {
    var handler = params.handler
    var fnName = 'setOnKeyBack'
    var uid = genUuid()
    window['handler' + uid] = handler
    if (androidMethodAccessible(fnName)) {
      return new Promise(function (resolve, reject) {
        window['success' + uid] = function () {
          resolve()
        }
        window['error' + uid] = function () {
          reject()
        }
        var paramArr = JSON.stringify(handleAndroidParamArr(['handler' + uid]))
        window.tantan.dispatch(fnName, paramArr)
      })
    }
    return Promise.reject('no method matched for ' + fnName)
  }
  var androidHandler = function (androidPar, fnName) {
    var _a
    if (androidMethodAccessible(fnName)) {
      console.log(handleAndroidParamArr(androidPar))
      window.tantan.dispatch(fnName, JSON.stringify(handleAndroidParamArr(androidPar)))
    } else if (android_method_checker(fnName)) {
      ;(_a = window.tantan)[fnName].apply(_a, androidPar)
    } else {
      throw new Error('没有这个Bridge')
    }
  }
  /**
   * 保存图片
   * @param params
   */
  var imageSave$1 = function (params) {
    var url = params.url
    var fnName = 'imageSave'
    var callbackName = 'callback' + genUuid()
    var callbackFn = function (resolve, reject) {
      return function (data) {
        console.log(fnName, data)
        if (data !== 'success') return reject(data)
        resolve()
      }
    }
    return new Promise(function (resolve, reject) {
      window[callbackName] = callbackFn(resolve, reject)
      try {
        if (isAndroid) {
          androidHandler([url, callbackName], fnName)
        } else if (ios_method_checker(fnName)) {
          window.webkit.messageHandlers[fnName].postMessage({ url: url, callback: callbackName })
        } else {
          reject('no method matched for ' + fnName)
        }
      } catch (e) {
        reject('no method matched for ' + fnName)
      }
    })
  }
  /**
   * 保存Base64图片
   * @param params
   */
  var saveBase64ImageData$1 = function (params) {
    var data = params.data
    var fnName = 'saveBase64ImageData'
    var callbackName = 'callback' + genUuid()
    var callbackFn = function (resolve, reject) {
      return function (data) {
        if (data !== 'success') return reject(data)
        resolve(data)
      }
    }
    return new Promise(function (resolve, reject) {
      window[callbackName] = callbackFn(resolve, reject)
      try {
        if (isAndroid) {
          androidHandler([data, callbackName], fnName)
        } else if (ios_method_checker(fnName)) {
          window.webkit.messageHandlers[fnName].postMessage({ data: data, callback: callbackName })
        }
      } catch (e) {
        reject('no method matched for ' + fnName)
      }
    })
  }
  /**
   * 分享好友面板
   * @param params
   * @returns
   */
  var shareFriends$1 = function (params) {
    var fnName = 'shareFriends'
    var callbackName = 'callback' + genUuid()
    var callbackFn = function (resolve, reject) {
      return function () {
        var args = []
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i]
        }
        var status, userIDList
        if (isAndroid) {
          status = args[0]
          userIDList = args[1]
        } else {
          var data = JSON.parse(args[0])
          status = data.shift()
          userIDList = __spreadArrays(data).join(',')
        }
        if (status !== 'success') return reject(status)
        if (params.callback && typeof params.callback === 'function') {
          params.callback(status, userIDList)
        }
        resolve({ status: status, userIDList: userIDList })
      }
    }
    return new Promise(function (resolve, reject) {
      window[callbackName] = callbackFn(resolve, reject)
      if (androidMethodAccessible(fnName)) {
        triggerAction$1({
          actionType: fnName,
          restParams: __assign(__assign({}, params), { callback: callbackName })
        })
        return
      }
      if (ios_method_checker(fnName)) {
        return window.webkit.messageHandlers[fnName].postMessage(__assign(__assign({}, params), { callback: callbackName }))
      }
      reject('error')
    })
  }
  // 添加新的bridge监听关闭webview事件，当前webview关闭之后的回调
  function setWebviewPageID$1(_a) {
    var pageID = _a.pageID,
      _b = _a.extras,
      extras = _b === void 0 ? {} : _b
    return __awaiter(this, void 0, void 0, function () {
      var fnName, kvs, key, paramsArr
      return __generator(this, function (_c) {
        fnName = 'setWebviewPageID'
        kvs = []
        if (extras) {
          for (key in extras) {
            kvs = kvs.concat(String(key), String(extras[key]))
          }
        }
        if (androidMethodAccessible(fnName)) {
          paramsArr = handleAndroidParamArr([pageID, kvs])
          return [2 /*return*/, window.tantan.dispatch(fnName, JSON.stringify(paramsArr))]
        }
        if (ios_method_checker(fnName)) {
          window.webkit.messageHandlers[fnName].postMessage({ pageID: pageID, extra: extras })
          return [2 /*return*/]
        }
        if (android_method_checker(fnName) || oldIOS_method_checker(fnName)) {
          return [2 /*return*/, oldBridge(fnName)]
        }
        customConsole('no method matched for ' + fnName)
        return [2 /*return*/]
      })
    })
  }
  /**
   * 分享图片（需要指定分享渠道）--- 无返回值
   * iOS 分享图片复用share逻辑
   * @param params
   */
  var shareImage$1 = function (params) {
    var pic = params.pic,
      platform = params.platform
    if (!pic || !platform) {
      throwErr('param is invalid')
    }
    var fnName = 'shareImage'
    return new Promise(function (resolve, reject) {
      try {
        if (isAndroid) {
          androidHandler([pic, platform], fnName)
        } else if (ios_method_checker('share')) {
          // iOS 复用share逻辑
          share$2({
            url: '',
            title: '',
            description: '',
            imgUrl: pic,
            channel: platform
          })
        }
      } catch (e) {
        reject('no method matched for ' + fnName)
      }
    })
  }

  var IS_MK$i = bridge_basic_mm.is_mk
  var platform$4 = bridge_basic_mm.platform
  /**
   * 获取用户的实验组信息
   * @returns string[] 实验组名称组成的字符串数组
   */
  register('tantan', 'getABNames', '5.1.8', '5.1.8')
  function getABNames() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!IS_MK$i) return [3 /*break*/, 2]
            return [
              4 /*yield*/,
              mmWrapper({
                common: ['tantan', 'getABNames', {}, true]
              })
            ]
          case 1:
            return [2 /*return*/, _a.sent()]
          case 2:
            return [2 /*return*/, getABNames$1()]
        }
      })
    })
  }
  /**
   * 获取AB分组的header头信息
   * @returns string[] header信息
   */
  register('tantan', 'getAbHeader', '5.2.7', '5.2.8')
  function getAbHeader() {
    return __awaiter(this, void 0, void 0, function () {
      var abHeader
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!IS_MK$i) return [3 /*break*/, 4]
            if (!(platform$4.toLowerCase() === 'ios')) return [3 /*break*/, 1]
            return [
              2 /*return*/,
              oldWrapper({
                common: ['tantan_ab', 'getAbHeader', {}]
              })
            ]
          case 1:
            return [
              4 /*yield*/,
              mmWrapper({
                common: ['tantan_ab', 'getAbHeader', {}, true]
              })
            ]
          case 2:
            abHeader = _a.sent()
            return [2 /*return*/, JSON.stringify(abHeader)]
          case 3:
            return [3 /*break*/, 5]
          case 4:
            return [2 /*return*/, getAbHeader$1()]
          case 5:
            return [2 /*return*/]
        }
      })
    })
  }

  var abTest = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getABNames: getABNames,
    getAbHeader: getAbHeader
  })

  var IS_MK$h = bridge_basic_mm.is_mk
  /** 打点 */
  register('tantan', 'trackNew', '5.1.8', '5.1.8')
  function trackNew(param) {
    if (IS_MK$h) {
      mmWrapper({
        common: ['tantan', 'trackNew', param]
      })
    } else {
      trackNew$1(param)
    }
  }
  /**
   * 订阅
   * h5订阅指定type的消息，当事件触发时客户端调用订阅该消息的webview传入的回调函数
   * @param param
   */
  register('tantan', 'subscribe', '5.2.7', '5.2.8')
  function subscribe(param) {
    if (IS_MK$h) {
      return oldWrapper({
        common: ['tantan_action', 'subscribe', param]
      })
    } else {
      return subscribe$1(param)
    }
  }
  /** 跳转桌面 */
  register('tantan', 'jumpToLauncher', '5.2.9', '5.2.10')
  function jumpToLauncher() {
    if (IS_MK$h) {
      bridge_basic_mm.build({
        common: ['tantan_action', 'jumpToLauncher', {}]
      })
    } else {
      triggerAction$1({
        actionType: 'jumpToLauncher'
      })
    }
  }

  var action = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    trackNew: trackNew,
    subscribe: subscribe,
    jumpToLauncher: jumpToLauncher
  })

  var IS_MK$g = bridge_basic_mm.is_mk
  var platform$3 = bridge_basic_mm.platform
  /**
   * 获取当前网络环境，用于区分线上环境和测试环境
   * @returns
   */
  register('tantan', 'getNetworkEnv', '5.1.8', '5.1.8')
  function getNetworkEnv() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$g) {
          return [
            2 /*return*/,
            mmWrapper({
              common: ['tantan', 'getNetworkEnv', {}, true]
            })
          ]
        } else {
          return [
            2 /*return*/,
            new Promise(function (resolve) {
              getNetworkEnv$1(function (env) {
                resolve({
                  pkgtype: '',
                  env: env
                })
              })
            })
          ]
        }
      })
    })
  }
  /** 获取网络信息 */
  register('tantan', 'getNetworkInfo', '5.1.8', '5.1.8')
  function getNetworkInfo(callback) {
    return __awaiter(this, void 0, void 0, function () {
      var res, res
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!IS_MK$g) return [3 /*break*/, 2]
            return [
              4 /*yield*/,
              mmWrapper({
                common: ['tantan', 'getNetworkInfo', {}, true]
              })
            ]
          case 1:
            res = _a.sent()
            callback && callback(res)
            return [2 /*return*/, res]
          case 2:
            return [4 /*yield*/, getNetworkInfo$1()]
          case 3:
            res = _a.sent()
            callback && callback(res)
            return [2 /*return*/, res]
        }
      })
    })
  }
  /** 获取系统信息 */
  register('tantan', 'getSystemInfo', '5.2.4', '5.2.5')
  function getSystemInfo() {
    return __awaiter(this, void 0, void 0, function () {
      var result, extRes
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!IS_MK$g) return [3 /*break*/, 2]
            return [
              4 /*yield*/,
              mmWrapper({
                common: ['tantan_device', 'getSystemInfo', {}, true]
              })
            ]
          case 1:
            result = _a.sent()
            extRes = __assign({}, result)
            if (result.appVersion) {
              extRes.versionCode = result.appVersion
            }
            if (result.sdkVersion) {
              extRes.schemeVersion = result.sdkVersion
            }
            if (result.os) {
              extRes.platform = result.os
            }
            return [2 /*return*/, extRes]
          case 2:
            return [2 /*return*/, getSystemInfo$1()]
        }
      })
    })
  }
  /**
   * 获取定位城市信息
   * @returns
   */
  register('tantan', 'getCityInfo', '5.2.7', '5.2.8')
  function getCityInfo() {
    return __awaiter(this, void 0, void 0, function () {
      var res, finalRes
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!IS_MK$g) return [3 /*break*/, 3]
            if (!(platform$3.toLowerCase() === 'ios')) return [3 /*break*/, 2]
            return [
              4 /*yield*/,
              oldWrapper({
                common: ['tantan_device', 'getCityInfo', {}]
              })
            ]
          case 1:
            res = _a.sent()
            finalRes = {}
            try {
              finalRes = JSON.parse(res)
            } catch (e) {}
            return [2 /*return*/, finalRes]
          case 2:
            return [
              2 /*return*/,
              mmWrapper({
                common: ['tantan_device', 'getCityInfo', {}, true]
              })
            ]
          case 3:
            return [2 /*return*/, getCityInfo$1()]
        }
      })
    })
  }
  /**
   * 获取当前刘海屏信息
   * @returns
   */
  register('tantan', 'getDeviceNotchInfo', '5.2.7', '5.2.8')
  function getDeviceNotchInfo() {
    return __awaiter(this, void 0, void 0, function () {
      var res, finalRes
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!IS_MK$g) return [3 /*break*/, 5]
            if (!(platform$3.toLowerCase() === 'ios')) return [3 /*break*/, 2]
            return [
              4 /*yield*/,
              oldWrapper({
                common: ['tantan_device', 'getDeviceNotchInfo', {}]
              })
            ]
          case 1:
            res = _a.sent()
            finalRes = {}
            try {
              finalRes = JSON.parse(res)
            } catch (e) {
              finalRes = {}
            }
            if (typeof finalRes.isNotch === 'number') {
              finalRes.isNotch = Boolean(finalRes.isNotch)
            }
            return [2 /*return*/, finalRes]
          case 2:
            return [
              4 /*yield*/,
              mmWrapper({
                common: ['tantan_device', 'getDeviceNotchInfo', {}, true]
              })
            ]
          case 3:
            return [2 /*return*/, _a.sent()]
          case 4:
            return [3 /*break*/, 6]
          case 5:
            return [2 /*return*/, getDeviceNotchInfo$1()]
          case 6:
            return [2 /*return*/]
        }
      })
    })
  }

  var device = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getNetworkEnv: getNetworkEnv,
    getNetworkInfo: getNetworkInfo,
    getSystemInfo: getSystemInfo,
    getCityInfo: getCityInfo,
    getDeviceNotchInfo: getDeviceNotchInfo
  })

  var IS_MK$f = bridge_basic_mm.is_mk
  /** 获取HMAC信息 */
  register('tantan', 'getAuthorizationHeader', '5.1.8', '5.1.8')
  function getAuthorizationHeader(url, body, callback) {
    return __awaiter(this, void 0, void 0, function () {
      var hasBody, param, hmacRes, hmacRes
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            hasBody = Object.keys(body || {}).length > 0
            if (!IS_MK$f) return [3 /*break*/, 2]
            param = __assign({ url: url }, hasBody ? { body: JSON.stringify(body) } : {})
            return [
              4 /*yield*/,
              mmWrapper({
                common: ['tantan', 'getAuthorizationHeader', param, true]
              })
            ]
          case 1:
            hmacRes = _a.sent()
            callback && callback(hmacRes)
            return [2 /*return*/, hmacRes]
          case 2:
            return [4 /*yield*/, getAuthorizationHeader$1(url, hasBody ? body : null)]
          case 3:
            hmacRes = _a.sent()
            callback && callback(hmacRes)
            return [2 /*return*/, hmacRes]
        }
      })
    })
  }

  var hmac = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getAuthorizationHeader: getAuthorizationHeader
  })

  /**
   * 图片多选状态码
   * 错误码, 0: 成功, 1: 无权限失败 2: 内存不足 3: 取消 4:上传失败
   */
  var PickImagesCodeMap = {
    0: '成功',
    1: '无权限失败',
    2: '内存不足',
    3: '取消',
    4: '上传失败',
    5: '未知异常'
  }
  /**
   * 文件类型和base64前缀映射
   */
  var Base64PrefixMap = {
    // 图片
    'image/png': 'data:image/png;base64,',
    'image/jpg': 'data:image/jpeg;base64,',
    'image/jpeg': 'data:image/jpeg;base64,',
    'image/gif': 'data:image/gif;base64,',
    'image/svg': 'data:image/svg+xml;base64,',
    'image/ico': 'data:image/x-icon;base64,',
    'image/bmp': 'data:image/bmp;base64,'
  }

  var IS_MK$e = bridge_basic_mm.is_mk
  /** 保存图片: url */
  register('tantan', 'imageSave', '5.2.4', '5.2.5')
  function imageSave(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$e) {
          return [
            2 /*return*/,
            mmWrapper({
              common: ['tantan_media', 'imageSave', param, true]
            })
          ]
        } else {
          return [2 /*return*/, imageSave$1(param)]
        }
      })
    })
  }
  /** 图片多选 */
  register('tantan', 'pickImages', '5.2.4', '5.2.5')
  function pickImages(param) {
    return __awaiter(this, void 0, void 0, function () {
      var res
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!IS_MK$e) return [3 /*break*/, 2]
            return [
              4 /*yield*/,
              mmWrapper({
                common: ['tantan_media', 'pickImages', param, true]
              })
            ]
          case 1:
            res = _a.sent()
            res.message = PickImagesCodeMap[res.code]
            res.data.forEach(function (x) {
              x.base64 = Base64PrefixMap[x.mediaType] + x.base64
            })
            return [2 /*return*/, res]
          case 2:
            return [2 /*return*/, Promise.reject('no method matched for pickImages')]
        }
      })
    })
  }
  /**
   * 保存base64编码的图片
   * @param params data: base64编码的数据字符串, 需要去掉'data:image/jpeg;base64', 这样的前缀
   */
  register('tantan', 'saveBase64ImageData', '5.2.7', '5.2.8')
  function saveBase64ImageData(param) {
    return __awaiter(this, void 0, void 0, function () {
      var data
      return __generator(this, function (_a) {
        data = param.data.replace(/^(data:image.*?base64,)/, '')
        if (IS_MK$e) {
          return [
            2 /*return*/,
            mmWrapper({
              common: ['tantan_media', 'saveBase64ImageData', { data: data }, true]
            })
          ]
        } else {
          return [2 /*return*/, saveBase64ImageData$1({ data: data })]
        }
      })
    })
  }
  /**
   * 选取图片
   * @param param
   * @returns
   */
  register('tantan', 'imagePicker', '5.2.7', '5.2.8')
  // export async function imagePicker(param?: { callback: (url: string, error: string) => void }): Promise<any> {
  function imagePicker() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$e) {
          return [
            2 /*return*/,
            new Promise(function (resolve, reject) {
              var uid = genUuid$1()
              var successFn = 'success_' + uid
              window[successFn] = function (url, error) {
                resolve({ url: url, error: error })
              }
              var param = {
                success: successFn
              }
              bridge_basic_mm.build({
                common: ['tantan_media', 'imagePicker', param]
              })
            })
          ]
        } else {
          return [
            2 /*return*/,
            new Promise(function (resolve, reject) {
              triggerAction$1({
                actionType: 'imagePicker',
                restParams: {
                  success: function (url, error) {
                    resolve({ url: url, error: error })
                  }
                }
              })
            })
          ]
        }
      })
    })
  }

  var media = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    imageSave: imageSave,
    pickImages: pickImages,
    saveBase64ImageData: saveBase64ImageData,
    imagePicker: imagePicker
  })

  var IS_MK$d = bridge_basic_mm.is_mk
  var platform$2 = bridge_basic_mm.platform
  /**
   * 获取当前设备可分享渠道
   * @returns
   */
  register('tantan', 'getShareChannel', '5.1.8', '5.1.8')
  function getShareChannel() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$d) {
          return [
            2 /*return*/,
            mmWrapper({
              common: ['tantan', 'getShareChannel', {}, true]
            })
          ]
        } else {
          return [2 /*return*/, getShareChannel$1()]
        }
      })
    })
  }
  /**
   * 分享
   * @param param IShareParam
   * @returns
   */
  register('tantan', 'share', '5.1.8', '5.1.8')
  function share(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$d) {
          return [
            2 /*return*/,
            mmWrapper({
              common: ['tantan', 'share', param, true]
            })
          ]
        } else {
          return [2 /*return*/, share$2(param)]
        }
      })
    })
  }
  /**
   * 弹窗分享
   */
  register('tantan', 'nativeShare', '5.1.8', '5.2.8')
  function nativeShare(param) {
    return __awaiter(this, void 0, void 0, function () {
      var newParam
      return __generator(this, function (_a) {
        if (IS_MK$d) {
          newParam = __assign({}, param)
          if (platform$2.toLowerCase() === 'ios') {
            newParam = __assign(__assign({}, param), { shareTitle: param.title, pic: param.imgUrl, dialogTitle: param.modalTitle, platform: param.channels })
            return [
              2 /*return*/,
              oldWrapper({
                common: ['tantan_share', 'nativeShare', newParam]
              })
            ]
          } else {
            return [
              2 /*return*/,
              mmWrapper({
                common: ['tantan', 'nativeShare', newParam, true]
              })
            ]
          }
        } else {
          return [2 /*return*/, nativeShare$1(param)]
        }
      })
    })
  }
  /**
   * 分享图片（需要指定分享渠道）--- 无返回值
   * iOS 分享图片复用share逻辑
   * @param params
   */
  register('tantan', 'shareImage', '5.2.7', '5.2.8')
  function shareImage(param) {
    if (IS_MK$d) {
      if (platform$2.toLowerCase() === 'ios') {
        var pic = param.pic,
          platform_1 = param.platform
        share({
          url: '',
          title: '',
          description: '',
          imgUrl: pic,
          channel: platform_1
        })
      } else {
        bridge_basic_mm.build({
          common: ['tantan_share', 'shareImage', param]
        })
      }
    } else {
      shareImage$1(param)
    }
  }
  /**
   * 分享好友面板
   * @param param
   * @returns
   */
  register('tantan', 'shareFriends', '5.2.7', '5.2.8')
  function shareFriends(param) {
    return __awaiter(this, void 0, void 0, function () {
      var status_1, userIDList_1
      return __generator(this, function (_a) {
        if (IS_MK$d) {
          status_1 = ''
          userIDList_1 = ''
          return [
            2 /*return*/,
            new Promise(function (resolve, reject) {
              var _a
              var callbackFn = function () {
                var args = []
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i]
                }
                if (platform$2.toLowerCase() === 'android' && args && args.length > 1) {
                  status_1 = args[0]
                  userIDList_1 = args[1]
                } else if (args && args.length > 0) {
                  var data = JSON.parse(args[0])
                  status_1 = data[0] || ''
                  userIDList_1 = data[1]
                }
                if (param.callback && typeof param.callback === 'function') {
                  param.callback(status_1, userIDList_1)
                }
                resolve({ status: status_1, userIDList: userIDList_1 })
              }
              var subTitle = param.subTitle,
                otherParams = __rest(param, ['subTitle'])
              var newParams = __assign(__assign({}, otherParams), ((_a = {}), (_a[platform$2.toLowerCase() === 'android' ? 'subtitle' : 'subTitle'] = subTitle), (_a.callback = callbackFn), _a))
              mmWrapper({
                common: ['tantan_share', 'shareFriends', newParams]
              })
            })
          ]
        } else {
          return [2 /*return*/, shareFriends$1(param)]
        }
      })
    })
  }

  var share$1 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getShareChannel: getShareChannel,
    share: share,
    nativeShare: nativeShare,
    shareImage: shareImage,
    shareFriends: shareFriends
  })

  var IS_MK$c = bridge_basic_mm.is_mk
  var platform$1 = bridge_basic_mm.platform
  /** 设置导航栏 */
  register('tantan', 'setNavigation', '5.1.8', '5.1.8')
  function setNavigation(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$c) {
          return [
            2 /*return*/,
            mmWrapper({
              common: ['tantan', 'setNavigation', param]
            })
          ]
        } else {
          return [2 /*return*/, setNavigation$1(param)]
        }
      })
    })
  }
  /**
   * 设置导航栏标题: mk中仅安卓支持, iOS使用setNavigation
   */
  register('tantan', 'setNavigationTitle', '5.1.8', '5.1.8')
  function setNavigationTitle(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$c) {
          if (platform$1.toLowerCase() === 'ios') {
            return [2 /*return*/, setNavigation(param)]
          }
          return [
            2 /*return*/,
            mmWrapper({
              common: ['tantan', 'setNavigationTitle', param]
            })
          ]
        } else {
          return [2 /*return*/, setNavigationTitle$1(param)]
        }
      })
    })
  }
  /** 设置导航栏右侧按钮 */
  register('tantan', 'setNavRightButton', '5.1.8', '5.1.8')
  function setNavRightButton(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$c) {
          return [
            2 /*return*/,
            mmWrapper({
              common: ['tantan', 'setNavRightButton', param]
            })
          ]
        } else {
          return [2 /*return*/, setNavRightButton$1(param)]
        }
      })
    })
  }
  /**
   * Android:h5接管返回按键逻辑;iOS:阻止侧滑关闭webview
   */
  register('tantan', 'setOnKeyBack', '5.1.8', '5.1.8')
  function setOnKeyBack(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$c) {
          mmWrapper({
            common: ['tantan', 'setOnKeyBack', param]
          })
        } else {
          setOnKeyBack$1(param)
        }
        return [2 /*return*/]
      })
    })
  }
  /** Toast提示 */
  register('tantan', 'showToast', '5.1.8', '5.1.8')
  function showToast(param) {
    if (IS_MK$c) {
      bridge_basic_mm.build({
        common: ['tantan', 'showToast', param]
      })
    } else {
      showToast$1(param)
    }
  }
  /** 隐藏导航栏 */
  register('tantan', 'hideNavigation', '5.2.4', '5.2.5')
  function hideNavigation() {
    if (IS_MK$c) {
      mmWrapper({
        common: ['tantan_ui', 'hideNavigation', {}]
      })
    } else {
      hideNavigation$1()
    }
  }
  /** 隐藏状态栏 */
  register('tantan', 'hideNotch', '5.2.4', '5.2.5')
  function hideNotch(param) {
    if (param === void 0) {
      param = { hideNotchTitle: false }
    }
    if (IS_MK$c) {
      bridge_basic_mm.build({
        common: ['tantan_ui', 'hideNotch', param]
      })
    } else {
      hideNotch$1()
    }
  }
  /** 显示状态栏 */
  register('tantan', 'showNotch', '5.2.7', '5.2.8')
  function showNotch(param) {
    if (param === void 0) {
      param = { hideNotchTitle: false }
    }
    if (IS_MK$c) {
      bridge_basic_mm.build({
        common: ['tantan_ui', 'showNotch', param]
      })
    } else {
      showNotch$1()
    }
  }
  /**
   *
   * @param params 设置导航栏左侧按钮
   * @returns
   */
  register('tantan', 'setNavLeftButton', '5.2.7', '5.2.8')
  function setNavLeftButton(params) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$c) {
          return [
            2 /*return*/,
            oldWrapper({
              common: ['tantan_ui', 'setNavLeftButton', params]
            })
          ]
        } else {
          return [2 /*return*/, setNavLeftButton$1(params)]
        }
      })
    })
  }
  /**
   * ios禁止页面回弹
   */
  register('tantan', 'disableBounce', '5.2.7', '5.2.8')
  function disableBounce() {
    if (IS_MK$c) {
      bridge_basic_mm.build({
        common: ['tantan_ui', 'disableBounce', {}]
      })
    } else {
      disableBounce$1()
    }
  }
  /**
   * 设置状态栏背景色
   * @param param
   */
  register('tantan', 'changeNotchBackgroundColor', '5.2.7', '')
  function changeNotchBackgroundColor(param) {
    if (IS_MK$c) {
      oldWrapper({
        common: ['tantan_ui', 'changeNotchBackgroundColor', param]
      })
    } else {
      changeNotchBackgroundColor$1(param.color)
    }
  }
  /**
   * 更改webview背景色
   * @param param
   */
  register('tantan', 'changeWebviewBackgroundColor', '5.2.7', '5.2.8')
  function changeWebviewBackgroundColor(param) {
    if (IS_MK$c) {
      bridge_basic_mm.build({
        common: ['tantan_ui', 'changeWebviewBackgroundColor', param]
      })
    } else {
      changeWebviewBackgroundColor$1(param.color)
    }
  }
  /**
   * 监听键盘弹出、收起状态
   * @param param
   */
  register('tantan', 'monitorKeyboard', '5.4.3', '5.4.4')
  function monitorKeyboard(param) {
    return __awaiter(this, void 0, void 0, function () {
      var callback_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!IS_MK$c) return [3 /*break*/, 2]
            callback_1 = param.callback
            if (callback_1) {
              param.callback = function (res) {
                res = JSON.parse(res)
                // 安卓端返回的像素单位是dp, 需要除以设备像素比, iOS不需要
                var height = platform$1.toLowerCase() === 'ios' ? res.height : res.height / window.devicePixelRatio
                callback_1(__assign(__assign({}, res), { height: ['willHide', 'didHide'].includes(res.event) ? 0 : height }))
              }
            }
            return [
              4 /*yield*/,
              mmWrapper({
                common: ['tantan_ui', 'monitorKeyboard', param, false]
              })
            ]
          case 1:
            _a.sent()
            _a.label = 2
          case 2:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * iOS键盘弹起，禁止页面滚动
   */
  register('tantan', 'keyBoardForbidScroll', '5.4.0', '5.4.0')
  function keyBoardForbidScroll() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$c) {
          return [
            2 /*return*/,
            mmWrapper({
              common: ['tantan', 'keyBoardForbidScroll', {}, false]
            })
          ]
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * 移除键盘弹出、收起状态监听
   */
  register('tantan', 'removeMonitorKeyboard', '5.2.7', '5.2.8')
  function removeMonitorKeyboard() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$c) {
          mmWrapper({
            common: ['tantan_ui', 'removeMonitorKeyboard', {}, true]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * 去掉ios键盘上的导航条
   */
  register('tantan', 'hideKeyboardShortcutBar', '5.4.3', '5.4.3')
  function hideKeyboardShortcutBar() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$c) {
          mmWrapper({
            common: ['tantan_ui', 'hideKeyboardShortcutBar', {}, true]
          })
        }
        return [2 /*return*/]
      })
    })
  }

  var ui = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    setNavigation: setNavigation,
    setNavigationTitle: setNavigationTitle,
    setNavRightButton: setNavRightButton,
    setOnKeyBack: setOnKeyBack,
    showToast: showToast,
    hideNavigation: hideNavigation,
    hideNotch: hideNotch,
    showNotch: showNotch,
    setNavLeftButton: setNavLeftButton,
    disableBounce: disableBounce,
    changeNotchBackgroundColor: changeNotchBackgroundColor,
    changeWebviewBackgroundColor: changeWebviewBackgroundColor,
    monitorKeyboard: monitorKeyboard,
    keyBoardForbidScroll: keyBoardForbidScroll,
    removeMonitorKeyboard: removeMonitorKeyboard,
    hideKeyboardShortcutBar: hideKeyboardShortcutBar
  })

  var IS_MK$b = bridge_basic_mm.is_mk
  /** 获取用户信息 */
  register('tantan', 'getUserInfo', '5.1.8', '5.1.8')
  function getUserInfo$1(callback) {
    return __awaiter(this, void 0, void 0, function () {
      var res, res
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!IS_MK$b) return [3 /*break*/, 2]
            return [
              4 /*yield*/,
              mmWrapper({
                common: ['tantan', 'getUserInfo', {}, true]
              })
            ]
          case 1:
            res = _a.sent()
            callback && callback(res)
            return [2 /*return*/, res]
          case 2:
            return [4 /*yield*/, getUserInfo$2()]
          case 3:
            res = _a.sent()
            callback && callback(res)
            return [2 /*return*/, res]
        }
      })
    })
  }

  var user = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getUserInfo: getUserInfo$1
  })

  var IS_MK$a = bridge_basic_mm.is_mk
  var platform = bridge_basic_mm.platform
  /**
   *  新开webview
   * 注意: Android和iOS打开schema做了兼容: iOS 打开shema参数为schema, Android 打开schema参数为url
   * 兼容后前端只需传url, bridge自动适配url和schema参数
   * url中不能有中文, 否则iOS解析失败, 可以对参数进行encodeURIComponent
   * */
  register('tantan', 'openWebview', '5.1.8', '5.1.8')
  function openWebview(param) {
    if (!param.url) {
      return
    }
    // 打开schema兼容
    if (IS_MK$a) {
      //
      /**
       * 判断是否是schema, 不是http开头的为schema
       * a.若是schema, 则使用openWebview
       * b.否则, 判断是不是有_bid,
       *   b.1 若有_bid,则使用openUrl
       *   b.2 否则, 使用openwebview
       */
      var url = param.url || ''
      // a.是schema
      var isSchema = !/^(http)/.test(url)
      var hasBid = new URL(url).search.includes('_bid')
      if (isSchema) {
        if (platform.toLowerCase() === 'ios') {
          param.schema = param.url
          delete param.url // 也可不delete
        }
        bridge_basic_mm.build({
          common: ['tantan', 'openWebview', param]
        })
        return
      }
      // b.1 不是schema, 有_bid, 打开MK
      if (hasBid) {
        openUrl({
          target: 1,
          url: url
        })
        return
      }
      // b.不是schema, 没有有_bid, 打开非MK
      bridge_basic_mm.build({
        common: ['tantan', 'openWebview', param]
      })
    } else {
      var url = param.url,
        schema = param.schema,
        title = param.title
      openWebview$1(schema ? schema : url || '', title)
    }
  }
  /** 关闭当前webview */
  register('tantan', 'closeWebview', '5.1.8', '5.1.8')
  function closeWebview() {
    if (IS_MK$a) {
      bridge_basic_mm.build({
        common: ['tantan', 'closeWebview', {}]
      })
    } else {
      closeWebview$1()
    }
  }
  /** 打开MKwebview */
  register('tantan', 'openUrl', '5.1.8', '5.1.8')
  function openUrl(param) {
    if (IS_MK$a) {
      if (platform.toLowerCase() === 'android') {
        bridge_basic_mm.build({
          common: ['tantan', 'openUrl', param]
        })
      } else {
        bridge_basic_mm.build({
          common: ['ui', 'openUrl', param]
        })
      }
    } else {
      setTimeout(function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            window.location.href = param.url || ''
            return [2 /*return*/]
          })
        })
      }, 20)
    }
  }
  /**
   * 新开webview同时关闭当前webview
   */
  register('tantan', 'jumpWebview', '5.2.7', '5.2.8')
  function jumpWebview(param) {
    if (IS_MK$a) {
      var newParam = __assign({}, param)
      if (platform.toLowerCase() === 'ios' && !/^(http)/.test(param.url || '')) {
        newParam.schema = param.url
        delete newParam.url // 也可不delete
      }
      bridge_basic_mm.build({
        common: ['tantan', 'jumpWebview', newParam]
      })
    } else {
      var url = param.url,
        title = param.title
      jumpWebview$1(url, title)
    }
  }
  /**
   * 添加新的bridge监听关闭webview事件，当前webview关闭之后让客户端打PD点
   * @param param0
   */
  register('tantan', 'setWebviewPageID', '5.2.7', '5.2.8')
  function setWebviewPageID(param) {
    if (IS_MK$a) {
      bridge_basic_mm.build({
        common: ['tantan_webview', 'setWebviewPageID', param]
      })
    } else {
      setWebviewPageID$1(param)
    }
  }
  /**
   * 打开透明webview
   */
  register('tantan', 'openMKDialogWebview', '5.2.7', '5.2.8')
  function openMKDialogWebview(param) {
    if (IS_MK$a) {
      bridge_basic_mm.build({
        common: ['tantan', 'openMKDialogWebview', param]
      })
    }
  }
  /**
   * 跳转外部浏览器或schema
   * @param param
   */
  register('tantan', 'jumpBrowser', '5.2.7', '5.2.8')
  function jumpBrowser(param) {
    if (IS_MK$a) {
      bridge_basic_mm.build({
        common: ['tantan_webview', 'jumpBrowser', param]
      })
    } else {
      triggerAction$1({
        actionType: 'jumpBrowser',
        restParams: param
      })
    }
  }
  register('tantan', 'close', '5.2.7', '5.1.8')
  function close(param) {
    if (IS_MK$a) {
      bridge_basic_mm.build({
        common: [platform.toLowerCase() === 'ios' ? 'ui' : 'tantan_webview', 'close', param]
      })
    }
  }

  var webview = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    openWebview: openWebview,
    closeWebview: closeWebview,
    openUrl: openUrl,
    jumpWebview: jumpWebview,
    setWebviewPageID: setWebviewPageID,
    openMKDialogWebview: openMKDialogWebview,
    jumpBrowser: jumpBrowser,
    close: close
  })

  var IS_MK$9 = bridge_basic_mm.is_mk
  /**
   * 获取指定键值得本地存储
   * @returns
   */
  register('tantan', 'getStorage', '5.2.7', '5.2.8')
  function getStorage(param) {
    return __awaiter(this, void 0, void 0, function () {
      var res
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!IS_MK$9) return [3 /*break*/, 4]
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              oldWrapper({
                common: ['tantan_storage', 'getStorage', param, true]
              })
            ]
          case 2:
            res = _a.sent()
            if (typeof res === 'string' && res === 'KEY_NOT_EXIST') {
              return [2 /*return*/, '']
            }
            if (!res) {
              return [2 /*return*/, '']
            }
            if (/^{.*}$/.test(res)) {
              return [2 /*return*/, JSON.parse(res)]
            }
            return [2 /*return*/, res]
          case 3:
            _a.sent()
            return [2 /*return*/, '']
          case 4:
            _a.trys.push([4, 6, , 7])
            return [4 /*yield*/, getStorage$1(param.key)]
          case 5:
            return [2 /*return*/, _a.sent()]
          case 6:
            _a.sent()
            return [2 /*return*/, '']
          case 7:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 设置指定键值得本地存储
   * @param params
   * @returns
   */
  register('tantan', 'setStorage', '5.2.7', '5.2.8')
  function setStorage(params) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$9) {
          return [
            2 /*return*/,
            oldWrapper({
              common: ['tantan_storage', 'setStorage', params, true]
            })
          ]
        } else {
          return [2 /*return*/, setStorage$1(params)]
        }
      })
    })
  }
  /**
   * 移除指定键值得本地存储
   * @param params
   * @returns
   */
  register('tantan', 'removeStorage', '5.2.7', '5.2.8')
  function removeStorage(params) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$9) {
          return [
            2 /*return*/,
            oldWrapper({
              common: ['tantan_storage', 'removeStorage', params, true]
            })
          ]
        } else {
          return [2 /*return*/, removeStorage$1(params)]
        }
      })
    })
  }
  /**
   * 清空本地存储
   * @param params
   * @returns
   */
  register('tantan', 'clearStorage', '5.2.7', '5.2.8')
  function clearStorage() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$9) {
          return [
            2 /*return*/,
            oldWrapper({
              common: ['tantan_storage', 'clearStorage', {}, true]
            })
          ]
        } else {
          return [2 /*return*/, clearStorage$1()]
        }
      })
    })
  }

  var storage = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getStorage: getStorage,
    setStorage: setStorage,
    removeStorage: removeStorage,
    clearStorage: clearStorage
  })

  var IS_MK$8 = bridge_basic_mm.is_mk
  /**
   * 绑定支付宝
   * @param param
   * @returns
   */
  register('tantan', 'bindAlipay', '5.2.7', '5.2.8')
  function bindAlipay(param) {
    return __awaiter(this, void 0, void 0, function () {
      var successAlipay, failAlipay, rest, newParam
      return __generator(this, function (_a) {
        if (IS_MK$8) {
          ;(successAlipay = param.successAlipay), (failAlipay = param.failAlipay), (rest = __rest(param, ['successAlipay', 'failAlipay']))
          newParam = __assign(__assign({}, rest), { success: successAlipay, fail: failAlipay })
          return [
            2 /*return*/,
            oldWrapper({
              common: ['tantan_third_party', 'bindAlipay', newParam]
            })
          ]
        } else {
          return [2 /*return*/, bindAlipay$1(param)]
        }
      })
    })
  }

  var thirdParty = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    bindAlipay: bindAlipay
  })

  var IS_MK$7 = bridge_basic_mm.is_mk
  /**
   * 业务Bridge统一调用, 相当于之前的triggerAction
   */
  function custom(_a) {
    var name = _a.name,
      param = _a.param,
      _b = _a.module,
      module = _b === void 0 ? 'tantan' : _b
    var data = {}
    var uid = genUuid$1()
    if (param) {
      for (var key in param) {
        var value = param[key]
        if (typeof value === 'function') {
          var fnName = '' + key + uid
          window[fnName] = value
          data[key] = fnName
        } else {
          data[key] = value
        }
      }
      // Object.entries(param).forEach(function ([key, value]) {
      //   if (typeof value === 'function') {
      //     const fnName = `${key}${uid}`;
      //     window[fnName] = value;
      //     data[key] = fnName;
      //   } else {
      //     data[key] = value;
      //   }
      // });
    }
    bridge_basic_mm.build({
      common: [module, name, data]
    })
  }
  /**
   * 判断某个bridge是否可用
   * @param module
   * @param name
   * @returns
   */
  function canIUse(_a) {
    var module = _a.module,
      name = _a.name
    if (IS_MK$7) {
      return canIUse$2(module, name)
    } else {
      return canIUse$1(name)
    }
  }
  function triggerAction(param) {
    var module = param.module,
      actionType = param.actionType,
      restParams = param.restParams
    if (IS_MK$7) {
      custom({ module: module, name: actionType, param: restParams })
    } else {
      triggerAction$1({ actionType: actionType, restParams: restParams })
    }
  }

  var tool = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    custom: custom,
    canIUse: canIUse,
    triggerAction: triggerAction
  })

  var IS_MK$6 = bridge_basic_mm.is_mk
  /**
   * 接口代发
   * @returns
   */
  register('tantan_http', 'request', '5.3.0', '5.3.3')
  function httpRequest(params) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$6) {
          return [
            2 /*return*/,
            mmWrapper({
              common: ['tantan_http', 'request', __assign({}, params), true]
            })
          ]
        } else {
          return [
            2 /*return*/,
            new Promise(function (resolve, reject) {
              console.log('非MK不支持')
              reject('非MK不支持')
            })
          ]
        }
      })
    })
  }

  var http = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    httpRequest: httpRequest
  })

  var IS_MK$5 = bridge_basic_mm.is_mk
  /**
   * 震动
   * time: number; // 震动的时间，单位：毫秒，默认为 50 ms
   * amplitude: number; // 震动强度（1-255），（8.17.1 及以后，android O 及以上才支持），不填写为默认的强度
   */
  register('tantan', 'vibrate', '5.4.3', '5.4.4')
  function vibrate(param) {
    if (param === void 0) {
      param = { code: 1519, time: 50, amplitude: 50 }
    }
    if (IS_MK$5) {
      mmWrapper({
        common: ['tantan_sensor', 'vibrate', param]
      })
    }
  }

  var sensor = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    vibrate: vibrate
  })

  var IS_MK$4 = bridge_basic_mm.is_mk
  /**
   * 获取流量染色的环境变量
   */
  register('tantan', 'getNetworkTantanDevEnv', '5.4.6', '5.4.6')
  function getNetworkTantanDevEnv() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$4) {
          return [
            2 /*return*/,
            mmWrapper({
              common: ['tantan', 'getNetworkTantanDevEnv', {}, true]
            })
          ]
        } else {
          return [2 /*return*/, NMKGetNetworkTantanDevEnv()]
        }
      })
    })
  }
  function NMKGetNetworkTantanDevEnv() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          new Promise(function (resolve, reject) {
            var callback = function (res) {
              console.log('getNetworkTantanDevEnv===>res', res)
              resolve(res)
            }
            triggerAction$1({
              actionType: 'getNetworkTantanDevEnv',
              restParams: {
                callback: callback
              }
            })
          })
        ]
      })
    })
  }

  var devEnv = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getNetworkTantanDevEnv: getNetworkTantanDevEnv
  })

  var base = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, abTest), action), device), hmac), media), share$1), ui), user), webview), storage), thirdParty), tool), http), sensor), devEnv)

  var tantan = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    default: base,
    getABNames: getABNames,
    getAbHeader: getAbHeader,
    trackNew: trackNew,
    subscribe: subscribe,
    jumpToLauncher: jumpToLauncher,
    getNetworkEnv: getNetworkEnv,
    getNetworkInfo: getNetworkInfo,
    getSystemInfo: getSystemInfo,
    getCityInfo: getCityInfo,
    getDeviceNotchInfo: getDeviceNotchInfo,
    getAuthorizationHeader: getAuthorizationHeader,
    imageSave: imageSave,
    pickImages: pickImages,
    saveBase64ImageData: saveBase64ImageData,
    imagePicker: imagePicker,
    getShareChannel: getShareChannel,
    share: share,
    nativeShare: nativeShare,
    shareImage: shareImage,
    shareFriends: shareFriends,
    setNavigation: setNavigation,
    setNavigationTitle: setNavigationTitle,
    setNavRightButton: setNavRightButton,
    setOnKeyBack: setOnKeyBack,
    showToast: showToast,
    hideNavigation: hideNavigation,
    hideNotch: hideNotch,
    showNotch: showNotch,
    setNavLeftButton: setNavLeftButton,
    disableBounce: disableBounce,
    changeNotchBackgroundColor: changeNotchBackgroundColor,
    changeWebviewBackgroundColor: changeWebviewBackgroundColor,
    monitorKeyboard: monitorKeyboard,
    keyBoardForbidScroll: keyBoardForbidScroll,
    removeMonitorKeyboard: removeMonitorKeyboard,
    hideKeyboardShortcutBar: hideKeyboardShortcutBar,
    getUserInfo: getUserInfo$1,
    openWebview: openWebview,
    closeWebview: closeWebview,
    openUrl: openUrl,
    jumpWebview: jumpWebview,
    setWebviewPageID: setWebviewPageID,
    openMKDialogWebview: openMKDialogWebview,
    jumpBrowser: jumpBrowser,
    close: close,
    getStorage: getStorage,
    setStorage: setStorage,
    removeStorage: removeStorage,
    clearStorage: clearStorage,
    bindAlipay: bindAlipay,
    custom: custom,
    canIUse: canIUse,
    triggerAction: triggerAction,
    httpRequest: httpRequest,
    vibrate: vibrate,
    getNetworkTantanDevEnv: getNetworkTantanDevEnv
  })

  var IS_MK$3 = bridge_basic_mm.is_mk
  var moduleName$2 = 'tantan_swipe'
  /**
   * 点击照片 弹出图片选择弹窗
   * @returns
   */
  function pickUpImageDialog() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          mmWrapper({
            common: [moduleName$2, 'pickUpImageDialog', {}, false]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  function iosDeleteImage(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          mmWrapper({
            common: [moduleName$2, 'deleteImage', param, false]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  function iosUploadImage(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          mmWrapper({
            common: [moduleName$2, 'uploadJourneyImage', param, true]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  function iosUploadVideo(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          mmWrapper({
            common: [moduleName$2, 'uploadJourneyVideo', param, true]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  function uploadJourneyImageCallback(callback) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          window[moduleName$2 + '_uploadJourneyImageCallback'] = callback
        }
        return [2 /*return*/]
      })
    })
  }
  function updateJourneyPictures() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          mmWrapper({
            common: [moduleName$2, 'updateJourneyPictures', {}, true]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  function uploadJourneySucceedCallback(callback) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          window[moduleName$2 + '_uploadJourneySucceedCallback'] = callback
        }
        return [2 /*return*/]
      })
    })
  }
  function uploadJourneyFailCallback(callback) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          window[moduleName$2 + '_uploadJourneyFailCallback'] = callback
        }
        return [2 /*return*/]
      })
    })
  }
  function updateDescription(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          mmWrapper({
            common: [moduleName$2, 'updateDescription', param, true]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * 选取图片，或视频 调用js方法，进行注册
   */
  function uploadImage(callback) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          window[moduleName$2 + '_uploadImage'] = callback
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * 选取视频 调用js方法，进行注册
   */
  function uploadVideo(callback) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          window[moduleName$2 + '_uploadVideo'] = callback
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * 照片任务 点击稍后再说
   */
  function travelImageCancel() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          mmWrapper({
            common: [moduleName$2, 'travelImageCancel', {}, false]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * 自我介绍 点击稍后再说
   */
  function travelIntroductCancel() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          mmWrapper({
            common: [moduleName$2, 'travelIntroductCancel', {}, false]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * 获取用户信息，包含uiserId,和图片信息
   */
  function getUserInfo() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          return [
            2 /*return*/,
            mmWrapper({
              common: [moduleName$2, 'getUserInfo', {}, true]
            })
          ]
        } else {
          return [2 /*return*/, Promise.resolve({})]
        }
      })
    })
  }
  /**
   * 文本框的特殊字符、违规词
   */
  function verifyWords(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          return [
            2 /*return*/,
            mmWrapper({
              common: [moduleName$2, 'verifyWords', param, true]
            })
          ]
        } else {
          return [2 /*return*/, Promise.resolve(false)]
        }
      })
    })
  }
  /**
   * 卡片左滑
   */
  function scrollCardLeft() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          mmWrapper({
            common: [moduleName$2, 'scrollCardLeft', {}, false]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * 卡片右滑
   */
  function scrollCardRight() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          mmWrapper({
            common: [moduleName$2, 'scrollCardRight', {}, false]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * 键盘收起/展开
   */
  function showKeyboard(callback) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          window[moduleName$2 + '_showKeyboard'] = callback
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * 照片卡片-点击完成弹窗
   */
  function travelCompleteDialog() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          mmWrapper({
            common: [moduleName$2, 'travelCompleteDialog', {}, false]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * 点击放弃保存
   */
  function travelDialogSave(callback) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          window[moduleName$2 + '_travelDialogSave'] = callback
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * 点击稍后再说
   */
  function travelCancelDialog() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          mmWrapper({
            common: [moduleName$2, 'travelCancelDialog', {}, false]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * 划卡 端上调用js
   */
  function travelIsChange(callback) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          window[moduleName$2 + '_travelIsChange'] = callback
        }
        return [2 /*return*/]
      })
    })
  }
  function androidTravelIsChange(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          mmWrapper({
            common: [moduleName$2, 'androidTravelIsChange', param, false]
          })
        }
        return [2 /*return*/]
      })
    })
  }
  register(moduleName$2, 'completeInform', '5.4.1', '5.3.8')
  function completeInform(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$3) {
          return [
            2 /*return*/,
            mmWrapper({
              common: [moduleName$2, 'completeInform', param, true]
            })
          ]
        }
        return [2 /*return*/]
      })
    })
  }

  var tantanSwiper = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    pickUpImageDialog: pickUpImageDialog,
    iosDeleteImage: iosDeleteImage,
    iosUploadImage: iosUploadImage,
    iosUploadVideo: iosUploadVideo,
    uploadJourneyImageCallback: uploadJourneyImageCallback,
    updateJourneyPictures: updateJourneyPictures,
    uploadJourneySucceedCallback: uploadJourneySucceedCallback,
    uploadJourneyFailCallback: uploadJourneyFailCallback,
    updateDescription: updateDescription,
    uploadImage: uploadImage,
    uploadVideo: uploadVideo,
    travelImageCancel: travelImageCancel,
    travelIntroductCancel: travelIntroductCancel,
    getUserInfo: getUserInfo,
    verifyWords: verifyWords,
    scrollCardLeft: scrollCardLeft,
    scrollCardRight: scrollCardRight,
    showKeyboard: showKeyboard,
    travelCompleteDialog: travelCompleteDialog,
    travelDialogSave: travelDialogSave,
    travelCancelDialog: travelCancelDialog,
    travelIsChange: travelIsChange,
    androidTravelIsChange: androidTravelIsChange,
    completeInform: completeInform
  })

  var IS_MK$2 = bridge_basic_mm.is_mk
  /**
   * 跳转到userId指定的个人资料页
   */
  register('tantan_core', 'jumpToProfileAct', '5.2.7', '5.2.8')
  function jumpToProfileAct(param) {
    if (IS_MK$2) {
      oldWrapper({
        common: ['tantan_core', 'jumpToProfileAct', param]
      })
    } else {
      triggerAction$1({
        actionType: 'jumpToProfileAct',
        restParams: param
      })
    }
  }

  var tantanCore = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    jumpToProfileAct: jumpToProfileAct
  })

  var IS_MK$1 = bridge_basic_mm.is_mk
  var moduleName$1 = 'tantan_moment'
  register('tantan_moment', 'jumpToPostFromShare', '5.3.6', '5.4.4')
  function jumpToPostFromShare(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK$1) {
          return [
            2 /*return*/,
            mmWrapper({
              common: [moduleName$1, 'jumpToPostFromShare', param]
            })
          ]
        }
        return [2 /*return*/]
      })
    })
  }

  var tantanMoment = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    jumpToPostFromShare: jumpToPostFromShare
  })

  var IS_MK = bridge_basic_mm.is_mk
  var moduleName = 'tantan_verification'
  register('tantan_verification', 'showCaptchaVerification', '5.3.6', '5.3.6')
  function showCaptchaVerification(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK) {
          return [
            2 /*return*/,
            mmWrapper({
              common: [moduleName, 'showCaptchaVerification', param, true]
            })
          ]
        }
        return [2 /*return*/]
      })
    })
  }
  register('tantan_verification', 'identifierVerification', '5.4.1', '5.4.1')
  function identifierVerification(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK) {
          return [
            2 /*return*/,
            mmWrapper({
              common: [moduleName, 'identifierVerification', param, true]
            })
          ]
        }
        return [2 /*return*/]
      })
    })
  }
  register('tantan_verification', 'getSliderDataByFrom', '5.4.3', '5.4.3')
  function getSliderDataByFrom(param) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK) {
          return [
            2 /*return*/,
            mmWrapper({
              common: [moduleName, 'getSliderDataByFrom', param, true]
            })
          ]
        }
        return [2 /*return*/]
      })
    })
  }
  register('tantan_verification', 'getSlideSuccessData', '5.4.5', '5.4.5')
  function getSlideSuccessData(callback) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (IS_MK) {
          window[moduleName + '_getSlideSuccessData'] = callback
        }
        return [2 /*return*/]
      })
    })
  }

  var tantanVerification = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    showCaptchaVerification: showCaptchaVerification,
    identifierVerification: identifierVerification,
    getSliderDataByFrom: getSliderDataByFrom,
    getSlideSuccessData: getSlideSuccessData
  })

  var tt = bridge_basic_mm
  tt.register = register
  tt.tantan_version = tantan_version
  tt.tantan = tantan
  tt.tantanSwiper = tantanSwiper
  tt.tantanCore = tantanCore
  tt.tantanMoment = tantanMoment
  tt.tantanVerification = tantanVerification
  if (window && !window.tt) {
    window.tt = tt
  }

  exports.bindAlipay = bindAlipay
  exports.canIUse = canIUse
  exports.changeNotchBackgroundColor = changeNotchBackgroundColor
  exports.changeWebviewBackgroundColor = changeWebviewBackgroundColor
  exports.clearStorage = clearStorage
  exports.close = close
  exports.closeWebview = closeWebview
  exports.custom = custom
  exports['default'] = tt
  exports.disableBounce = disableBounce
  exports.getABNames = getABNames
  exports.getAbHeader = getAbHeader
  exports.getAuthorizationHeader = getAuthorizationHeader
  exports.getCityInfo = getCityInfo
  exports.getDeviceNotchInfo = getDeviceNotchInfo
  exports.getNetworkEnv = getNetworkEnv
  exports.getNetworkInfo = getNetworkInfo
  exports.getNetworkTantanDevEnv = getNetworkTantanDevEnv
  exports.getShareChannel = getShareChannel
  exports.getStorage = getStorage
  exports.getSystemInfo = getSystemInfo
  exports.getUserInfo = getUserInfo$1
  exports.hideKeyboardShortcutBar = hideKeyboardShortcutBar
  exports.hideNavigation = hideNavigation
  exports.hideNotch = hideNotch
  exports.httpRequest = httpRequest
  exports.imagePicker = imagePicker
  exports.imageSave = imageSave
  exports.jumpBrowser = jumpBrowser
  exports.jumpToLauncher = jumpToLauncher
  exports.jumpWebview = jumpWebview
  exports.keyBoardForbidScroll = keyBoardForbidScroll
  exports.monitorKeyboard = monitorKeyboard
  exports.nativeShare = nativeShare
  exports.openMKDialogWebview = openMKDialogWebview
  exports.openUrl = openUrl
  exports.openWebview = openWebview
  exports.pickImages = pickImages
  exports.removeMonitorKeyboard = removeMonitorKeyboard
  exports.removeStorage = removeStorage
  exports.saveBase64ImageData = saveBase64ImageData
  exports.setNavLeftButton = setNavLeftButton
  exports.setNavRightButton = setNavRightButton
  exports.setNavigation = setNavigation
  exports.setNavigationTitle = setNavigationTitle
  exports.setOnKeyBack = setOnKeyBack
  exports.setStorage = setStorage
  exports.setWebviewPageID = setWebviewPageID
  exports.share = share
  exports.shareFriends = shareFriends
  exports.shareImage = shareImage
  exports.showNotch = showNotch
  exports.showToast = showToast
  exports.subscribe = subscribe
  exports.tantan = tantan
  exports.tantanCore = tantanCore
  exports.tantanSwiper = tantanSwiper
  exports.tantanVerification = tantanVerification
  exports.trackNew = trackNew
  exports.triggerAction = triggerAction
  exports.vibrate = vibrate

  Object.defineProperty(exports, '__esModule', { value: true })
})
