<template>
  <div>
    <el-descriptions :column="2" size="medium" title="我的信息" direction="horizontal" border style="width: 94%;margin-left: 3%;margin-top: 70px;margin-bottom: 20px">
      <el-descriptions-item span="2" label="用户头像"><img :src="avatar" alt="" style="width: 200px;height: 200px"></el-descriptions-item>
      <el-descriptions-item span="2" label="用户名">{{ username }}</el-descriptions-item>
      <el-descriptions-item span="2" label="用户昵称">{{ nickname }}</el-descriptions-item>
      <el-descriptions-item span="2" label="用户身份">
        <el-tag size="small">{{ roles }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item span="2" label="用户性别">{{ gender }}</el-descriptions-item>
      <el-descriptions-item span="2" label="QQ">{{ qq }}</el-descriptions-item>
      <el-descriptions-item span="2" label="QQ邮箱">{{ qqEmail }}</el-descriptions-item>
      <el-descriptions-item span="2" label="联系方式">{{ telephone }}</el-descriptions-item>
      <el-descriptions-item span="2" label="Gitee账户">
        <el-button v-if="gitee !== null" type="danger" @click="unbindGitee">取消绑定</el-button>
        <el-button v-if="gitee === null && showBind" type="primary" @click="inGitee">绑定Gitee</el-button>
        <el-input v-if="gitee === null && showGitInput" v-model="giteeName" placeholder="请输入Gitee账号" style="width: 250px" @keydown.enter.native="bindGitee()"/>
        <el-button v-if="gitee === null && showGitInput" type="success" style="margin-left: 10px" @click="bindGitee">绑定</el-button>
        <el-button v-if="gitee === null && showGitInput" type="info" @click="outGitee">取消</el-button>
      </el-descriptions-item>
      <el-descriptions-item span="2" label="操作">
        <el-button type="warning" @click="updateInfo = true">修改信息</el-button>
        <el-button type="info" style="margin-left: 30px" @click="updatePassword = true">修改密码</el-button>
      </el-descriptions-item>
    </el-descriptions>
    <!--    修改信息-->
    <el-dialog
      :visible.sync="updateInfo"
      :before-close="handleClose"
      title="修改信息"
      width="30%"
      center>
      <el-form ref="updateForm" :model="updateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="用户名"
          prop="username">
          <el-input v-model="updateForm.username" autocomplete="off" style="width: 85%" @keydown.enter.native="submitForm('updateForm')"/>
        </el-form-item>
        <el-form-item
          label="用户昵称"
          prop="nickname"
        >
          <el-input v-model="updateForm.nickname" autocomplete="off" style="width: 85%" @keydown.enter.native="submitForm('updateForm')"/>
        </el-form-item>
        <el-form-item prop="gender" label="性别">
          <el-radio v-model="updateForm.gender" label="男">男</el-radio>
          <el-radio v-model="updateForm.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item
          label="QQ"
          prop="qq"
        >
          <el-input v-model="updateForm.qq" autocomplete="off" style="width: 85%" @keydown.enter.native="submitForm('updateForm')"/>
        </el-form-item>
        <el-form-item
          label="QQ邮箱"
          prop="qqEmail"
        >
          <el-input v-model="updateForm.qqEmail" autocomplete="off" style="width: 85%" @keydown.enter.native="submitForm('updateForm')"/>
        </el-form-item>
        <el-form-item
          label="联系方式"
          prop="telephone"
        >
          <el-input v-model="updateForm.telephone" autocomplete="off" style="width: 85%" @keydown.enter.native="submitForm('updateForm')"/>
        </el-form-item>
        <el-form-item
          label="用户头像"
          prop="avatar">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="headers"
            v-model="updateForm.avatar"
            class="avatar-uploader"
            action="http://localhost:10010/user/uploadAvatar/">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="用户头像">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('updateForm')">提交</el-button>
          <el-button type="primary" style="margin-left: 12%" @click="resetForm('updateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    修改密码-->
    <el-dialog
      :visible.sync="updatePassword"
      title="修改密码"
      width="30%"
      center>
      <el-form ref="updatePasswordForm" :model="updatePasswordForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          :rules="[
            {required: true, message: '原密码不能为空'}
          ]"
          label="原密码"
          prop="oldPassword"
        >
          <el-input v-model="updatePasswordForm.oldPassword" type="password" autocomplete="off" style="width: 85%"/>
        </el-form-item>
        <el-form-item
          :rules="[
            {required: true, message: '新密码不能为空'}
          ]"
          label="新密码"
          prop="newPassword"
        >
          <el-input v-model="updatePasswordForm.newPassword" type="password" autocomplete="off" style="width: 85%"/>
        </el-form-item>
        <el-form-item
          :rules="[
            {required: true, message: '确认密码不能为空'}
          ]"
          label="确认密码"
          prop="confirmPassword"
        >
          <el-input v-model="updatePasswordForm.confirmPassword" type="password" autocomplete="off" style="width: 85%" @keydown.enter.native="submitPasswordForm('updatePasswordForm')"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPasswordForm('updatePasswordForm')">提交</el-button>
          <el-button @click="resetForm('updatePasswordForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import UserApi from '../../api/user'
import { getToken, removeToken } from '../../utils/auth'
import { mapGetters } from 'vuex'
import User from '../../store/modules/user'
export default {
  name: 'AInfo',
  data() {
    return {
      updateInfo: false,
      updatePassword: false,
      updateForm: {
        avatar: '',
        gender: '男'
      },
      updatePasswordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      headers: {
        'token': getToken()
      },
      imageUrl: null,
      gitee: '',
      giteeName: '',
      showGitInput: false,
      showBind: true
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'avatar',
      'nickname',
      'username',
      'roles',
      'gender',
      'qq',
      'qqEmail',
      'telephone',
      'avatar'
    ])
  },
  created() {
    this.getGiteeByUserId()
  },
  methods: {
    // 根据userId获取Gitee账户
    getGiteeByUserId() {
      UserApi.getGiteeByUserId(this.userId).then(response => {
        if (response.code === 200) {
          this.gitee = response.data
        }
      })
    },
    inGitee() {
      this.showBind = false
      this.showGitInput = true
      this.giteeName = ''
    },
    outGitee() {
      this.showBind = true
      this.showGitInput = false
      this.giteeName = ''
    },
    bindGitee() {
      if (this.giteeName === '') {
        this.$message.info('Gitee账户不能为空!')
        return false
      }
      UserApi.bindGitee(this.userId, this.giteeName.trim()).then(response => {
        if (response.code === 200) {
          this.$notify({
            title: '成功',
            type: 'success',
            message: '绑定成功'
          })
          this.getGiteeByUserId()
        } else {
          this.$notify.error('绑定失败')
        }
      })
    },
    unbindGitee() {
      UserApi.unbindGitee(this.userId).then(response => {
        if (response.code === 200) {
          this.$notify({
            type: 'success',
            message: '解绑Gitee成功！',
            title: '成功'
          })
          this.getGiteeByUserId()
          this.showBind = true
          this.showGitInput = false
        } else {
          this.$notify.error('解绑失败，请重试！')
        }
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message({
          type: 'error',
          message: '上传头像图片只能是 JPG 格式!',
          center: true
        })
      }
      if (!isLt2M) {
        this.$message({
          type: 'error',
          message: '上传头像图片大小不能超过 2M!',
          center: true
        })
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess(res) {
      this.imageUrl = res.data
      User.mutations.SET_AVATAR(User.state, this.imageUrl)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateForm.userId = this.userId
          this.updateForm.avatar = this.imageUrl
          UserApi.updateUserInfo(this.updateForm).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              this.getUserInfo()
              location.reload()
            } else {
              this.$message({
                type: 'error',
                message: response.message,
                center: true
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '错误的提交信息！',
            center: true
          })
          return false
        }
      })
    },
    submitPasswordForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.updatePasswordForm.newPassword === this.updatePasswordForm.oldPassword) {
            this.resetForm(formName)
            this.$message({
              type: 'error',
              message: '新密码不能与原密码相同',
              center: true
            })
          } else if (this.updatePasswordForm.newPassword !== this.updatePasswordForm.confirmPassword) {
            this.resetForm(formName)
            this.$message({
              type: 'error',
              message: '两次密码输入不一致',
              center: true
            })
          }
          this.updatePasswordForm.userId = this.userId
          UserApi.updatePassword(this.updatePasswordForm).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              removeToken()
              window.location.reload()
            } else {
              this.$message({
                type: 'error',
                message: response.message,
                center: true
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '错误的提交信息！',
            center: true
          })
          return false
        }
      })
    },
    handleClose(done) {
      this.resetForm('updateForm')
      done()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      // 发送删除图片请求
      if (this.imageUrl === null) {
        return false
      }
      this.cancelUpdateUserInfo()
      this.imageUrl = null
    },
    // 取消用户信息更新
    cancelUpdateUserInfo() {
      UserApi.cancelUpdateUserInfo(this.imageUrl)
    },
    getUserInfo() {
      UserApi.getUserInfo(this.userId).then(async response => {
        if (response.code === 200) {
          const data = await response.data
          User.mutations.SET_AVATAR(User.state, data.avatar)
          User.mutations.SET_NAME(User.state, data.username)
          User.mutations.SET_NICKNAME(User.state, data.nickname)
          User.mutations.SET_GENDER(User.state, data.gender)
          User.mutations.SET_QQ(User.state, data.qq)
          User.mutations.SET_QQEMAIL(User.state, data.qqEmail)
          User.mutations.SET_TEACHERSTUDENTNO(User.state, data.teacherStudentNo)
          User.mutations.SET_TELEPHONE(User.state, data.telephone)
        } else {
          this.$message({
            type: 'error',
            message: '用户信息加载失败！',
            center: true
          })
        }
      })
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
