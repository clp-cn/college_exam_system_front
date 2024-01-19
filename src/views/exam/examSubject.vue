<template>
  <div>
    <!--    考试科目搜索-->
    <el-form :inline="true" class="demo-form-inline" style="margin-left: 3%;margin-top: 100px;width:94%;border-bottom: 1px dashed #C0C4CC">
      <!--      新增考试科目-->
      <el-form-item>
        <el-popover
          placement="right"
          width="400"
          trigger="click">
          <h3 style="text-align: center">新增考试科目</h3>
          <el-form ref="subject" :model="subject" label-width="100px" class="demo-ruleForm" style="width: 300px;margin-top: 20px">
            <el-form-item
              :rules="[
                { required: true, message: '考试科目名称不能为空'},
              ]"
              label="科目名称"
              prop="name"
            >
              <el-input v-model="subject.name" autocomplete="off"/>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '考试时长不能为空'},
              ]"
              label="考试时长(分钟)"
              prop="duration"
            >
              <el-input v-model.number="subject.duration" autocomplete="off"/>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '考试班级不能为空'},
              ]"
              label="考试班级(用顿号隔开)"
              prop="classes">
              <el-input v-model="subject.classes" autocomplete="off"/>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '考试人数不能为空'},
              ]"
              label="考试人数"
              prop="students"
            >
              <el-input v-model="subject.students" autocomplete="off"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addSubject('subject')">提交</el-button>
              <el-button @click="resetForm('subject')">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button slot="reference" type="primary" icon="el-icon-plus">新增考试科目</el-button>
        </el-popover>
      </el-form-item>
      <!--      批量删除考试科目-->
      <el-form-item>
        <el-button :disabled="deleteBtn" type="primary" icon="el-icon-delete" @click="open">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!--    考试科目表格-->
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="subjectList"
      tooltip-effect="dark"
      style="width: 94%;margin-left: 3%;margin-top: 20px;box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1)"
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
        label="考试科目"
        prop="name"
        align="center"
        width="200"/>
      <el-table-column
        prop="duration"
        label="考试时长(分钟)"
        align="center"
        width="200"/>
      <el-table-column
        prop="classes"
        label="考试班级"
        align="center"
        width="750"/>
      <el-table-column
        prop="students"
        label="考试人数"
        align="center"
        width="150"/>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            title="您确定要删除该考场吗？"
            @confirm="deleteSubject(scope.row)"
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
      style="margin-right: 3%;margin-top: 20px;margin-bottom: 20px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
    <!--    更新科目信息-->
    <el-drawer
      :visible.sync="drawer"
      :with-header="true"
      title="考试科目信息修改">
      <el-form ref="updateForm" :model="updateForm" label-width="100px" class="demo-ruleForm" style="width: 400px">
        <el-form-item label="考试科目" prop="name">
          <el-input v-model="updateForm.name" disabled/>
        </el-form-item>
        <el-form-item
          :rules="[
            {required: true,message: '考试时长不能为空'}
          ]"
          label="考试时长(分钟)"
          prop="duration">
          <el-input v-model="updateForm.duration" placeholder="请输入考试时长"/>
        </el-form-item>
        <el-form-item
          :rules="[
            {required: true,message: '考试班级不能为空'}
          ]"
          label="考试班级"
          prop="className">
          <el-input v-model="updateForm.className" placeholder="请输入考试班级，以顿号隔开"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateSubject('updateForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import ExamApi from '../../api/exam'

export default {
  name: 'ExamSubject',
  data() {
    return {
      updateForm: {
        id: '',
        name: '',
        duration: 0,
        className: ''
      },
      drawer: false,
      subject: {
        name: '',
        duration: '',
        classes: '',
        students: ''
      },
      subjectList: [],
      pageNo: 1,
      pageSize: 5,
      total: 0,
      loading: true,
      multipleSelection: [],
      deleteBtn: true
    }
  },
  created() {
    this.getSubjectList(1)
  },
  methods: {
    // 更新科目老师信息
    openDrawer(row) {
      this.drawer = true
      this.updateForm = row
    },
    updateSubject(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ExamApi.updateSubject(this.updateForm).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              this.getSubjectList(1)
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
            message: '请填写正确的科目信息！',
            center: true
          })
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getSubjectList()
    },
    handleCurrentChange(val) {
      this.getSubjectList(val)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.deleteBtn = this.multipleSelection.length <= 0
    },
    // 重置添加表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 删除考试科目
    deleteSubject(row) {
      ExamApi.deleteSubject(row.id).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getSubjectList()
        } else {
          this.$message({
            type: 'error',
            message: response.message,
            center: true
          })
        }
      })
    },
    // 批量删除考试科目
    open() {
      this.$confirm('此操作将永久删除该考试科目信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.deleteSubjects()
          } else {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        }
      })
    },
    deleteSubjects() {
      const ids = []
      this.multipleSelection.forEach(m => ids.push(m.id))
      ExamApi.deleteSubjects(ids).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getSubjectList()
        } else {
          this.$message({
            type: 'error',
            message: response.message,
            center: true
          })
        }
      })
    },
    // 添加考试科目
    addSubject(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ExamApi.addSubject(this.subject).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              this.resetForm(formName)
              this.getSubjectList()
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
            message: '请填写正确的科目信息！',
            center: true
          })
          return false
        }
      })
    },
    // 获取考试科目分页列表
    getSubjectList(page = 1) {
      this.pageNo = page
      ExamApi.getSubjectList(this.pageNo, this.pageSize).then(response => {
        if (response.code === 200) {
          this.subjectList = response.data.records
          this.subjectList.forEach(sub => {
            const newClasses = []
            sub.classes.forEach(c => {
              if (c !== sub.classes.at(sub.classes.length - 1)) {
                c = c + '、'
                newClasses.push(c)
              } else {
                newClasses.push(c)
              }
            })
            sub.classes = newClasses
          })
          this.total = response.data.total
          this.loading = false
        } else {
          this.$message({
            type: 'error',
            message: '考试科目信息加载失败！',
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
