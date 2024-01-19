<template>
  <div class="data-container">
    <div class="data-statistic">
      <div>
        <img src="../../assets/images/访问人数.png" alt="">
        <span>今日访问数</span>
        <p>{{ todayAccess }}</p>
      </div>
      <div>
        <img src="../../assets/images/用户访问量.png" alt="">
        <span>用户总访问量</span>
        <p>{{ userAccess }}</p>
      </div>
      <div>
        <img src="../../assets/images/师生比.png" alt="">
        <span>师生比</span>
        <p>{{ students%teachers === 0 ? 1 + '/' + students / teachers : teachers + '/' + students }}</p>
      </div>
      <div>
        <img src="../../assets/images/总用户数.png" alt="">
        <span>总用户数</span>
        <p>{{ users }}</p>
      </div>
    </div>
    <div class="data-echarts"/>
  </div>
</template>
<script>
import StudentApi from '../../api/student'
import UserApi from '../../api/user'
import TeacherApi from '../../api/teacher'
export default {
  name: 'Data',
  components: {
  },
  data() {
    return {
      data1: [],
      data2: [],
      data3: [],
      value: new Date(),
      todayAccess: '',
      userAccess: '',
      teachers: '',
      students: '',
      users: ''
    }
  },
  mounted() {
    this.getCollegeStudents()
    this.getUsers()
    this.getTeacherStudent()
    this.getUserAccesses()
    this.getTodayAccesses()
  },
  methods: {
    getCollegeStudents() {
      StudentApi.getCollegeStudents().then(response => {
        if (response.code === 200) {
          const dataList = response.data
          dataList.forEach(d => {
            this.data1.push(d.college)
            this.data2.push(d.students)
            this.data3.push({
              value: d.students,
              name: d.college
            })
          })
        }
      })
    },
    getUsers() {
      UserApi.getUsers().then(response => {
        if (response.code === 200) {
          this.users = response.data
        }
      })
    },
    getTeacherStudent() {
      StudentApi.getStudents().then(response => {
        if (response.code === 200) {
          this.students = response.data
        }
      })
      TeacherApi.getTeachers().then(response => {
        if (response.code === 200) {
          this.teachers = response.data
        }
      })
    },
    getUserAccesses() {
      UserApi.getUserAccesses().then(response => {
        if (response.code === 200) {
          this.userAccess = response.data
        }
      })
    },
    getTodayAccesses() {
      UserApi.getTodayAccesses(new Date()).then(response => {
        if (response.code === 200) {
          this.todayAccess = response.data
        }
      })
    }
  }
}

</script>
<style lang="scss">
.data-container {
  width: 100%;
  //height: 1000px;
  background-color: rgb(247,247,247);
  margin-top: 50px;
  .data-statistic {
    div {
      width: 20%;
      height: 200px;
      background-color: white;
      position: relative;
      float:left;
      margin-left: 4%;
      margin-top: 50px;
      border-radius: 5px;
      font-size: 24px;
      text-align: center;
      img {
        width: 80px;
        height: 80px;
        margin-top: 50px;
      }
      span {
        position: relative;
        top: -50px
      }
      p {
        position:relative;
        top: -50px;
        left: 50px
      }
    }
  }
  .data-echarts {}
}
</style>
