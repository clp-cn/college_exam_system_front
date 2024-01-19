import request from '../utils/request'
import { getToken } from '../utils/auth'

export default {
  // 根据条件分页查询考场列表
  getExamRoomList(pageNo, pageSize, query) {
    return request({
      url: `examRoom/getExamRoomList/${pageNo}/${pageSize}`,
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: query
    })
  },
  // 新增考场
  addExamRoom(examRoom) {
    return request({
      url: 'examRoom/saveExamRoom',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: examRoom
    })
  },
  // 删除考场
  deleteExamRoom(id) {
    return request({
      url: `examRoom/deleteExamRoom/${id}`,
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  },
  // 批量删除考场
  deleteExamRooms(examRooms) {
    return request({
      url: 'examRoom/deleteExamRooms',
      method: 'delete',
      headers: {
        'token': getToken()
      },
      data: examRooms
    })
  }
}
