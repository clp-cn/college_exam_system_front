<template>
  <div>正在登录Gitee，请稍等...</div>
</template>
<script>
export default {
  name: 'Gitee',
  data() {
    return {
      code: '',
      state: ''
    }
  },
  created() {
    // this.getCode()
    this.loginGit()
  },
  methods: {
    loginGit() {
      const name = this.$route.query.name
      // axios.get('https://gitee.com/api/v5/user?access_token=' + accessToken).then(response => {
      this.$store.dispatch('GitLogin', name).then(() => {
        this.$router.push({ path: this.redirect || '/' })
        this.$message({
          message: '欢迎！',
          type: 'success',
          center: true
        })
      })
      // })
    }
    // getCode() {
    //   this.code = this.$route.query.code
    //   axios.post('https://gitee.com/oauth/token', {
    //     'grant_type': 'authorization_code',
    //     'code': this.code,
    //     'client_id': 'cb8c2d0064eb83a3cbddc582d761a60971fb073d3be8202dc8d95aecfcd21cbd',
    //     'redirect_uri': 'http://localhost:8080/gitee',
    //     'client_secret': '3eb156c10228d3b18a061cdc8830369d01718d6cd58252d17ab4ff6bad1cd778'
    //   }).then(response => {
    //     // 拿到授权token
    //     const accessToken = response.data.access_token
    //     axios.get('https://gitee.com/api/v5/user?access_token=' + accessToken).then(response => {
    //       this.$store.dispatch('GitLogin', response.data.name).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //         this.$message({
    //           message: '欢迎！',
    //           type: 'success',
    //           center: true
    //         })
    //       })
    //     })
    //   })
    // }
  }
}
</script>
