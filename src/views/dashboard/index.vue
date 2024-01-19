<template>
  <div class="dashboard-container">
    <img src="../../assets/images/考试啦.png" style="width: 50px;height: 50px;position: relative;top: -30px" alt="">
    <h1 style="position: relative;left: 50px;top:-90px">考试中</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'username',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  margin-top: 80px;
  background-size: 100% 100%;
  background: url("../../assets/images/home1.png") center center no-repeat ;
  width: 100%;
  height: 90vh;
}
</style>
