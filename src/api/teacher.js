import request from '../utils/request'
import { getToken } from '../utils/auth'

export default {
  // 添加监考老师
  addInvigilator(invigilator) {
    return request({
      url: 'teacher/saveInvigilator',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: invigilator
    })
  },
  // 获取监考老师分页列表
  getInvigilatorList(pageNo, pageSize, query) {
    return request({
      url: `teacher/getInvigilatorList/${pageNo}/${pageSize}`,
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: query
    })
  },
  // 删除监考老师
  deleteInvigilator(id) {
    return request({
      url: `teacher/deleteInvigilator/${id}`,
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  },
  // 批量删除监考老师
  deleteInvigilators(invigilators) {
    return request({
      url: 'teacher/deleteInvigilators',
      method: 'delete',
      headers: {
        'token': getToken()
      },
      data: invigilators
    })
  },
  // 删除所有的监考老师
  deleteAll() {
    return request({
      url: 'teacher/deleteAll',
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  },
  // 更新监考老师信息
  updateInvigilator(info) {
    return request({
      url: 'teacher/updateInvigilator',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: info
    })
  },
  // 根据教工号获取教师信息
  getTeacherInfo(teacherNo) {
    return request({
      url: `teacher/getTeacherInfo/${teacherNo}`,
      method: 'post',
      headers: {
        'token': getToken()
      }
    })
  },
  // 绑定教师
  bindTeacher(userId, teacherNo) {
    return request({
      url: `teacher/bindTeacher/${userId}/${teacherNo}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 解绑教师
  unbindTeacher(userId) {
    return request({
      url: `teacher/unbindTeacher/${userId}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 根据教工号获取监考信息列表
  getTeacherExams(teacherNo) {
    return request({
      url: `teacher/getTeacherExams/${teacherNo}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取老师总人数
  getTeachers() {
    return request({
      url: 'teacher/getTeachers',
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  }
}
