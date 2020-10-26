import request from '@/utils/request'

// 测试
export function test(data) {
  return request({
    url: '/test',
    method: 'post',
    data
  })
}

// 测试接口错误
export function error() {
  return request({
    url: '/test/error',
    method: 'post'
  })
}
