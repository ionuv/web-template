import Vue from 'vue'
import storage from 'good-storage'

let debugConfig = {
    //项目名称
    entryName: 'entryName',
    //脚本版本
    scriptVersion: '1.0',
    // 环境
    releaseStage: 'pro'
  },
  debug = {
    notifyWarn({ message, metaData }) {
      let type = 'caught',
        severity = 'warn'

      _logReport({ type, severity, message, metaData })
    },
    notifyError({ type = 'caught', error, message, metaData }) {
      let severity = 'error'

      _logReport({ type, severity, error, metaData, message })
    }
  }

// 日志上报
function _logReport({ type, severity, error, metaData, message }) {
  message = message || (error && error.message) || ''

  //这里可以做一个灰度控制

  let { entryName, releaseStage, scriptVersion } = debugConfig,
    name = (error && error.name) || 'error',
    stacktrace = (error && error.stack) || '',
    time = Date.now(),
    title = document.title,
    url = window.location.href,
    client = {
      userAgent: window.navigator.userAgent,
      height: window.screen.height,
      width: window.screen.width,
      referrer: window.document.referrer
    },
    pageLevel = 'p0'

  //此处可以给你的页面进行分级
  //getPageLevel();

  //将错误信息保存，也可以上传到自己后台服务器
  storage.set('errorLog', {
    entryName,
    scriptVersion,
    message,
    metaData,
    name,
    releaseStage,
    severity,
    stacktrace,
    time,
    title,
    type,
    url,
    client,
    pageLevel //页面等级
  })
}

function formatComponentName(vm) {
  if (vm.$root === vm) return 'root'
  let name = vm._isVue
    ? (vm.$options && vm.$options.name) ||
      (vm.$options && vm.$options._componentTag)
    : vm.name
  return (
    (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options && vm.$options.__file
      ? ' at ' + (vm.$options && vm.$options.__file)
      : '')
  )
}

//如果是生产环境捕获错误信息并上传
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function(err, vm, info) {
    if (vm) {
      let componentName = formatComponentName(vm)
      let propsData = vm.$options && vm.$options.propsData
      debug.notifyError({
        error: err,
        metaData: {
          componentName,
          propsData,
          info,
          userToken: { token: 'user-token' } //metaData可以存一些额外数据，比如：用户信息等
        }
      })
    } else {
      debug.notifyError({
        error: err,
        metaData: {
          userToken: { token: 'user-token' } //metaData可以存一些额外数据，比如：用户信息等
        }
      })
    }
  }

  window.onerror = function(msg, url, lineNo, columnNo, error) {
    debug.notifyError({
      type: 'uncaught',
      error,
      metaData: {
        userToken: { token: 'user-token' } //metaData可以存一些额外数据，比如：用户信息等
      },
      message: msg,
      lineNumber: lineNo,
      columnNumber: columnNo,
      fileName: url
    })
  }
}
