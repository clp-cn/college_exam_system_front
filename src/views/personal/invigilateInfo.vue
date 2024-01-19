<template>
  <div>
    <h1 style="margin-left: 5%;margin-top: 80px">监考安排表</h1>
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
        prop="invigilateTime"
        label="监考时间"
        align="center"
        width="400"/>
      <el-table-column
        prop="invigilateSubject"
        label="监考科目"
        align="center"
        width="300"/>
      <el-table-column
        prop="invigilateVenue"
        label="监考地点"
        align="center"
        width="220"/>
      <el-table-column
        prop="invigilateRoom"
        label="监考教室"
        align="center"
        width="220"/>
      <el-table-column
        prop="invigilateDuration"
        label="监考时长"
        align="center"
        width="220"/>
      <el-table-column
        prop="invigilateStatus"
        label="监考状态"
        align="center"
        width="232"/>
    </el-table>
  </div>
</template>
<script>

import TeacherApi from '../../api/teacher'
import { mapGetters } from 'vuex'

export default {
  name: 'InvigilateInfo',
  data() {
    return {
      exams: [],
      teacherInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'teacherStudentNo'
    ])
  },
  mounted() {
    this.getTeacherInfo()
  },
  methods: {
    getTeacherExams() {
      TeacherApi.getTeacherExams(this.teacherStudentNo).then(response => {
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
    getTeacherInfo() {
      if (this.teacherStudentNo === null) {
        this.$message({
          type: 'warning',
          message: '您还未绑定教师信息，请绑定！',
          center: true
        })
        return
      }
      TeacherApi.getTeacherInfo(this.teacherStudentNo).then(response => {
        if (response.data !== null) {
          this.teacherInfo = response.data
          this.getTeacherExams()
        } else {
          this.$message({
            type: 'error',
            message: '教师信息加载失败！',
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
