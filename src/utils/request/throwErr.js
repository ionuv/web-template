/**
 * @author: 刘宇琳
 * @date: 2019-05-30
 * @description: 此文件用来捕获网络请求相关错误
 */
import { Toast } from 'vant'

export const throwErr = res => {
  let message
  if (res.code === '20' || res.code === '21') {
    message =
      res.code === '20'
        ? '缺少sessionId，请重新登入'
        : '无效的sessionId，请重新登入'

    setTimeout(() => {
      location.reload()
    }, 1000)
  } else {
    message = res.msg || '网络请求发生错误'
  }
  Toast.fail(message || '网络请求发生错误')
  return Promise.reject(message || '网络请求发生错误')
}
