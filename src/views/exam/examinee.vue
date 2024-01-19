<template>
  <div>
    <!--    学生搜索-->
    <el-form :inline="true" :model="query" class="demo-form-inline" style="margin-left: 2%;margin-top: 100px;width:96%;border-bottom: 1px dashed #C0C4CC ">
      <!--      新增学生-->
      <el-form-item>
        <el-popover
          placement="right"
          width="400"
          trigger="click">
          <h3 style="text-align: center">新增学生</h3>
          <el-form ref="student" :model="student" label-width="100px" class="demo-ruleForm" style="width: 300px;margin-top: 20px">
            <el-form-item
              :rules="[
                { required: true, message: '学号不能为空'},
              ]"
              label="学号"
              prop="no"
            >
              <el-input v-model.number="student.no" autocomplete="off"/>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '姓名不能为空'},
              ]"
              label="姓名"
              prop="name"
            >
              <el-input v-model="student.name" autocomplete="off"/>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '用户性别不能为空'},
              ]"
              label="性别"
              prop="sex"
            >
              <el-radio v-model="student.sex" label="男">男</el-radio>
              <el-radio v-model="student.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '学院不能为空'},
              ]"
              label="学院"
              prop="college"
            >
              <el-select v-model="student.college" placeholder="请选择学院" @change="getProfessions(student.college)">
                <el-option v-for="college in colleges" :key="college" :label="college" :value="college" align="center"/>
              </el-select>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '专业不能为空'},
              ]"
              label="专业"
              prop="profession"
            >
              <el-select v-model="student.profession" placeholder="请选择专业" @change="getClasses(student.college, student.profession, student.grade)">
                <el-option v-for="profession in professions" :key="profession" :label="profession" :value="profession" align="center"/>
              </el-select>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '年级不能为空'},
              ]"
              label="年级"
              prop="grade"
            >
              <el-select v-model="student.grade" placeholder="请选择年级" @change="getClasses(student.college, student.profession, student.grade)">
                <el-option label="大一" align="center" value="大一"/>
                <el-option label="大二" align="center" value="大二"/>
                <el-option label="大三" align="center" value="大三"/>
                <el-option label="大四" align="center" value="大四"/>
              </el-select>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '班级不能为空'},
              ]"
              label="班级"
              prop="className"
            >
              <el-select v-model="student.className" placeholder="请选择班级">
                <el-option v-for="className in classes" :key="className" :label="className" :value="className" align="center"/>
              </el-select>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '联系方式不能为空'}
              ]"
              label="联系方式"
              prop="phone"
            >
              <el-input v-model.number="student.phone" autocomplete="off"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addStudent('student')">提交</el-button>
              <el-button @click="resetForm('student')">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button slot="reference" type="primary" icon="el-icon-plus">新增学生</el-button>
        </el-popover>
      </el-form-item>
      <!--      批量删除学生-->
      <el-form-item>
        <el-button :disabled="deleteBtn" type="primary" icon="el-icon-delete" @click="open">批量删除</el-button>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="query.name" placeholder="请输入姓名"/>
      </el-form-item>
      <el-form-item label="学院">
        <el-select v-model="query.college" placeholder="请选择学院" @change="getProfessions(query.college)">
          <el-option v-for="college in colleges" :key="college" :label="college" :value="college" align="center"/>
        </el-select>
      </el-form-item>
      <el-form-item label="专业">
        <el-select v-model="query.profession" placeholder="请选择专业" @change="getClasses(query.college, query.profession, query.grade)">
          <el-option v-for="profession in professions" :key="profession" :label="profession" :value="profession" align="center"/>
        </el-select>
      </el-form-item>
      <el-form-item label="年级">
        <el-select v-model="query.grade" placeholder="请选择年级" @change="getClasses(query.college, query.profession, query.grade)">
          <el-option label="大一" align="center" value="大一"/>
          <el-option label="大二" align="center" value="大二"/>
          <el-option label="大三" align="center" value="大三"/>
          <el-option label="大四" align="center" value="大四"/>
        </el-select>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="query.className" placeholder="请选择班级">
          <el-option v-for="className in classes" :key="className" :label="className" :value="className" align="center"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getStudentList()">查询</el-button>
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
          action="http://localhost:10010/student/receiveExcel">
          <el-button class="uploadExcel1" type="success" icon="el-icon-upload">导入文件</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <!--    考生信息表格-->
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="studentList"
      tooltip-effect="dark"
      stripe
      style="width: 96%;margin-left: 2%;margin-top: 20px;box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1)"
      @selection-change="handleSelectionChange">
      <el-table-column
        fixed
        type="selection"
        align="center"
        width="60"/>
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="100"/>
      <el-table-column
        label="考号"
        prop="no"
        align="center"
        width="150"/>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        width="120"/>
      <el-table-column
        prop="sex"
        label="性别"
        align="center"
        width="120"/>
      <el-table-column
        prop="college"
        label="学院"
        align="center"
        width="200"/>
      <el-table-column
        prop="profession"
        label="专业"
        align="center"
        width="200"/>
      <el-table-column
        prop="grade"
        label="年级"
        align="center"
        width="120"/>
      <el-table-column
        prop="className"
        label="所属班级"
        align="center"
        width="200" />
      <el-table-column
        prop="phone"
        label="联系方式"
        align="center"
        width="200"/>
      <el-table-column
        prop="electiveClass"
        label="公共班级"
        width="300"
        align="center"/>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="200">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            title="您确定要删除该学生吗？"
            @confirm="deleteStudent(scope.row)"
          >
            <el-button slot="reference" type="danger" icon="el-icon-delete" circle size="small"/>
          </el-popconfirm>
          <el-button type="primary" icon="el-icon-edit" circle size="small" @click="openDrawer(scope.row)"/>
          <el-popover
            placement="left"
            width="400"
            trigger="click">
            <h3 style="text-align: center">添加公共班级</h3>
            <el-form ref="addClass" :model="addClass" label-width="100px" class="demo-ruleForm" style="width: 300px;margin-top: 20px">
              <el-form-item
                :rules="[
                  { required: true, message: '学院不能为空'},
                ]"
                label="学院"
                prop="college"
              >
                <el-select v-model="addClass.college" placeholder="请选择学院" @change="getElectiveClasses(addClass.college, '大')">
                  <el-option v-for="college in colleges" :key="college" :label="college" :value="college" align="center"/>
                </el-select>
              </el-form-item>
              <el-form-item
                :rules="[
                  { required: true, message: '年级不能为空'},
                ]"
                label="年级"
                prop="grade"
              >
                <el-select v-model="addClass.grade" placeholder="请选择年级" @change="getElectiveClasses(addClass.college, addClass.grade, scope.row.className)">
                  <el-option label="大一" align="center" value="大一"/>
                  <el-option label="大二" align="center" value="大二"/>
                  <el-option label="大三" align="center" value="大三"/>
                  <el-option label="大四" align="center" value="大四"/>
                </el-select>
              </el-form-item>
              <el-form-item
                :rules="[
                  { required: true, message: '班级不能为空'},
                ]"
                label="班级"
                prop="className"
              >
                <el-select v-model="addClass.className" placeholder="请选择班级">
                  <el-option v-for="className in electiveClasses" :key="className" :label="className" :value="className" align="center"/>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addElectiveClass('addClass', scope.row)">提交</el-button>
                <el-button @click="resetForm('addClass')">重置</el-button>
              </el-form-item>
            </el-form>
            <el-button slot="reference" type="success" icon="el-icon-plus" circle size="small"/>
          </el-popover>
          <el-button :disabled="scope.row.electiveClass[0] === '暂无'" type="info" icon="el-icon-minus" circle size="small" @click="removeElectiveClass(scope.row)"/>
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
    <!--    更新学生-->
    <el-drawer
      :visible.sync="drawer"
      :with-header="true"
      title="学生信息修改">
      <el-form ref="updateStudentInfo" :model="updateStudentInfo" label-width="100px" class="demo-ruleForm" style="width: 400px">
        <el-form-item
          :rules="[
            {required: true, message: '姓名不能为空'}
          ]"
          label="姓名"
          prop="name">
          <el-input v-model="updateStudentInfo.name"/>
        </el-form-item>
        <el-form-item
          :rules="[
            {required: true, message: '性别不能为空'}
          ]"
          label="性别"
          prop="sex">
          <el-radio v-model="updateStudentInfo.sex" label="男">男</el-radio>
          <el-radio v-model="updateStudentInfo.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item
          :rules="[
            {required: true, message: '联系方式不能为空'}
          ]"
          label="联系方式"
          prop="phone">
          <el-input v-model.number="updateStudentInfo.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item
          :rules="[
            { required: true, message: '学院不能为空'},
          ]"
          label="学院"
          prop="college"
        >
          <el-select v-model="updateStudentInfo.college" placeholder="请选择学院" @change="getProfessions(updateStudentInfo.college)">
            <el-option v-for="college in colleges" :key="college" :label="college" :value="college" align="center"/>
          </el-select>
        </el-form-item>
        <el-form-item
          :rules="[
            {required: true, message: '专业不能为空'}
          ]"
          label="专业"
          prop="profession">
          <el-select v-model="updateStudentInfo.profession" placeholder="请选择专业" @change="getClasses(updateStudentInfo.profession, updateStudentInfo.grade)">
            <el-option v-for="profession in professions" :key="profession" :label="profession" :value="profession" align="center"/>
          </el-select>
        </el-form-item>
        <el-form-item
          :rules="[
            {required: true, message: '年级不能为空'}
          ]"
          label="年级"
          prop="grade">
          <el-select v-model="updateStudentInfo.grade" placeholder="请选择年级" @change="getClasses(updateStudentInfo.profession, updateStudentInfo.grade)">
            <el-option label="大一" align="center" value="大一"/>
            <el-option label="大二" align="center" value="大二"/>
            <el-option label="大三" align="center" value="大三"/>
            <el-option label="大四" align="center" value="大四"/>
          </el-select>
        </el-form-item>
        <el-form-item
          :rules="[
            {required: true, message: '班级不能为空'}
          ]"
          label="班级"
          prop="className">
          <el-select v-model="updateStudentInfo.className" placeholder="请选择班级">
            <el-option v-for="className in classes" :key="className" :label="className" :value="className" align="center"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateStudent('updateStudentInfo')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import StudentApi from '../../api/student'
import SchoolApi from '../../api/school'
import { getToken } from '../../utils/auth'
export default {
  name: 'Examinee',
  data() {
    return {
      loading: false,
      drawer: false,
      deleteBtn: true,
      total: 0,
      pageNo: 1,
      pageSize: 5,
      studentList: [],
      colleges: [],
      professions: [],
      classes: [],
      electiveClasses: [],
      multipleSelection: [],
      query: {
        name: '',
        college: '',
        grade: '',
        profession: '',
        className: ''
      },
      updateStudentInfo: {
        name: '',
        college: '',
        grade: '',
        profession: '',
        phone: ''
      },
      student: {
        no: '',
        name: '',
        college: '',
        grade: '',
        profession: '',
        className: '',
        electiveClass: [],
        sex: '男',
        phone: ''
      },
      addClass: {
        college: '',
        grade: '',
        className: ''
      },
      headers: {
        'token': getToken()
      }
    }
  },
  mounted() {
    this.getStudentList(1)
    this.getColleges()
    this.getProfessions('学院')
    this.getClasses('学院', '', '大')
    this.getElectiveClasses('学院', '大')
  },
  methods: {
    clearList() {
      StudentApi.deleteAll().then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getStudentList()
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
          type: 'success',
          message: '上传文件只能是xls/xlsx格式!',
          center: true
        })
        return false
      }
    },
    handleUploadExcelSuccess(res) {
      if (res.code === 200) {
        this.getStudentList(1)
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
    // 获取公共班级列表
    getElectiveClasses(college, grade) {
      SchoolApi.getElectiveClasses(college, grade).then(response => {
        if (response.code === 200) {
          this.electiveClasses = response.data
        } else {
          this.$message({
            type: 'error',
            message: '公共班级信息加载失败，请重试！',
            center: true
          })
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getStudentList()
    },
    handleCurrentChange(val) {
      this.getStudentList(val)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.deleteBtn = this.multipleSelection.length <= 0
    },
    // 重置搜索表单
    onReset() {
      this.query.name = ''
      this.query.college = ''
      this.query.profession = ''
      this.query.grade = ''
      this.query.className = ''
    },
    // 添加学生
    addStudent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          StudentApi.addStudent(this.student).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              this.resetForm(formName)
              this.getStudentList(1)
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
            message: '请填写正确的学生信息！',
            center: true
          })
          return false
        }
      })
    },
    // 添加学生公共班级
    addElectiveClass(formName, student) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          StudentApi.addElectiveClass(this.addClass, student.id).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              this.resetForm(formName)
              this.getStudentList()
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
            message: '请填写正确的班级信息！',
            center: true
          })
          return false
        }
      })
    },
    // 移除学生公共班级
    removeElectiveClass(row) {
      StudentApi.removeElectiveClass(row.id, row.className).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '移除成功！',
            center: true
          })
          this.getStudentList()
        } else {
          this.$message({
            type: 'error',
            message: '移除失败，请重试！',
            center: true
          })
        }
      })
    },
    // 重置添加表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 删除学生
    deleteStudent(student) {
      StudentApi.deleteStudent(student.id).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getStudentList()
        } else {
          this.$message({
            type: 'error',
            message: response.message,
            center: true
          })
        }
      })
    },
    open() {
      this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.deleteStudents()
          } else {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        }
      })
    },
    // 批量删除学生
    deleteStudents() {
      StudentApi.deleteStudents(this.multipleSelection).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getStudentList()
        } else {
          this.$message({
            type: 'error',
            message: response.message,
            center: true
          })
        }
      })
    },
    // 更新学生
    updateStudent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          StudentApi.updateStudent(this.updateStudentInfo).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              this.getStudentList()
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
            message: '请填写正确的学生信息！',
            center: true
          })
          return false
        }
      })
    },
    openDrawer(row) {
      this.drawer = true
      this.updateStudentInfo = row
    },
    // 获取学院列表
    getColleges() {
      SchoolApi.getColleges().then(response => {
        if (response.code === 200) {
          this.colleges = response.data
        } else {
          this.$message({
            type: 'error',
            message: '学院信息加载失败，请刷新重试！',
            center: true
          })
        }
      })
    },
    // 获取专业列表
    getProfessions(college) {
      SchoolApi.getProfessions(college).then(response => {
        if (response.code === 200) {
          this.professions = response.data
          this.getClasses(college, '', '大')
        } else {
          this.$message({
            type: 'error',
            message: '专业信息加载失败，请刷新重试！',
            center: true
          })
        }
      })
    },
    // 获取班级列表
    getClasses(college, profession, grade) {
      SchoolApi.getClassesBySearch(college, profession, grade).then(response => {
        if (response.code === 200) {
          this.classes = response.data
        } else {
          this.$message({
            type: 'error',
            message: '班级信息加载失败！',
            center: true
          })
        }
      })
    },
    // 获取学生分页列表
    getStudentList(page = 1) {
      this.pageNo = page
      StudentApi.getStudentList(this.pageNo, this.pageSize, this.query).then(response => {
        if (response.code === 200) {
          this.studentList = response.data.records
          this.studentList.forEach(stu => {
            const newClasses = []
            stu.electiveClass.forEach(c => {
              if (c !== stu.electiveClass.at(stu.electiveClass.length - 1)) {
                c = c + '、'
                newClasses.push(c)
              } else {
                newClasses.push(c)
              }
            })
            stu.electiveClass = newClasses
          })
          this.total = response.data.total
          this.loading = false
        } else {
          this.$message({
            type: 'error',
            message: '学院信息加载失败，请刷新重试！',
            center: true
          })
        }
      })
    }
  }
}
</script>
<style>

</style>
