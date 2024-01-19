<template>
  <div>
    <!--    监考老师搜索-->
    <el-form :inline="true" :model="query" class="demo-form-inline" style="margin-left: 2%;margin-top: 100px;width:96%;border-bottom: 1px dashed #C0C4CC">
      <!--      新增监考老师-->
      <el-form-item>
        <el-popover
          placement="right"
          width="400"
          trigger="click">
          <h3 style="text-align: center">新增监考老师</h3>
          <el-form ref="invigilator" :model="invigilator" label-width="100px" class="demo-ruleForm" style="width: 300px;margin-top: 20px">
            <el-form-item
              :rules="[
                { required: true, message: '教师姓名不能为空'},
              ]"
              label="姓名"
              prop="name"
            >
              <el-input v-model="invigilator.name" autocomplete="off"/>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '教工号不能为空'},
              ]"
              label="教师编号"
              prop="no"
            >
              <el-input v-model.number="invigilator.no" autocomplete="off"/>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '性别不能为空'},
              ]"
              label="性别"
              prop="sex">
              <el-radio v-model="invigilator.sex" label="男">男</el-radio>
              <el-radio v-model="invigilator.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '所属学院不能为空'},
              ]"
              label="学院"
              prop="college"
            >
              <el-select v-model="invigilator.college" placeholder="请选择学院">
                <el-option
                  v-for="item in colleges"
                  :key="item"
                  :label="item"
                  :value="item"
                  align="center"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '职位不能为空'},
              ]"
              label="职位"
              prop="position">
              <el-select v-model="invigilator.position" placeholder="请选择职位">
                <el-option label="院长" value="院长" align="center"/>
                <el-option label="副院长" value="副院长" align="center"/>
                <el-option label="教授" value="教授" align="center"/>
                <el-option label="副教授" value="副教授" align="center"/>
                <el-option label="讲师" value="讲师" align="center"/>
                <el-option label="助教" value="助教" align="center"/>
              </el-select>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '联系方式不能为空'},
              ]"
              label="联系方式"
              prop="phone">
              <el-input v-model.number="invigilator.phone" autocomplete="off"/>
            </el-form-item>
            <el-form-item
              label="邮箱"
              prop="email">
              <el-input v-model="invigilator.email" autocomplete="off"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addInvigilator('invigilator')">提交</el-button>
              <el-button @click="resetForm('invigilator')">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button slot="reference" type="primary" icon="el-icon-plus">新增监考老师</el-button>
        </el-popover>
      </el-form-item>
      <!--      批量删除监考老师-->
      <el-form-item>
        <el-button :disabled="deleteBtn" type="primary" icon="el-icon-delete" @click="open">批量删除</el-button>
      </el-form-item>
      <el-form-item label="姓名" style="margin-left: 20px">
        <el-input v-model="query.name" autocomplete="off" placeholder="请输入姓名"/>
      </el-form-item>
      <el-form-item label="学院">
        <el-select v-model="query.college" placeholder="请选择学院">
          <el-option
            v-for="item in colleges"
            :key="item"
            :label="item"
            :value="item"
            align="center"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职位">
        <el-select v-model="query.position" placeholder="请选择职位">
          <el-option label="院长" value="院长" align="center"/>
          <el-option label="教授" value="教授" align="center"/>
          <el-option label="讲师" value="讲师" align="center"/>
          <el-option label="助教" value="助教" align="center"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getInvigilatorList()">查询</el-button>
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
          action="http://localhost:10010/teacher/receiveExcel">
          <el-button class="uploadExcel1" type="success" icon="el-icon-upload">导入文件</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <!--    监考老师表格-->
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="invigilatorList"
      tooltip-effect="dark"
      stripe
      style="width: 96%;margin-left: 2%;margin-top: 20px;box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1)"
      @selection-change="handleSelectionChange">
      <el-table-column
        fixed
        type="selection"
        align="center"
        width="120"/>
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="120"/>
      <el-table-column
        label="教师编号"
        prop="no"
        align="center"
        width="150"/>
      <el-table-column
        prop="name"
        label="教师姓名"
        align="center"
        width="150"/>
      <el-table-column
        prop="sex"
        label="性别"
        align="center"
        width="150"/>
      <el-table-column
        prop="college"
        label="学院"
        align="center"
        width="250"/>
      <el-table-column
        prop="position"
        label="职位"
        align="center"
        width="150"/>
      <el-table-column
        prop="phone"
        label="联系方式"
        align="center"
        width="250"/>
      <el-table-column
        prop="email"
        label="邮箱"
        align="center"
        width="280"/>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="120">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            title="您确定要删除该考场吗？"
            @confirm="deleteInvigilator(scope.row)"
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
    <!--    更新监考老师信息-->
    <el-drawer
      :visible.sync="drawer"
      :with-header="true"
      title="监考老师信息修改">
      <el-form ref="updateForm" :model="updateForm" label-width="100px" class="demo-ruleForm" style="width: 400px">
        <el-form-item
          :rules="[
            {required: true, message: '学院不能为空'}
          ]"
          label="学院"
          prop="college">
          <el-select v-model="updateForm.college" placeholder="请选择学院">
            <el-option
              v-for="item in colleges"
              :key="item"
              :label="item"
              :value="item"
              align="center"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-select v-model="updateForm.position" placeholder="请选择职位">
            <el-option label="院长" value="院长" align="center"/>
            <el-option label="副院长" value="副院长" align="center"/>
            <el-option label="教授" value="教授" align="center"/>
            <el-option label="副教授" value="副教授" align="center"/>
            <el-option label="讲师" value="讲师" align="center"/>
            <el-option label="助教" value="助教" align="center"/>
          </el-select>
        </el-form-item>
        <el-form-item
          :rules="[
            {required: true, message: '联系方式不能为空'}
          ]"
          label="联系方式"
          prop="phone"
        >
          <el-input v-model.number="updateForm.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email">
          <el-input v-model="updateForm.email" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateInvigilator('updateForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import InvigilatorApi from '../../api/teacher'
import SchoolApi from '../../api/school'
import { getToken } from '../../utils/auth'
export default {
  name: 'InvigilateTeacher',
  data() {
    return {
      loading: true,
      deleteBtn: true,
      drawer: false,
      pageNo: 1,
      pageSize: 5,
      total: 0,
      invigilatorList: [],
      multipleSelection: [],
      colleges: [],
      query: {
        name: '',
        college: '',
        position: ''
      },
      invigilator: {
        no: '',
        name: '',
        college: '',
        sex: '男',
        phone: '',
        email: '',
        position: ''
      },
      updateForm: {
        id: '',
        college: '',
        position: '',
        phone: '',
        email: ''
      },
      headers: {
        'token': getToken()
      }
    }
  },
  created() {
    this.getInvigilatorList(1)
    this.getColleges()
  },
  methods: {
    clearList() {
      InvigilatorApi.deleteAll().then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getInvigilatorList()
        } else {
          this.$message({
            type: 'error',
            message: response.message,
            center: true
          })
        }
      })
    },
    beforeFileUpload(file) {
      if (file.type !== 'application/vnd.ms-excel' && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.$message({
          type: 'error',
          message: '上传文件只能是xls/xlsx格式!',
          center: true
        })
        return false
      }
    },
    handleUploadExcelSuccess(res) {
      if (res.code === 200) {
        this.getInvigilatorList(1)
        this.$message({
          type: 'success',
          message: res.message,
          center: true
        })
      } else {
        this.$message({
          type: 'error',
          message: res.message,
          center: true
        })
      }
    },
    handleUploadExcelError(res) {
      this.$message({
        type: 'error',
        message: res.message,
        center: true
      })
    },
    // 重置搜索表单
    onReset() {
      this.query.name = ''
      this.query.college = ''
      this.query.position = ''
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getInvigilatorList()
    },
    handleCurrentChange(val) {
      this.getInvigilatorList(val)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.deleteBtn = this.multipleSelection.length <= 0
    },
    // 批量删除监考老师
    open() {
      this.$confirm('此操作将永久删除该监考老师信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.deleteInvigilators()
          } else {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        }
      })
    },
    // 删除监考老师
    deleteInvigilator(row) {
      InvigilatorApi.deleteInvigilator(row.id).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getInvigilatorList()
        } else {
          this.$message({
            type: 'error',
            message: response.message,
            center: true
          })
        }
      })
    },
    // 批量删除监考老师
    deleteInvigilators() {
      InvigilatorApi.deleteInvigilators(this.multipleSelection).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getInvigilatorList()
        } else {
          this.$message({
            type: 'error',
            message: response.message,
            center: true
          })
        }
      })
    },
    // 重置添加表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 添加监考老师
    addInvigilator(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          InvigilatorApi.addInvigilator(this.invigilator).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              this.resetForm(formName)
              this.getInvigilatorList()
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
            message: '请填写正确的监考老师信息！',
            center: true
          })
          return false
        }
      })
    },
    // 获取监考老师分页列表
    getInvigilatorList(page = 1) {
      this.pageNo = page
      InvigilatorApi.getInvigilatorList(this.pageNo, this.pageSize, this.query).then(response => {
        if (response.code === 200) {
          this.invigilatorList = response.data.records
          this.total = response.data.total
          this.loading = false
        } else {
          this.$message({
            type: 'error',
            message: '监考老师信息加载失败！',
            center: true
          })
        }
      })
    },
    // 获取学院列表
    getColleges() {
      SchoolApi.getColleges().then(response => {
        if (response.code === 200) {
          this.colleges = response.data
        } else {
          this.$message({
            type: 'error',
            message: '学院信息加载失败！',
            center: true
          })
        }
      })
    },
    // 更新监考老师信息
    openDrawer(row) {
      this.drawer = true
      this.updateForm = row
    },
    updateInvigilator(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          InvigilatorApi.updateInvigilator(this.updateForm).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              this.getInvigilatorList()
              this.drawer = false
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
            message: '请填写正确的监考老师信息！',
            center: true
          })
          return false
        }
      })
    }
  }
}
</script>
<style>

</style>
