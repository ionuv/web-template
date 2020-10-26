/*
 * @Author: Yu lin Liu
 * @Date: 2019-08-22 09:21:27
 * @Description: file content
 */
import axios from 'axios'
import qs from 'qs'
import { throwErr } from './throwErr'
import { toast } from 'components/zv-pop/index'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // api的base_url
  timeout: 20000, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  }
})

let loading = null
// request拦截器
service.interceptors.request.use(
  config => {
    // 在请求先展示加载框
    if (!config.data || !config.data.isHideLoading) {
      loading = toast({ loading: '加载中...' })
    }

    // 处理请求参数
    handleParams(config)

    // 是否要更改header内容 上传文件
    if (config.isFile) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    // 删除多余的参数isHideLoading
    if (config.data.isHideLoading) {
      delete config.data.isHideLoading
    }

    // 用qs处理参数可以处理options请求（预请求），或者设置'Access-Control-MAX-AGE':'1000'
    if (config.method === 'post') {
      // 设置参数拼接方式
      if (
        config.data &&
        config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
      ) {
        config.data = qs.stringify(config.data, {
          arrayFormat: 'indices',
          allowDots: true,
          encode: false
        })
      }
    } else {
      if (config.data) {
        config.url = config.url + '?' + qs.stringify(config.data)
      }
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    // 请求响应后关闭加载框
    if (loading) {
      loading.clear()
    }
    // code为非0是抛错 可结合自己业务进行修改
    if (response.status === 200) {
      const res = response.data
      if (res.code === '0') {
        return Promise.resolve(res)
      } else {
        return throwErr(res)
      }
    } else {
      // 隐藏loading
      return Promise.reject('networkRequestError')
    }
  },
  error => {
    // 请求响应后关闭加载框
    if (loading) {
      loading.clear()
    }
    // 断网 或者 请求超时 状态
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes('timeout')) {
        toast({ message: '请求超时，请检查网络是否连接正常' })
      } else {
        // 可以展示断网组件
        toast({ message: '请求失败，请检查网络是否已连接' })
      }
    }
    return Promise.reject(error)
  }
)

// 处理请求参数
function handleParams(config) {
  if (!config.data) {
    // 防止不传参数的情况下，config中没有data属性
    config['data'] = {}
  }

  // 此处可以用来处理公共的请求参数
  config.data['sessionId'] = '123456'

  // 合并请求参数
  if (config.params) {
    config.data = { ...config.data, ...config.params }
  }
}

export default service
