<template>
  <div>
    <!--    考试安排搜索-->
    <el-form :inline="true" class="demo-form-inline" style="margin-left: 2%;margin-top: 100px;width:96%;border-bottom: 1px dashed #C0C4CC">
      <el-form-item :rules="[{required: true, message: '排考日期不能为空'}]" label="设置排考日期">
        <el-date-picker
          v-model="examDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"/>
      </el-form-item>
      <!--      自动排考-->
      <el-form-item>
        <el-button :disabled="examDate === null" :loading="autoExam" type="primary" @click="schedulerExams">自动排考</el-button>
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
          action="http://localhost:10010/exam/receiveExcel">
          <el-button class="uploadExcel1" type="success" icon="el-icon-upload">导入文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <download-excel
          :data="exams"
          :fields="json_fields"
          header="考试安排表"
          name="考试安排.xlsx">
          <el-button :disabled="downloadExcel" type="success" icon="el-icon-upload">导出至Excel</el-button>
        </download-excel>
      </el-form-item>
    </el-form>
    <!--    考试安排表格-->
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="examList"
      tooltip-effect="dark"
      stripe
      style="width: 96%;margin-left: 2%;margin-top: 20px;box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1)">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="120"/>
      <el-table-column
        label="考试科目"
        prop="examSubject"
        align="center"
        width="250"/>
      <el-table-column
        prop="teachBuilding"
        label="考试地点"
        align="center"
        width="250"/>
      <el-table-column
        prop="classRoom"
        label="考场"
        align="center"
        width="200"/>
      <el-table-column
        prop="invigilatorName"
        label="监考老师"
        align="center"
        width="200"/>
      <el-table-column
        prop="examClass"
        label="考试班级"
        align="center"
        width="250"/>
      <el-table-column
        prop="examStart"
        label="考试开始时间"
        align="center"
        width="290"/>
      <el-table-column
        prop="examEnd"
        label="考试结束时间"
        align="center"
        width="290"/>
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
  </div>
</template>
<script>
import ExamApi from '../../api/exam'
import { getToken } from '../../utils/auth'

export default {
  name: 'Sheet',
  data() {
    return {
      loading: false,
      pageNo: 1,
      pageSize: 5,
      total: 0,
      examList: [],
      exams: [],
      examDate: null,
      autoExam: false,
      json_fields: {
        'Id': 'id',
        '考试科目': 'examSubject',
        '考试地点': 'teachBuilding',
        '考场': 'classRoom',
        '监考老师': 'invigilator',
        '考试班级': 'examClass',
        '考试开始时间': 'examStart',
        '考试结束时间': 'examEnd'
      },
      teacherMap: {},
      headers: {
        'token': getToken()
      },
      downloadExcel: true
    }
  },
  created() {
    this.getExamList(1)
    this.getExams()
  },
  methods: {
    beforeFileUpload(file) {
      // 文件格式校验
      if (file.type !== 'application/vnd.ms-excel' && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.$message({
          type: 'error',
          message: '上传文件只能是xls/xlsx格式!',
          center: true
        })
        return false
      }
      return true
    },
    handleUploadExcelSuccess(res) {
      if (res.code === 200) {
        this.getExamList(1)
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
    handleSizeChange(val) {
      this.pageSize = val
      this.getExamList()
    },
    handleCurrentChange(val) {
      this.getExamList(val)
    },
    clearList() {
      ExamApi.deleteExamAll().then(response => {
        if (response.code === 200) {
          this.downloadExcel = true
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getExamList()
        } else {
          this.$message({
            type: 'error',
            message: response.message,
            center: true
          })
        }
      })
    },
    getExams() {
      ExamApi.getExams().then(response => {
        if (response.code === 200) {
          this.exams = response.data
        } else {
          this.$message({
            type: 'error',
            message: '获取考试安排表失败！',
            center: true
          })
        }
      })
    },
    // 获取考试安排分页列表
    getExamList(page = 1) {
      this.pageNo = page
      ExamApi.getExamList(this.pageNo, this.pageSize).then(response => {
        if (response.code === 200) {
          this.examList = response.data.records
          if (this.examList.length > 0) {
            this.downloadExcel = false
          }
          this.total = response.data.total
          this.loading = false
        } else {
          this.$message({
            type: 'error',
            message: '获取考试安排列表失败！',
            center: true
          })
        }
      })
    },
    // 自动排考
    schedulerExams() {
      const loading = this.$loading({
        lock: true,
        text: '自动排考中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.autoExam = true
      const start = this.examDate[0]
      const end = this.examDate[1]
      ExamApi.schedulerExams(start, end).then(response => {
        if (response.code === 200) {
          loading.close()
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getExamList()
          this.autoExam = false
        } else {
          this.$message({
            type: 'error',
            message: response.message,
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
