import request from '../utils/request'
import { getToken } from '../utils/auth'
export default {
  login(user) {
    return request({
      url: 'system/user/login',
      method: 'post',
      data: user
    })
  },
  getInfo() {
    return request({
      url: 'system/user/getInfo',
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  logout() {
    return request({
      url: `system/user/logout`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  resetPassword(email) {
    return request({
      url: `system/user/resetPassword/${email}`,
      method: 'post'
    })
  },
  loginPhone(phone, code) {
    return request({
      url: 'oauth/loginPhone',
      method: 'get',
      params: {
        'phone': phone,
        'code': code
      }
    })
  },
  sendSms(phone) {
    return request({
      url: `oauth/sendSms/${phone}`,
      method: 'get'
    })
  },
  gitLogin() {
    return request({
      url: 'oauth/loginGit',
      method: 'get'
    })
  },
  getUserByGit(gitee) {
    return request({
      url: `oauth/getUserByGit/${gitee}`,
      method: 'get'
    })
  }
}

