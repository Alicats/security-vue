import request from '@/utils/request'

// 登录方法
export function login(username, password) {
  return request({
    url: '/authentication',
    method: 'post',
    data: {
      username,
      password
    }
  })
}


// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
