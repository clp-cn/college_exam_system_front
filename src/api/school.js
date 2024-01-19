import request from '../utils/request'
import { getToken } from '../utils/auth'

export default {
  // 获取学院分页列表
  getCollegeList(pageNo, pageSize) {
    return request({
      url: `school/getCollegeList/${pageNo}/${pageSize}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取学院列表
  getColleges() {
    return request({
      url: 'school/getColleges',
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 删除学院
  deleteCollege(collegeId) {
    return request({
      url: `school/deleteCollege/${collegeId}`,
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  },
  // 批量删除学院
  deleteColleges(collegeIds) {
    return request({
      url: 'school/deleteColleges',
      method: 'delete',
      headers: {
        'token': getToken()
      },
      data: collegeIds
    })
  },
  // 新增学院
  addCollege(college) {
    return request({
      url: 'school/addCollege',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: college
    })
  },
  // 更新学院
  updateCollege(college) {
    return request({
      url: 'school/updateCollege',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: college
    })
  },
  // 获取专业分页列表
  getProfessionList(pageNo, pageSize) {
    return request({
      url: `school/getProfessionList/${pageNo}/${pageSize}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 根据学院获取专业列表
  getProfessions(college) {
    return request({
      url: 'school/getProfessions',
      method: 'get',
      headers: {
        'token': getToken()
      },
      params: {
        college: college
      }
    })
  },
  // 新增专业
  addProfession(profession) {
    return request({
      url: 'school/addProfession',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: profession
    })
  },
  // 删除专业
  deleteProfession(professionId) {
    return request({
      url: `school/deleteProfession/${professionId}`,
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  },
  // 批量删除专业
  deleteProfessions(professionIds) {
    return request({
      url: 'school/deleteProfessions',
      method: 'delete',
      headers: {
        'token': getToken()
      },
      data: professionIds
    })
  },
  // 获取班级分页列表
  getClassList(pageNo, pageSize) {
    return request({
      url: `school/getClassList/${pageNo}/${pageSize}`,
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 获取所有班级
  getClasses() {
    return request({
      url: 'school/getClasses',
      method: 'get',
      headers: {
        'token': getToken()
      }
    })
  },
  // 根据学院和年级获取公共班级列表
  getElectiveClasses(college, grade) {
    return request({
      url: 'school/getElectiveClasses',
      method: 'get',
      headers: {
        'token': getToken()
      },
      params: {
        college: college,
        grade: grade
      }
    })
  },
  // 根据专业和年级获取班级列表
  getClassesBySearch(college, profession, grade) {
    return request({
      url: 'school/getClassesBySearch',
      method: 'get',
      headers: {
        'token': getToken()
      },
      params: {
        college: college,
        profession: profession,
        grade: grade
      }
    })
  },
  // 新增班级
  addClass(classes) {
    return request({
      url: 'school/addClass',
      method: 'post',
      headers: {
        'token': getToken()
      },
      data: classes
    })
  },
  // 删除班级
  deleteClass(classId) {
    return request({
      url: `school/deleteClass/${classId}`,
      method: 'delete',
      headers: {
        'token': getToken()
      }
    })
  },
  // 批量删除班级
  deleteClasses(classIds) {
    return request({
      url: 'school/deleteClasses',
      method: 'delete',
      headers: {
        'token': getToken()
      },
      data: classIds
    })
  }
}
