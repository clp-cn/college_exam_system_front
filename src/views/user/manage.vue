<template>
  <div>
    <!--    用户搜索-->
    <el-form :inline="true" :model="query" class="demo-form-inline" style="margin-left: 2%;margin-top: 100px;width:96%;border-bottom: 1px dashed #C0C4CC ">
      <!--      新增用户-->
      <el-form-item>
        <el-popover
          placement="right"
          width="400"
          trigger="click">
          <h3 style="text-align: center">新增用户</h3>
          <el-form ref="user" :model="user" label-width="100px" class="demo-ruleForm" style="width: 300px;margin-top: 20px">
            <el-form-item
              :rules="[
                { required: true, message: '用户名不能为空'},
              ]"
              label="用户名"
              prop="username"
            >
              <el-input v-model="user.username" autocomplete="off"/>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '密码不能为空'},
              ]"
              label="密 码"
              prop="password"
            >
              <el-input v-model="user.password" :type="pwdType" autocomplete="off">
                <i slot="suffix" class="el-icon-view" @click="showPwd"/>
              </el-input>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '用户性别不能为空'},
              ]"
              label="性别"
              prop="gender"
            >
              <el-radio v-model="user.gender" label="男">男</el-radio>
              <el-radio v-model="user.gender" label="女">女</el-radio>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '用户角色不能为空'},
              ]"
              label="角色"
              prop="roles"
            >
              <el-select v-model="user.roles" placeholder="请选择用户角色">
                <el-option value="教师"/>
                <el-option value="学生"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addUser('user')">提交</el-button>
              <el-button @click="resetForm('user')">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button slot="reference" type="primary" icon="el-icon-plus">新增用户</el-button>
        </el-popover>
      </el-form-item>
      <!--      批量删除用户-->
      <el-form-item>
        <el-button :disabled="deleteBtn" type="primary" icon="el-icon-delete" @click="open">批量删除</el-button>
      </el-form-item>
      <el-form-item label="用户名" style="margin-left: 20px">
        <el-input v-model="query.username" placeholder="用户名"/>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="query.nickname" placeholder="用户昵称"/>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="query.roles" placeholder="用户角色">
          <el-option label="教师" align="center" value="教师"/>
          <el-option label="学生" align="center" value="学生"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getUserList()">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="onReset">重置</el-button>
        <el-button type="warning" icon="el-icon-delete" @click="clearList">清空列表</el-button>
      </el-form-item>
      <!--            文件上传-->
      <el-form-item>
        <el-upload
          :before-upload="beforeFileUpload"
          :headers="headers"
          :on-success="handleUploadExcelSuccess"
          :on-error="handleUploadExcelError"
          :show-file-list="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          class="upload-demo"
          action="http://localhost:10010/user/receiveExcel">
          <el-button class="uploadExcel1" type="success" icon="el-icon-upload">导入文件</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <!--    用户表格-->
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="userList"
      tooltip-effect="dark"
      stripe
      style="width: 96%;margin-left: 2%;margin-top: 20px;box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1)"
      @selection-change="handleSelectionChange">
      <el-table-column
        fixed
        type="selection"
        align="center"
        width="100"/>
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="100"/>
      <el-table-column
        label="用户头像"
        prop="avatarData"
        align="center"
        width="150">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="width: 100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username"
        align="center"
        width="150"/>
      <el-table-column
        prop="nickname"
        label="昵称"
        align="center"
        width="150"/>
      <el-table-column
        prop="gender"
        label="性别"
        align="center"
        width="120"/>
      <el-table-column
        prop="qq"
        label="QQ"
        align="center"
        width="220"/>
      <el-table-column
        prop="qqEmail"
        label="QQ邮箱"
        align="center"
        width="220"/>
      <el-table-column
        prop="telephone"
        label="电话"
        align="center"
        width="220"/>
      <el-table-column
        prop="roles"
        label="用户角色"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.roles === '学生' ? '' : 'success'"
            disable-transitions
          >{{ scope.row.roles }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="用户状态"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-tooltip :content="'用户状态: ' + scope.row.status" placement="top">
            <el-switch
              v-model="scope.row.status"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-value="已锁定"
              inactive-value="正常"
              @change="updateStatus(scope.row)"/>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            title="您确定要删除该用户吗？"
            @confirm="deleteUser(scope.row)"
          >
            <el-button slot="reference" type="danger" icon="el-icon-delete" circle size="small"/>
          </el-popconfirm>
          <el-button type="primary" icon="el-icon-edit" circle size="small" @click="openDrawer(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页选择器-->
    <el-pagination
      :total="total"
      :page-size="pageSize"
      :page-sizes="[5,10,20,50,100]"
      :current-page="pageNo"
      layout="->, total, sizes, prev, pager, next, jumper"
      style="margin-right: 2%;margin-top: 20px;margin-bottom: 20px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
    <!--    更新用户-->
    <el-drawer
      :visible.sync="drawer"
      :with-header="true"
      title="用户信息修改">
      <el-form ref="updateUserForm" :model="updateUserForm" label-width="100px" class="demo-ruleForm" style="width: 400px">
        <el-form-item
          :rules="[
            {required: true, message: '用户名不能为空'}
          ]"
          label="用户名"
          prop="username">
          <el-input v-model="updateUserForm.username"/>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="updateUserForm.nickname"/>
        </el-form-item>
        <el-form-item
          label="用户密码"
          prop="password">
          <el-input v-model.number="updateUserForm.password" :type="pwdType" autocomplete="off">
            <i slot="suffix" class="el-icon-view" @click="showPwd"/>
          </el-input>
        </el-form-item>
        <el-form-item
          :rules="[
            { required: true, message: '用户性别不能为空'},
          ]"
          label="性别"
          prop="gender"
        >
          <el-radio v-model="updateUserForm.gender" label="男">男</el-radio>
          <el-radio v-model="updateUserForm.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item
          :rules="[
            {required: true, message: '用户名不能为空'}
          ]"
          label="用户角色"
          prop="roles">
          <el-select v-model="updateUserForm.roles" placeholder="请选择用户角色">
            <el-option label="教师" align="center" value="教师"/>
            <el-option label="学生" align="center" value="学生"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateUser('updateUserForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import UserApi from '../../api/user'
import { getToken } from '../../utils/auth'

export default {
  name: 'Manage',
  data() {
    return {
      total: 0,
      userList: [],
      multipleSelection: [],
      pageNo: 1,
      pageSize: 5,
      loading: true,
      deleteBtn: true,
      query: {
        username: '',
        nickname: '',
        roles: ''
      },
      user: {
        username: '',
        password: '',
        gender: '男',
        roles: ''
      },
      pwdType: 'password',
      drawer: false,
      updateUserForm: {
        userId: null,
        username: '',
        password: '',
        nickname: '',
        gender: '男',
        roles: '',
        status: ''
      },
      headers: {
        'token': getToken()
      }
    }
  },
  mounted() {
    this.getUserList(1)
  },
  methods: {
    clearList() {
      UserApi.deleteAll().then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '已清空！',
            center: true
          })
          this.getUserList()
        } else {
          this.$message({
            type: 'error',
            message: '操作失败，请重试！',
            center: true
          })
        }
      })
    },
    beforeFileUpload(file) {
      // 文件格式校验
      if (file.type !== 'application/vnd.ms-excel' && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.$message.error('上传文件只能是xls/xlsx格式!')
        return false
      }
      return true
    },
    handleUploadExcelSuccess(res) {
      if (res.code === 200) {
        this.getUserList(1)
        this.$message.success(res.data)
      } else {
        this.$message.error(res.data)
      }
    },
    handleUploadExcelError() {
      this.$message.error('上传失败！')
    },
    // 批量删除用户
    open() {
      this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.deleteUsers()
          } else {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        }
      })
    },
    // 更新用户账号状态
    updateStatus(user) {
      UserApi.updateUserStatus(user.userId, user.status).then(response => {
        if (response.code === 200) {
          this.$notify({
            title: '成功',
            message: '用户状态已更改！',
            type: 'success'
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: '更改用户状态操作失败！'
          })
        }
      })
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    // 添加用户
    addUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.user.username = this.user.username.trim()
          UserApi.addUser(this.user).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              this.resetForm(formName)
              this.getUserList()
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
            message: '请填写正确的用户信息！',
            center: true
          })
          return false
        }
      })
    },
    // 重置添加表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.getUserList(val)
    },
    // 重置搜索表单
    onReset() {
      this.query.username = ''
      this.query.nickname = ''
      this.query.roles = ''
    },
    // 删除用户
    deleteUser(row) {
      UserApi.deleteUserById(row.userId).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getUserList()
        } else {
          this.$message({
            type: 'error',
            message: response.message,
            center: true
          })
        }
      })
    },
    // 批量删除用户
    deleteUsers() {
      const ids = []
      this.multipleSelection.forEach(m => ids.push(m.userId))
      UserApi.deleteUsers(ids).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getUserList()
        } else {
          this.$message({
            type: 'error',
            message: response.message,
            center: true
          })
        }
      })
    },
    // 更新用户
    openDrawer(row) {
      this.drawer = true
      this.updateUserForm.userId = row.userId
      this.updateUserForm.username = row.username
      this.updateUserForm.nickname = row.nickname
      this.updateUserForm.password = row.password
      this.updateUserForm.gender = row.gender
      this.updateUserForm.roles = row.roles
      this.updateUserForm.status = row.status
    },
    // 用户更新
    updateUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateUserForm.username = this.updateUserForm.username.trim()
          this.updateUserForm.nickname = this.updateUserForm.nickname.trim()
          UserApi.updateUser(this.updateUserForm).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              this.getUserList()
              this.drawer = false
            } else {
              this.$message({
                type: 'error',
                message: response.message,
                center: true
              })
              this.drawer = false
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '请填写正确的用户信息！',
            center: true
          })
          return false
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.multipleSelection.forEach(select => {
        if (select.status === '正常') {
          select.status = 0
        } else {
          select.status = 1
        }
      })
      this.deleteBtn = this.multipleSelection.length <= 0
    },
    // 获取用户分页列表
    getUserList(page = 1) {
      this.pageNo = page
      UserApi.getUserList(this.pageNo, this.pageSize, this.query).then(response => {
        if (response.code === 200) {
          const data = response.data.records
          data.forEach(user => {
            if (user.status === 0) {
              user.status = '正常'
            } else {
              user.status = '已锁定'
            }
          })
          this.userList = data
          this.total = response.data.total
          this.loading = false
        } else {
          this.$message({
            type: 'error',
            message: '用户信息列表获取失败！',
            center: true
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
