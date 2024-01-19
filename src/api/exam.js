import request from '../utils/request'
import { getToken } from '../utils/auth'

export default {
  // 添加考试科目
  addSubject(subject) {
    return request({
      url: 'exam/saveSubject',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: subject
    })
  },
  // 获取考试科目分页列表
  getSubjectList(pageNo, paheSize) {
    return request({
      url: `exam/getSubjectList/${pageNo}/${paheSize}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取所有考试列表
  getExams() {
    return request({
      url: 'exam/getExams',
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 删除所有考试列表
  deleteExamAll() {
    return request({
      url: 'exam/deleteAll',
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  },
  // 更新考试科目
  updateSubject(subject) {
    return request({
      url: 'exam/updateSubject',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: subject
    })
  },
  // 删除考试科目
  deleteSubject(subjectId) {
    return request({
      url: `exam/deleteSubject/${subjectId}`,
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  },
  // 批量删除考试科目
  deleteSubjects(subjectIds) {
    return request({
      url: `exam/deleteSubjects/${subjectIds}`,
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取考试安排分页列表
  getExamList(pageNo, pageSize) {
    return request({
      url: `exam/getExamList/${pageNo}/${pageSize}`,
      method: 'post',
      headers: {
        'token': getToken()
      }
    })
  },
  // 自动排考
  schedulerExams(start, end) {
    return request({
      url: `exam/schedulerExams/${start}/${end}`,
      method: 'post',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取准考证分页列表
  getExamCardList(pageNo, pageSize, query) {
    return request({
      url: `exam/getExamCardList/${pageNo}/${pageSize}`,
      method: 'get',
      headers: {
        'token': getToken()
      },
      params: {
        query: query
      }
    })
  },
  // 获取所有的准考证
  getExamCards() {
    return request({
      url: 'exam/getExamCards',
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 删除所有的准考证
  deleteExamCardAll() {
    return request({
      url: 'exam/deleteExamCardAll',
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  }
}
