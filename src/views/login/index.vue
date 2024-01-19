<template>
  <div class="box">
    <div class="content">
      <div class="login-wrapper">
        <h1>高校排考系统登录界面</h1>
        <div class="login-form">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left">
            <el-form-item prop="username" class="form-item">
              <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="用户名" prefix-icon="el-icon-s-custom"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                :type="pwdType"
                v-model="loginForm.password"
                name="password"
                auto-complete="on"
                placeholder="密码"
                prefix-icon="el-icon-lock"/>
            </el-form-item>
            <el-form-item prop="code" class="form-item">
              <el-input v-model="loginForm.code" type="text" auto-complete="on" placeholder="验证码" style="width: 50%;float:left;" prefix-icon="el-icon-s-check" @keyup.enter.native="handleLogin"/>
              <img :src="verifyCodeImage" title="看不清?点击换一张" alt="验证码图片" style="width: 50%;height: 40px;float: left;margin-top: 0px" @click="changeVerifyCode">
            </el-form-item>
            <el-form-item>
              <el-link :underline="false" type="primary" style="float: right" @click="resetPassword">忘记密码?</el-link>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" class="login-btn" @click="handleLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="divider">
          <span class="line"/>
          <span class="divider-text">其他方式登录</span>
          <span class="line"/>
        </div>
        <div class="other-login-wrapper">
          <div class="other-login-item">
            <img src="../../assets/Login_images/git.png" alt="" @click="gitLogin">
          </div>
          <div class="other-login-item">
            <img src="../../assets/Login_images/phone.png" alt="" @click="phoneLogin">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginApi from '../../api/login'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入正确的用户名！'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位！'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('验证码不能为空！'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      verifyCodeImage: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.getVerifyCode()
  },
  methods: {
    phoneLogin() {
      this.$router.push('/loginPhone')
    },
    gitLogin() {
      LoginApi.gitLogin().then(response => {
        if (response.code === 200) {
          window.location.href = response.data
        }
      })
    },
    resetPassword() {
      this.$router.push('/resetPassword')
    },
    changeVerifyCode() {
      this.verifyCodeImage = 'http://localhost:10010/system/user/getVerifyCode?time=' + new Date()
      // this.verifyCodeImage = 'http://47.99.83.63:10010/system/user/getVerifyCode?time=' + new Date()
    },
    getVerifyCode() {
      this.verifyCodeImage = 'http://localhost:10010/system/user/getVerifyCode'
      // this.verifyCodeImage = 'http://47.99.83.63:10010/system/user/getVerifyCode'
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
            this.$message({
              message: '欢迎！',
              type: 'success',
              center: true
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message({
            type: 'error',
            message: '错误的信息提交！',
            center: true
          })
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
/*公共CSS*/
.box {
  width: 100vw;
  height: 100vh;
  background-color: rgb(29, 67, 89);
  .content {
    .login-wrapper {
      h1 {
        text-align: center;
      }
      .login-form {
        .form-item {
          margin: 40px 0;
          .input-item {
            width: 100%;
            border-radius: 40px;
            padding: 20px;
            box-sizing: border-box;
            font-size: 20px;
            font-weight: 200;
            &:focus {
              outline: none;
            }
          }
        }
        .login-btn {
          width: 100%;
          border-radius: 40px;
          color: #fff;
          border: 0;
          font-weight: 100;
          margin-top: 10px;
          cursor: pointer;
        }
      }
      .divider {
        width: 100%;
        margin: 20px 0;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        span:nth-child(1) {
          flex: 1;
        }
        span:nth-child(3) {
          flex: 1;
        }
        .line {
          display: inline-block;
          max-width: 30%;
          width: 30%;
        }
        .divider-text {
          vertical-align: middle;
          margin: 0px 20px;
          line-height: 0px;
          display: inline-block;
          width: 100px;
        }
      }
      .other-login-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .other-login-item {
        border: 1px solid rgb(214, 222, 228);
        padding: 10px;
        margin: 10px;
        cursor: pointer;
      }
    }
  }
}
/*一般大于手机的尺寸CSS*/
@media (min-width: 767px) {
  .box {
    background-color: rgb(29, 67, 89);
    .content {
      width: 85vw;
      height: 90vh;
      background: url("../../assets/login_two.jpg") no-repeat;
      background-size: 90% 100%;
      position: absolute;
      right: 15%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 20px;
      background-color: #fff;
      .login-wrapper {
        width: 25vw;
        position: absolute;
        right: 15%;
        top: 50%;
        transform: translateY(-50%);
        h1 {
          text-align: center;
          font-size: 45px;
          color: rgb(81, 100, 115);
          margin-bottom: 40px;
        }
        .login-form {
          margin: 10px 0;
          .form-item {
            span {
              color: rgb(81, 100, 115);
            }
            .input-item {
              height: 60px;
              border: 1px solid rgb(214, 222, 228);
            }
          }
          .login-btn {
            height: 50px;
            background-color: rgb(59, 72, 89);
            font-size: 20px;
          }
        }
        .divider {
          .line {
            border-bottom: 1px solid rgb(214, 222, 228);
          }
        }
        .other-login-item {
          border-radius: 20px;
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
}
/*手机端CSS*/
@media (max-width: 768px) {
  .box {
    .content {
      width: 100vw;
      height: 100vh;
      background: url("../../assets/login_bg_phone.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      .login-wrapper {
        width: 70%;
        height: 60%;
        padding-top: 15%;
        h1 {
          font-size: 30px;
          color: #fff;
        }
        .login-form {
          .form-item {
            margin: 10px 0;
            span {
              color: rgb(113, 129, 141);
            }
            .input-item {
              height: 30px;
              border: 1px solid rgb(113, 129, 141);
              background-color: transparent;
              color: #fff;
            }
          }
          .login-btn {
            height: 40px;
            background-color: rgb(235, 95, 93);
            font-size: 16px;
          }
        }
        .divider {
          .line {
            border-bottom: 1px solid #fff;
          }
          .divider-text {
            color: #fff;
          }
        }
        .other-login-item {
          border-radius: 15px;
          img {
            width: 35px;
            height: 35px;
          }
        }
      }
    }
  }
}
</style>
