<template>
  <div>
    <el-carousel :interval="4000" type="card" height="300px" style="margin-top: 70px;">
      <el-carousel-item v-for="item in carouselImages" :key="item">
        <img :src="item" style="width: 100%;height: 100%" alt="">
      </el-carousel-item>
    </el-carousel>
    <el-divider style="border-bottom: 1px dashed #C0C4CC " />
    <!--    考场搜索-->
    <el-form :inline="true" :model="query" class="demo-form-inline" style="margin-left: 3%;">
      <!--      新增考场-->
      <el-form-item>
        <el-popover
          placement="right"
          width="400"
          trigger="click">
          <h3 style="text-align: center">新增考场</h3>
          <el-form ref="examRoom" :model="examRoom" label-width="100px" class="demo-ruleForm" style="width: 300px;margin-top: 20px">
            <el-form-item
              :rules="[
                { required: true, message: '教学楼不能为空'},
              ]"
              label="教学楼"
              prop="teachBuilding"
            >
              <el-input v-model="examRoom.teachBuilding" autocomplete="off"/>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '教室编号不能为空'},
              ]"
              label="教室编号"
              prop="name"
            >
              <el-input v-model="examRoom.name" autocomplete="off"/>
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '教室容量不能为空'},
              ]"
              label="教室容量"
              prop="capacity"
            >
              <el-input v-model="examRoom.capacity" autocomplete="off" />
            </el-form-item>
            <el-form-item
              :rules="[
                { required: true, message: '教室状态不能为空'},
              ]"
              label="教室状态"
              prop="occupied"
            >
              <el-radio v-model="examRoom.occupied" label="可用">可用</el-radio>
              <el-radio v-model="examRoom.occupied" label="不可用">不可用</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addExamRoom('examRoom')">提交</el-button>
              <el-button @click="resetForm('examRoom')">重置</el-button>
            </el-form-item>
          </el-form>
          <el-button slot="reference" type="primary" icon="el-icon-plus">新增考场</el-button>
        </el-popover>
      </el-form-item>
      <!--      批量删除考场-->
      <el-form-item>
        <el-button :disabled="deleteBtn" type="primary" icon="el-icon-delete" @click="open">批量删除</el-button>
      </el-form-item>
      <el-form-item label="教学楼" style="margin-left: 20px">
        <el-select v-model="query.teachBuilding" placeholder="请选择教学楼">
          <el-option value="10栋"/>
          <el-option value="11栋"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getExamRoomList()">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!--    考场表格-->
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="examRoomList"
      tooltip-effect="dark"
      style="width: 94%;margin-left: 3%;margin-top: 10px;box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1)"
      @selection-change="handleSelectionChange">
      <el-table-column
        fixed
        type="selection"
        align="center"
        width="200"/>
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="200"/>
      <el-table-column
        label="教学楼"
        prop="teachBuilding"
        align="center"
        width="300"/>
      <el-table-column
        prop="name"
        label="教室编号"
        align="center"
        width="300"/>
      <el-table-column
        prop="capacity"
        label="教室容量"
        align="center"
        width="300"/>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="300">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            title="您确定要删除该考场吗？"
            @confirm="deleteExamRoom(scope.row)"
          >
            <el-button slot="reference" type="danger" icon="el-icon-delete" circle size="small"/>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页选择器-->
    <el-pagination
      :total="total"
      :page-size="pageSize"
      :page-sizes="[5,10,20,50,100]"
      :current-page="pageNo"
      layout="-> ,total, sizes, prev, pager, next, jumper"
      style="margin-right: 3%;margin-top: 20px;margin-bottom: 20px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>
<script>
import ExamRoomApi from '../../api/examRoom'
export default {
  name: 'ExamRoom',
  data() {
    return {
      loading: false,
      deleteBtn: true,
      pageNo: 1,
      pageSize: 5,
      total: 0,
      examRoomList: [],
      multipleSelection: [],
      carouselImages: [
        'https://www.jgsu.edu.cn/__local/7/F9/C2/5E37B23DF4C1B53E012F16F1B50_71233DF9_EAEA.jpg',
        'https://www.jgsu.edu.cn/__local/9/43/D1/D46FD14C843EBDDF0E6A8960B83_4710AF29_F94F.jpg',
        'https://www.jgsu.edu.cn/__local/5/67/00/7261DE93D8B7E13606C9F186A7F_149AAAC8_11545.jpg',
        'https://www.jgsu.edu.cn/__local/7/2B/41/F4A164A8601DCB56A3E8170DFB3_49875EC5_F8E7.jpg',
        'https://www.jgsu.edu.cn/__local/B/34/C8/1F2F2EBFE5DB524450F7AF97A9A_9715CBAD_15188.jpg',
        'https://www.jgsu.edu.cn/__local/F/B7/D8/7BBBDBCECA8D6AE57532E0843D6_F64B9075_C357.jpg'
      ],
      query: {
        teachBuilding: ''
      },
      examRoom: {
        teachBuilding: '',
        name: '',
        capacity: '',
        occupied: '可用'
      }
    }
  },
  created() {
    this.getExamRoomList(1)
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getExamRoomList()
    },
    handleCurrentChange(val) {
      this.getExamRoomList(val)
    },
    // 重置添加表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.deleteBtn = this.multipleSelection.length <= 0
    },
    // 重置搜索表单
    onReset() {
      this.query.teachBuilding = ''
    },
    // 添加考场
    addExamRoom(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.examRoom.occupied === '可用') {
            this.examRoom.occupied = 1
          } else {
            this.examRoom.occupied = 0
          }
          ExamRoomApi.addExamRoom(this.examRoom).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              this.resetForm(formName)
              this.getExamRoomList()
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
    // 删除考场
    deleteExamRoom(row) {
      ExamRoomApi.deleteExamRoom(row.id).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getExamRoomList()
        } else {
          this.$message({
            type: 'error',
            message: response.message,
            center: true
          })
        }
      })
    },
    // 批量删除考场
    deleteExamRooms() {
      ExamRoomApi.deleteExamRooms(this.multipleSelection).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getExamRoomList()
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
    open() {
      this.$confirm('此操作将永久删除该考场信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.deleteExamRooms()
          } else {
            this.$message({
              type: 'info',
              message: '已取消删除',
              center: true
            })
          }
        }
      })
    },
    // 获取考场分页列表
    getExamRoomList(page = 1) {
      this.pageNo = page
      ExamRoomApi.getExamRoomList(this.pageNo, this.pageSize, this.query).then(response => {
        if (response.code === 200) {
          this.examRoomList = response.data.records
          this.total = response.data.total
          this.loading = false
        } else {
          this.$message({
            type: 'error',
            message: '考场信息加载失败！',
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
