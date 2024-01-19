<template>
  <el-menu class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <div class="rightContainer">
      <el-dropdown class="announcement">
        <span style="float: left;margin-top: 5px">通知</span>
        <el-badge is-dot class="item"/>
        <span style="float: left;margin-top: 5px">：</span>
        <el-carousel :autoplay="true" height="25px" direction="vertical" indicator-position="none" style="float: left;margin-top:17px;line-height:25px;margin-left:5px;width: 80px">
          <el-carousel-item v-for="(announce, index) in announcements" :key="index">
            <span style="margin-left: 5px;color:#FFD700">{{ announce.announcement.length > 5 ? announce.announcement.substring(0,5) + '...' : announce.announcement }}</span>
          </el-carousel-item>
        </el-carousel>
        <span style="width: 2px;float:left;margin-top: 3px;margin-left: 10px">|</span>
        <el-dropdown-menu slot="dropdown" class="user-dropdown" style="width: 480px">
          <el-card class="box-card" style="border: none;width: 477px">
            <div slot="header" class="clearfix">
              <span style="font-size: 18px;text-align: center">最近通知</span>
              <el-popover
                placement="right"
                width="400"
                trigger="click">
                <span style="float: left">通知内容:</span>
                <el-input v-model="announcement" type="textarea" autosize maxlength="1000" show-word-limit placeholder="请输入通知内容..." style="margin-top: 3px" @keyup.native.enter="publishAnnouncement"/>
                <el-button type="primary" style="float: right;margin-top: 3px" @click="publishAnnouncement">发布</el-button>
                <el-button v-if="roles === '管理员'" slot="reference" style="float: right" type="success"><i class="el-icon-edit"/>发布通知</el-button>
              </el-popover>
            </div>
            <div v-for="(an, index) in announcements" :key="index" class="text item" style="margin-bottom: 18px;font-size: 14px;color: #03a9f4">
              {{ index + 1 }}. {{ an.announcement }}
              <el-link v-if="roles === '管理员'" :underline="false" type="primary" style="font-size: 10px;float: right" @click="deleteAnnouncement(an)">删除</el-link>
              <span style="float: right;font-size: 12px;color: red;margin-right: 20px">{{ new Date(an.createTime).getFullYear() + '-' + new Date(an.createTime).getMonth() + '-' + new Date(an.createTime).getDate() }}</span>
            </div>
            <el-link v-if="pullDown" :underline="false" type="primary" style="float: right;font-size: 12px" @click="getMoreAnnouncements">下拉⬇</el-link>
            <el-link v-if="packUp" :underline="false" type="primary" style="float: right;font-size: 12px" @click="packUpBtn">收起⬆</el-link>
          </el-card>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="avatar-container">
        <div class="avatar-wrapper">
          <span style="float: left;margin-left: 20px;margin-right: 20px">
            {{ roles }}：{{ nickname }}
          </span>
          <img :src="avatar" class="user-avatar" alt="">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              <span style="display: block"><i class="el-icon-house"/>系统主页</span>
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block" @click="logout"><i class="el-icon-switch-button"/>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import UserApi from '../../../api/user'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      announcement: '',
      announcements: [],
      pullDown: true,
      packUp: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'nickname',
      'userId',
      'roles',
      'avatar'
    ])
  },
  mounted() {
    this.getAnnouncements()
  },
  methods: {
    packUpBtn() {
      this.getAnnouncements()
      this.packUp = false
      this.pullDown = true
    },
    // 删除通知
    deleteAnnouncement(announcement) {
      UserApi.deleteAnnouncement(announcement).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功！',
            center: true
          })
          this.getAnnouncements()
          this.pullDown = true
          this.packUp = false
        } else {
          this.$message({
            type: 'error',
            message: '删除失败！',
            center: true
          })
        }
      })
    },
    // 获取更多的通知
    getMoreAnnouncements() {
      UserApi.getMoreAnnouncements().then(response => {
        if (response.code === 200) {
          this.announcements = response.data
          this.pullDown = false
          this.packUp = true
        } else {
          this.$message({
            type: 'error',
            message: '拉取更多通知信息失败！',
            center: true
          })
        }
      })
    },
    getAnnouncements() {
      UserApi.getAnnouncements().then(response => {
        if (response.code === 200) {
          this.announcements = response.data
        } else {
          this.$message({
            type: 'error',
            message: '通知信息加载失败！',
            center: true
          })
        }
      })
    },
    publishAnnouncement() {
      UserApi.publishAnnouncement(this.announcement.trim()).then(response => {
        if (response.code === 200) {
          this.$notify({
            title: '成功',
            message: response.message,
            type: 'success'
          })
          this.getAnnouncements()
        } else {
          this.$notify.error({
            title: '失败',
            message: response.message
          })
        }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$message({
          type: 'success',
          message: '退出成功，即将跳转到登录页面！',
          center: true
        })
        setTimeout(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        }, 1000)
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  width: 100%;
  line-height: 50px;
  border-radius: 0px !important;
  background-color: #409EBF;
  position: fixed;
  z-index: 999;
  .hamburger-container {
    line-height: 50px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .rightContainer {
    height: 50px;
    display: inline-block;
    position: fixed;
    right: 10px;
    .announcement {
      cursor: pointer;
      display: inline-block;
      float: left;
      color: #f4f4f5;
      font-size: 12px;
      .item{
        margin-top: 3px;
        float: left;
      }
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    .avatar-container {
       display: inline-block;
       color: #f4f4f5;
       .avatar-wrapper {
         cursor: pointer;
         margin-top: 4px;
         font-size: 12px;
         .user-avatar {
           width: 40px;
           height: 40px;
           border-radius: 50%;
           margin-top: 1px;
         }
       }
     }
  }

}

</style>

