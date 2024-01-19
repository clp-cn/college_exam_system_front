import request from '../utils/request'
import { getToken } from '../utils/auth'
export default {
  // 根据用户权限获取菜单列表
  getMenus() {
    return request({
      url: 'menu/getMenus',
      method: 'GET',
      headers: {
        'token': getToken()
      }
    })
  }
}
