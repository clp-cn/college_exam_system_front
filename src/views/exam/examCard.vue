<template>
  <div class="container">
    <!--    准考证搜索-->
    <el-form :inline="true" class="demo-form-inline" style="margin-left: 2%;margin-top: 100px;width:96%;border-bottom: 1px dashed #C0C4CC ">
      <el-form-item label="班级" style="margin-left: 20px">
        <el-select v-model="query" placeholder="请选择班级" @change="getClasses">
          <el-option v-for="c in classes" :key="c" :label="c" :value="c" align="center"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getExamCardList()">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="onReset">重置</el-button>
        <el-button type="warning" icon="el-icon-delete" @click="clearList">清空列表</el-button>
      </el-form-item>
      <el-form-item>
        <el-form-item>
          <download-excel
            :fields="json_fields"
            :data="examCards"
            :header="title"
            :name="name"
            class="export-excel-wrapper">
            <el-button type="success" icon="el-icon-upload">按班级导出</el-button>
          </download-excel>
        </el-form-item>
        <el-form-item>
          <download-excel
            :fields="json_fields"
            :data="examCardList"
            :header="totalTitle"
            class="export-excel-wrapper"
            name="准考证总表.xlsx">
            <el-button type="success" icon="el-icon-upload">全部导出</el-button>
          </download-excel>
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
            action="http://localhost:10010/exam/receiveExamCardExcel">
            <el-button class="uploadExcel1" type="success" icon="el-icon-upload">导入文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form-item>
    </el-form>
    <el-table
      :data="examCards.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 96%;margin-left: 2%;margin-top: 20px;box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1)">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="100"/>
      <el-table-column
        label="考号"
        align="center"
        width="250"
        prop="no"/>
      <el-table-column
        label="姓名"
        align="center"
        width="200"
        prop="name"/>
      <el-table-column
        label="性别"
        align="center"
        width="150"
        prop="sex"/>
      <el-table-column
        label="班级"
        align="center"
        width="250"
        prop="className"/>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入姓名搜索"/>
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
  </div>
</template>
<script>
import ExamApi from '../../api/exam'
import SchoolApi from '../../api/school'
import { getToken } from '../../utils/auth'
export default {
  name: 'ExamCard',
  data() {
    return {
      examCards: [],
      search: '',
      total: 0,
      pageNo: 1,
      pageSize: 5,
      query: '',
      classes: [],
      title: '',
      name: '',
      json_fields: {
        'Id': 'id',
        '考号': 'no',
        '姓名': 'name',
        '性别': 'sex',
        '班级': 'className'
      },
      totalTitle: '准考证总表',
      examCardList: [],
      headers: {
        'token': getToken()
      }
    }
  },
  mounted() {
    this.getExamCardList(1)
    this.getClasses()
    this.getExamCards()
  },
  methods: {
    clearList() {
      ExamApi.deleteExamCardAll().then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getExamCardList()
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
        this.getExamCardList(1)
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
    handleUploadExcelError() {
      this.$message({
        type: 'success',
        message: '上传失败！',
        center: true
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getExamCardList()
    },
    handleCurrentChange(val) {
      this.getExamCardList(val)
    },
    onReset() {
      this.query = ''
    },
    getClasses() {
      SchoolApi.getClasses().then(response => {
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
    getExamCards() {
      ExamApi.getExamCards().then(response => {
        if (response.code === 200) {
          this.examCardList = response.data
        } else {
          this.$message({
            type: 'error',
            message: '准考证信息加载失败！',
            center: true
          })
        }
      })
    },
    getExamCardList(page = 1) {
      this.pageNo = page
      ExamApi.getExamCardList(this.pageNo, this.pageSize, this.query).then(response => {
        if (response.code === 200) {
          this.examCards = response.data.records
          this.total = response.data.total
          if (this.query === '') {
            this.title = '准考证总表'
            this.name = '准考证总表.xlsx'
          } else {
            this.title = this.query + '准考证表'
            this.name = this.query + '准考证表.xlsx'
          }
        } else {
          this.$message({
            type: 'error',
            message: '准考证信息加载失败！',
            center: true
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.container{
  margin-top: 50px;
}
</style>
