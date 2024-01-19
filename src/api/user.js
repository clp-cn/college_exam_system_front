import request from '../utils/request'
import { getToken } from '../utils/auth'

export default {
  // 获取用户分页列表
  getUserList(pageNo, pageSize, query) {
    return request({
      url: `user/getUserList/${pageNo}/${pageSize}`,
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: query
    })
  },
  // 根据用户id删除用户
  deleteUserById(id) {
    return request({
      url: `user/deleteUser/${id}`,
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  },
  // 删除所有用户
  deleteAll() {
    return request({
      url: 'user/deleteAll',
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  },
  // 批量删除用户
  deleteUsers(userIds) {
    return request({
      url: 'user/deleteUsers',
      method: 'delete',
      headers: {
        'token': getToken()
      },
      data: userIds
    })
  },
  // 新增用户
  addUser(user) {
    return request({
      url: 'user/saveUser',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: user
    })
  },
  // 更新用户账号状态
  updateUserStatus(id, status) {
    return request({
      url: `user/updateUserStatus/${id}/${status}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取用户信息
  getUserInfo(userId) {
    return request({
      url: `user/getUserInfo/${userId}`,
      method: 'post',
      headers: {
        'token': getToken()
      }
    })
  },
  // 用户更新
  updateUser(user) {
    return request({
      url: 'user/updateUser',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: user
    })
  },
  // 用户更新信息
  updateUserInfo(info) {
    return request({
      url: 'user/updateUserInfo',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: info
    })
  },
  // 取消用户更新，删除minio中存储的图片
  cancelUpdateUserInfo(imageUrl) {
    return request({
      url: 'user/cancelUpdateUserInfo',
      method: 'get',
      headers: {
        'token': getToken()
      },
      params: {
        'imageUrl': imageUrl
      }
    })
  },
  // 用户更新密码
  updatePassword(form) {
    return request({
      url: 'user/updatePassword',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: form
    })
  },
  // 获取用户头像
  getAvatar(userId) {
    return request({
      url: `user/getAvatar/${userId}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取总用户数
  getUsers() {
    return request({
      url: 'user/getUsers',
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取用户总访问量
  getUserAccesses() {
    return request({
      url: 'user/getUserAccesses',
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取每日用户访问量
  getTodayAccesses(date) {
    return request({
      url: `user/getTodayAccesses/${date}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取通知列表
  getAnnouncements() {
    return request({
      url: 'user/getAnnouncements',
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取更多通知
  getMoreAnnouncements() {
    return request({
      url: 'user/getMoreAnnouncements',
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 发布通知
  publishAnnouncement(announcement) {
    return request({
      url: 'user/publishAnnouncement',
      method: 'get',
      headers: {
        'token': getToken()
      },
      params: {
        announcement: announcement
      }
    })
  },
  // 删除通知
  deleteAnnouncement(announcement) {
    return request({
      url: 'user/deleteAnnouncement',
      method: 'delete',
      headers: {
        'token': getToken()
      },
      data: announcement
    })
  },
  // 获取gitee
  getGiteeByUserId(userId) {
    return request({
      url: `user/getGiteeByUserId/${userId}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 解绑gitee
  unbindGitee(userId) {
    return request({
      url: `user/unbindGitee/${userId}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 绑定gitee
  bindGitee(userId, gitee) {
    return request({
      url: `user/bindGitee/${userId}/${gitee}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  }
}
