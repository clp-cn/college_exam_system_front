<template>
  <div>
    <h1 style="margin-left: 5%;margin-top: 80px">考试安排表</h1>
    <el-table
      :data="exams"
      border
      style="width: 90%;margin-left: 5%;margin-top: 30px;margin-bottom: 20px">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="100"/>
      <el-table-column
        prop="examTime"
        label="考试时间"
        align="center"
        width="392"/>
      <el-table-column
        prop="examSubject"
        label="考试科目"
        align="center"
        width="250"/>
      <el-table-column
        prop="examVenue"
        label="考试地点"
        align="center"
        width="200"/>
      <el-table-column
        prop="examRoom"
        label="考试教室"
        align="center"
        width="200"/>
      <el-table-column
        prop="examDuration"
        label="考试时长(分钟)"
        align="center"
        width="200"/>
      <el-table-column
        prop="seatNumber"
        label="座位号"
        align="center"
        width="200"/>
      <el-table-column
        prop="examStatus"
        label="考试状态"
        align="center"
        width="200"/>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import StudentApi from '../../api/student'

export default {
  name: 'ExamInfo',
  data() {
    return {
      exams: [],
      studentInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'teacherStudentNo'
    ])
  },
  mounted() {
    this.getStudentInfo()
  },
  methods: {
    getStudentExams() {
      StudentApi.getStudentExams(this.teacherStudentNo).then(response => {
        if (response.code === 200) {
          this.exams = response.data
        } else {
          this.$message({
            type: 'error',
            message: response.message,
            center: true
          })
        }
      })
    },
    getStudentInfo() {
      if (this.teacherStudentNo === null) {
        this.$message({
          type: 'warning',
          message: '您还未绑定学生信息，请绑定！',
          center: true
        })
        return
      }
      StudentApi.getStudent(this.teacherStudentNo).then(response => {
        if (response.code === 200) {
          this.studentInfo = response.data
          this.getStudentExams()
        } else {
          this.$message({
            type: 'error',
            message: '学生信息加载失败！',
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
