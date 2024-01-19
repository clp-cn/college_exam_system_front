<template>
  <div class="container">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="学院管理" name="first">
        <span slot="label"><i class="el-icon-school"/> 学院管理</span>
        <el-form :inline="true" class="demo-form-inline" style="margin-left: 2%;margin-top: 30px;width:96%;border-bottom: 1px dashed #C0C4CC ">
          <!--      新增学院-->
          <el-form-item>
            <el-popover
              placement="right"
              width="400"
              trigger="click">
              <h3 style="text-align: center">新增学院</h3>
              <el-form ref="college" :model="college" label-width="100px" class="demo-ruleForm" style="width: 300px;margin-top: 20px">
                <el-form-item
                  :rules="[
                    { required: true, message: '学院名称不能为空'},
                  ]"
                  label="学院名称"
                  prop="college"
                >
                  <el-input v-model="college.college" autocomplete="off"/>
                </el-form-item>
                <el-form-item
                  :rules="[
                    { required: true, message: '学院院长不能为空'},
                  ]"
                  label="学院院长"
                  prop="dean"
                >
                  <el-input v-model="college.dean" autocomplete="off"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="addCollege('college')">提交</el-button>
                  <el-button @click="resetForm('college')">重置</el-button>
                </el-form-item>
              </el-form>
              <el-button slot="reference" type="primary" icon="el-icon-plus">新增学院</el-button>
            </el-popover>
          </el-form-item>
          <!--      批量删除学院-->
          <el-form-item>
            <el-button :disabled="collegeDeleteBtn" type="primary" icon="el-icon-delete" @click="collegeOpen">批量删除</el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="collegeLoading"
          :data="collegeList"
          border
          style="width: 96%;margin-left: 2%;margin-top: 20px;box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1)"
          @selection-change="collegeHandleSelectionChange">
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
            prop="college"
            label="学院名称"
            align="center"
            width="300"/>
          <el-table-column
            prop="dean"
            label="学院院长"
            align="center"
            width="200"/>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="300"
            align="center"/>
          <el-table-column
            prop="updateTime"
            label="更新时间"
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
                title="您确定要删除该学院吗？"
                @confirm="deleteCollege(scope.row)"
              >
                <el-button slot="reference" type="danger" icon="el-icon-delete" circle size="small"/>
              </el-popconfirm>
              <el-button type="primary" icon="el-icon-edit" circle size="small" @click="collegeOpenDrawer(scope.row)"/>
            </template>
          </el-table-column>
        </el-table>
        <!--    分页选择器-->
        <el-pagination
          :total="collegeTotal"
          :page-size="collegePageSize"
          :page-sizes="[5,10,20,50,100]"
          :current-page="collegePageNo"
          layout="->, total, sizes, prev, pager, next, jumper"
          style="margin-right: 2%;margin-top: 20px;margin-bottom: 20px"
          background
          @size-change="collegeHandleSizeChange"
          @current-change="collegeHandleCurrentChange"/>
        <!--    更新学院-->
        <el-drawer
          :visible.sync="collegeDrawer"
          :with-header="true"
          title="学院信息修改">
          <el-form ref="updateCollegeInfo" :model="updateCollegeInfo" label-width="100px" class="demo-ruleForm" style="width: 400px">
            <el-form-item
              :rules="[
                {required: true, message: '学院名称不能为空'}
              ]"
              label="学院名称"
              prop="college">
              <el-input v-model="updateCollegeInfo.college"/>
            </el-form-item>
            <el-form-item
              :rules="[
                {required: true, message: '学院院长不能为空'}
              ]"
              label="学院院长"
              prop="dean">
              <el-input v-model="updateCollegeInfo.dean" autocomplete="off"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateCollege('updateCollegeInfo')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-drawer>
      </el-tab-pane>
      <el-tab-pane label="专业管理" name="second">
        <span slot="label"><i class="el-icon-collection"/> 专业管理</span>
        <el-form :inline="true" class="demo-form-inline" style="margin-left: 2%;margin-top: 30px;width:96%;border-bottom: 1px dashed #C0C4CC ">
          <!--      新增专业-->
          <el-form-item>
            <el-popover
              placement="right"
              width="400"
              trigger="click">
              <h3 style="text-align: center">新增专业</h3>
              <el-form ref="profession" :model="profession" label-width="100px" class="demo-ruleForm" style="width: 300px;margin-top: 20px">
                <el-form-item
                  :rules="[
                    { required: true, message: '专业名称不能为空'},
                  ]"
                  label="专业名称"
                  prop="profession"
                >
                  <el-input v-model="profession.profession" autocomplete="off"/>
                </el-form-item>
                <el-form-item
                  :rules="[
                    {required: true, message: '所属学院不能为空'}
                  ]"
                  label="所属学院"
                  prop="college">
                  <el-select v-model="profession.college" placeholder="请选择学院">
                    <el-option v-for="c in colleges" :key="c" :label="c" :value="c" align="center"/>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="addProfession('profession')">提交</el-button>
                  <el-button @click="resetForm('profession')">重置</el-button>
                </el-form-item>
              </el-form>
              <el-button slot="reference" type="primary" icon="el-icon-plus">新增专业</el-button>
            </el-popover>
          </el-form-item>
          <!--      批量删除专业-->
          <el-form-item>
            <el-button :disabled="proDeleteBtn" type="primary" icon="el-icon-delete" @click="professionOpen">批量删除</el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="proLoading"
          :data="professionList"
          border
          style="width: 96%;margin-left: 2%;margin-top: 20px;box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1)"
          @selection-change="proHandleSelectionChange">
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
            prop="profession"
            label="专业名称"
            align="center"
            width="300"/>
          <el-table-column
            prop="college"
            label="所属学院"
            align="center"
            width="300"/>
          <el-table-column
            prop="createTime"
            label="创建时间"
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
                title="您确定要删除该专业吗？"
                @confirm="deleteProfession(scope.row)"
              >
                <el-button slot="reference" type="danger" icon="el-icon-delete" circle size="small"/>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--    分页选择器-->
        <el-pagination
          :total="proTotal"
          :page-size="proPageSize"
          :page-sizes="[5,10,20,50,100]"
          :current-page="proPageNo"
          layout="->, total, sizes, prev, pager, next, jumper"
          style="margin-right: 2%;margin-top: 20px;margin-bottom: 20px"
          background
          @size-change="proHandleSizeChange"
          @current-change="proHandleCurrentChange"/>
      </el-tab-pane>
      <el-tab-pane label="班级管理" name="third">
        <span slot="label"><i class="el-icon-reading"/> 班级管理</span>
        <el-form :inline="true" class="demo-form-inline" style="margin-left: 2%;margin-top: 30px;width:96%;border-bottom: 1px dashed #C0C4CC ">
          <!--      新增班级-->
          <el-form-item>
            <el-popover
              placement="right"
              width="400"
              trigger="click">
              <h3 style="text-align: center">新增班级</h3>
              <el-form ref="classes" :model="classes" label-width="100px" class="demo-ruleForm" style="width: 300px;margin-top: 20px">
                <el-form-item
                  :rules="[
                    { required: true, message: '班级名称不能为空'},
                  ]"
                  label="班级名称"
                  prop="name"
                >
                  <el-input v-model="classes.name" autocomplete="off"/>
                </el-form-item>
                <el-form-item
                  :rules="[
                    { required: true, message: '班级类型不能为空'},
                  ]"
                  label="班级类型"
                  prop="type"
                >
                  <el-radio v-model="classes.type" label="专业班级">专业班级</el-radio>
                  <el-radio v-model="classes.type" label="公共班级">公共班级</el-radio>
                </el-form-item>
                <el-form-item
                  :rules="[
                    {required: true, message: '所属学院不能为空'}
                  ]"
                  label="所属学院"
                  prop="college">
                  <el-select v-model="classes.college" placeholder="请选择学院" @change="getProfessions(classes.college)">
                    <el-option v-for="c in colleges" :key="c" :label="c" :value="c" align="center"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="classes.type === '专业班级'"
                  :rules="[
                    {required: true, message: '所属专业不能为空'}
                  ]"
                  label="所属专业"
                  prop="profession">
                  <el-select v-model="classes.profession" placeholder="请选择专业">
                    <el-option v-for="p in professions" :key="p" :label="p" :value="p" align="center"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  :rules="[
                    {required: true, message: '所属年级不能为空'}
                  ]"
                  label="所属年级"
                  prop="grade">
                  <el-select v-model="classes.grade" placeholder="请选择年级">
                    <el-option label="大一" align="center" value="大一"/>
                    <el-option label="大二" align="center" value="大二"/>
                    <el-option label="大三" align="center" value="大三"/>
                    <el-option label="大四" align="center" value="大四"/>
                  </el-select>
                </el-form-item>
                <el-form-item
                  :rules="[
                    {required: true, message: '班级人数不能为空' }
                  ]"
                  label="班级人数"
                  prop="students">
                  <el-input v-model.number="classes.students" placeholder="请输入班级人数"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="addClass('classes')">提交</el-button>
                  <el-button @click="resetForm('classes')">重置</el-button>
                </el-form-item>
              </el-form>
              <el-button slot="reference" type="primary" icon="el-icon-plus">新增班级</el-button>
            </el-popover>
          </el-form-item>
          <!--      批量删除专业-->
          <el-form-item>
            <el-button :disabled="classDeleteBtn" type="primary" icon="el-icon-delete" @click="classOpen">批量删除</el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="classLoading"
          :data="classList"
          border
          style="width: 96%;margin-left: 2%;margin-top: 20px;box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1)"
          @selection-change="classHandleSelectionChange">
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
            prop="name"
            label="班级名称"
            align="center"
            width="200"/>
          <el-table-column
            prop="college"
            label="所属学院"
            align="center"
            width="300"/>
          <el-table-column
            prop="grade"
            label="所属年级"
            align="center"
            width="200"/>
          <el-table-column
            prop="students"
            label="班级人数"
            align="center"
            width="150"/>
          <el-table-column
            prop="type"
            label="班级类型"
            align="center"
            width="200">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.type === '专业班级' ? '' : 'success'"
                disable-transitions
              >{{ scope.row.type }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"/>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="150">
            <template slot-scope="scope">
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="您确定要删除该班级吗？"
                @confirm="deleteClass(scope.row)"
              >
                <el-button slot="reference" type="danger" icon="el-icon-delete" circle size="small"/>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--    分页选择器-->
        <el-pagination
          :total="classTotal"
          :page-size="classPageSize"
          :page-sizes="[5,10,20,50,100]"
          :current-page="classPageNo"
          layout="->, total, sizes, prev, pager, next, jumper"
          style="margin-right: 2%;margin-top: 20px;margin-bottom: 20px"
          background
          @size-change="classHandleSizeChange"
          @current-change="classHandleCurrentChange"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import SchoolApi from '../../api/school'
export default {
  name: 'Index',
  data() {
    return {
      activeName: 'first',
      collegeLoading: true,
      collegeDrawer: false,
      college: {},
      collegeList: [],
      colleges: [],
      collegeDeleteBtn: true,
      collegeMultipleSelection: [],
      collegePageNo: 1,
      collegePageSize: 5,
      collegeTotal: 0,
      updateCollegeInfo: {},
      proLoading: true,
      proDrawer: false,
      professionList: [],
      professions: [],
      profession: {},
      proDeleteBtn: true,
      proMultipleSelection: [],
      proPageNo: 1,
      proPageSize: 5,
      proTotal: 0,
      classLoading: true,
      classDrawer: false,
      classList: [],
      classes: {
        type: '专业班级'
      },
      classDeleteBtn: true,
      classMultipleSelection: [],
      classPageNo: 1,
      classPageSize: 5,
      classTotal: 0
    }
  },
  mounted() {
    this.getCollegeList(1)
    this.getProfessionList(1)
    this.getClassList(1)
    this.getColleges()
    this.getProfessions('学院')
  },
  methods: {
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
    // 新增学院
    addCollege(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          SchoolApi.addCollege(this.college).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              this.resetForm(formName)
              this.getCollegeList()
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
            message: '请填写正确的学院信息！',
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
    collegeOpen() {
      this.$confirm('此操作将永久删除该学院信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.deleteColleges()
          } else {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        }
      })
    },
    // 删除学院
    deleteCollege(college) {
      SchoolApi.deleteCollege(college.id).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功！',
            center: true
          })
          this.getCollegeList()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败！',
            center: true
          })
        }
      })
    },
    // 批量删除学院
    deleteColleges() {
      const collegeIds = []
      this.collegeMultipleSelection.forEach(c => collegeIds.push(c.id))
      SchoolApi.deleteColleges(collegeIds).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功！',
            center: true
          })
          this.getCollegeList()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败！',
            center: true
          })
        }
      })
    },
    collegeHandleSizeChange(val) {
      this.collegePageSize = val
      this.getCollegeList()
    },
    collegeHandleCurrentChange(val) {
      this.getCollegeList(val)
    },
    collegeHandleSelectionChange(val) {
      this.collegeMultipleSelection = val
      this.collegeDeleteBtn = this.collegeMultipleSelection.length <= 0
    },
    // 获取学院分页列表
    getCollegeList(page = 1) {
      this.collegePageNo = page
      SchoolApi.getCollegeList(this.collegePageNo, this.collegePageSize).then(response => {
        if (response.code === 200) {
          this.collegeList = response.data.records
          this.collegeTotal = response.data.total
          this.collegeLoading = false
        } else {
          this.$message({
            type: 'error',
            message: '学院信息加载失败！',
            center: true
          })
        }
      })
    },
    // 更新学院
    updateCollege(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          SchoolApi.updateCollege(this.updateCollegeInfo).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: '更新成功！',
                center: true
              })
              this.getCollegeList()
              this.collegeDrawer = false
            } else {
              this.$message({
                type: 'error',
                message: '更新失败！',
                center: true
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '请填写正确的学院信息！',
            center: true
          })
          return false
        }
      })
    },
    collegeOpenDrawer(row) {
      this.collegeDrawer = true
      this.updateCollegeInfo = row
    },
    // 新增专业
    addProfession(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          SchoolApi.addProfession(this.profession).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: '添加成功！',
                center: true
              })
              this.resetForm(formName)
              this.getProfessionList()
            } else {
              this.$message({
                type: 'error',
                message: response.message,
                center: true
              })
            }
          })
        }
      })
    },
    professionOpen() {
      this.$confirm('此操作将永久删除该专业信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.deleteProfessions()
          } else {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        }
      })
    },
    // 删除专业
    deleteProfession(profession) {
      SchoolApi.deleteProfession(profession.id).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功！',
            center: true
          })
          this.getProfessionList()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败！',
            center: true
          })
        }
      })
    },
    // 批量删除专业
    deleteProfessions() {
      const professionIds = []
      this.proMultipleSelection.forEach(p => professionIds.push(p.id))
      SchoolApi.deleteProfessions(professionIds).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功！',
            center: true
          })
          this.getProfessionList()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败！',
            center: true
          })
        }
      })
    },
    proHandleSizeChange(val) {
      this.proPageSize = val
      this.getProfessionList()
    },
    proHandleCurrentChange(val) {
      this.getProfessionList(val)
    },
    proHandleSelectionChange(val) {
      this.proMultipleSelection = val
      this.proDeleteBtn = this.proMultipleSelection.length <= 0
    },
    // 获取专业分页列表
    getProfessionList(page = 1) {
      this.proPageNo = page
      SchoolApi.getProfessionList(this.proPageNo, this.proPageSize).then(response => {
        if (response.code === 200) {
          this.professionList = response.data.records
          this.proTotal = response.data.total
          this.proLoading = false
        } else {
          this.$message({
            type: 'error',
            message: '专业信息加载失败！',
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
        } else {
          this.$message({
            type: 'error',
            message: '专业信息加载失败，请刷新重试！',
            center: true
          })
        }
      })
    },
    // 新增班级
    addClass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          SchoolApi.addClass(this.classes).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.message,
                center: true
              })
              this.resetForm(formName)
              this.getClassList()
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
    classOpen() {
      this.$confirm('此操作将永久删除该班级信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.deleteClasses()
          } else {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        }
      })
    },
    // 删除班级
    deleteClass(classes) {
      SchoolApi.deleteClass(classes.id).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功！',
            center: true
          })
          this.getClassList()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败！',
            center: true
          })
        }
      })
    },
    // 批量删除班级
    deleteClasses() {
      const classIds = []
      this.classMultipleSelection.forEach(c => classIds.push(c.id))
      SchoolApi.deleteClasses(classIds).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.message,
            center: true
          })
          this.getClassList()
        } else {
          this.$message({
            type: 'error',
            message: response.message,
            center: true
          })
        }
      })
    },
    classHandleSizeChange(val) {
      this.classPageSize = val
      this.getClassList()
    },
    classHandleCurrentChange(val) {
      this.getClassList(val)
    },
    classHandleSelectionChange(val) {
      this.classMultipleSelection = val
      this.classDeleteBtn = this.classMultipleSelection.length <= 0
    },
    // 获取班级分页列表
    getClassList(page = 1) {
      this.classPageNo = page
      SchoolApi.getClassList(this.classPageNo, this.classPageSize).then(response => {
        if (response.code === 200) {
          this.classList = response.data.records
          this.classTotal = response.data.total
          this.classLoading = false
        } else {
          this.$message({
            type: 'error',
            message: '获取班级信息列表失败！',
            center: true
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.container {
  margin-top: 50px;
}
</style>
