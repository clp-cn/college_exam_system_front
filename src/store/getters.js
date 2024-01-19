const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  roles: state => state.user.roles,
  nickname: state => state.user.nickname,
  userId: state => state.user.userId,
  qq: state => state.user.qq,
  qqEmail: state => state.user.qqEmail,
  telephone: state => state.user.telephone,
  teacherStudentNo: state => state.user.teacherStudentNo,
  gender: state => state.user.gender,
  gitee: state => state.user.gitee
}
export default getters
