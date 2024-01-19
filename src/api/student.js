import request from '../utils/request'
import { getToken } from '../utils/auth'

export default {
  // 获取学生分页列表
  getStudentList(pageNo, pageSize, query) {
    return request({
      url: `student/getStudentList/${pageNo}/${pageSize}`,
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: query
    })
  },
  // 删除学生
  deleteStudent(id) {
    return request({
      url: `student/deleteStudent/${id}`,
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  },
  // 批量删除学生
  deleteStudents(students) {
    return request({
      url: 'student/deleteStudents',
      method: 'delete',
      headers: {
        'token': getToken()
      },
      data: students
    })
  },
  // 删除所有学生
  deleteAll() {
    return request({
      url: 'student/deleteAll',
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  },
  // 新增学生
  addStudent(student) {
    return request({
      url: 'student/addStudent',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: student
    })
  },
  // 更新学生信息
  updateStudent(student) {
    return request({
      url: 'student/updateStudent',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: student
    })
  },
  // 根据学号获取学生
  getStudent(studentNo) {
    return request({
      url: `student/getStudent/${studentNo}`,
      method: 'post',
      headers: {
        'token': getToken()
      }
    })
  },
  // 绑定学生
  bindStudent(userId, studentNo) {
    return request({
      url: `student/bindStudent/${userId}/${studentNo}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 解绑学生
  unbindStudent(userId) {
    return request({
      url: `student/unbindStudent/${userId}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取学生考试信息列表
  getStudentExams(studentNo) {
    return request({
      url: `student/getStudentExams/${studentNo}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取学院学生数
  getCollegeStudents() {
    return request({
      url: 'student/getCollegeStudents',
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取学生总数
  getStudents() {
    return request({
      url: 'student/getStudents',
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 添加学生公共班级
  addElectiveClass(form, studentId) {
    return request({
      url: `student/addElectiveClass/${studentId}`,
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: form
    })
  },
  // 移除学生公共班级
  removeElectiveClass(studentId, className) {
    return request({
      url: 'student/removeElectiveClass',
      method: 'get',
      headers: {
        'token': getToken()
      },
      params: {
        studentId: studentId,
        className: className
      }
    })
  }
}
