import { getToken, setToken, removeToken } from '@/utils/auth'
import loginApi from '../../api/login'
import userApi from '../../api/user'
const user = {
  state: {
    token: getToken(),
    username: '',
    avatar: '',
    roles: [],
    nickname: '',
    userId: '',
    telephone: '',
    qq: '',
    qqEmail: '',
    teacherStudentNo: '',
    gender: '',
    gitee: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, username) => {
      state.username = username
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_TELEPHONE: (state, telephone) => {
      state.telephone = telephone
    },
    SET_QQ: (state, qq) => {
      state.qq = qq
    },
    SET_QQEMAIL: (state, qqEmail) => {
      state.qqEmail = qqEmail
    },
    SET_TEACHERSTUDENTNO: (state, teacherStudentNo) => {
      state.teacherStudentNo = teacherStudentNo
    },
    SET_GENDER: (state, gender) => {
      state.gender = gender
    },
    SET_GITEE: (state, gitee) => {
      state.gitee = gitee
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginApi.login(userInfo).then(response => {
          if (response.code === 200) {
            setToken(response.data)
            commit('SET_TOKEN', response.data)
            resolve()
          } else {
            this.$message({
              type: 'error',
              message: response.message,
              center: true
            })
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    GitLogin({ commit }, giteeId) {
      return new Promise((resolve, reject) => {
        loginApi.getUserByGit(giteeId).then(response => {
          if (response.code === 200) {
            setToken(response.data)
            commit('SET_TOKEN', response.data)
            resolve()
          } else {
            this.$message({
              type: 'error',
              message: 'Git登录失败！',
              center: true
            })
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    PhoneLogin({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        loginApi.loginPhone(loginForm.phone, loginForm.code).then(response => {
          if (response.code === 200) {
            setToken(response.data)
            commit('SET_TOKEN', response.data)
            resolve()
          } else {
            this.$message({
              type: 'error',
              message: '手机登录失败！',
              center: true
            })
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginApi.getInfo(state.token).then(response => {
          userApi.getUserInfo(response.data.userId).then(response => {
            const data = response.data
            if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            commit('SET_NAME', data.username)
            commit('SET_AVATAR', data.avatar)
            commit('SET_NICKNAME', data.nickname)
            commit('SET_USERID', data.userId)
            commit('SET_TELEPHONE', data.telephone)
            commit('SET_QQ', data.qq)
            commit('SET_QQEMAIL', data.qqEmail)
            commit('SET_TEACHERSTUDENTNO', data.teacherStudentNo)
            commit('SET_GENDER', data.gender)
            commit('SET_GITEE', data.gitee)
            resolve(response)
          })
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 后端 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginApi.logout(state.token).then(response => {
          if (response.code === 200) {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_NICKNAME', '')
            removeToken()
            resolve()
          } else {
            this.$message({
              type: 'error',
              message: response.message,
              center: true
            })
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
