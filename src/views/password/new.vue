<template>
  <div class="box">
    <div class="content">
      <div class="reset-wrapper">
        <h1>重置密码</h1>
        <div v-if="!existUser" class="tip">请通过输入绑定的邮箱重置你的密码</div>
        <div v-if="sendEmail && existUser" class="tip">我们向邮箱 {{ resetForm.email }} 发送了一封含有重置密码链接的邮件。请登录网页版邮箱查看，如长时间没有收到邮件，请检查你的垃圾邮件文件夹。</div>
        <div class="reset-form">
          <el-form ref="resetForm" :model="resetForm" :rules="resetRules" auto-complete="on" label-position="left">
            <el-form-item v-if="sendEmail && flag" class="form-item">
              <button style="width: 100%;height:40px;color: #FFF;background-color: #F56C6C;border: none;border-radius: 3px">
                用户不存在
              </button>
            </el-form-item>
            <el-form-item v-if="!existUser" prop="email" class="form-item">
              <el-input v-model="resetForm.email" name="email" type="text" auto-complete="on" placeholder="邮箱地址" prefix-icon="el-icon-message"/>
            </el-form-item>
            <el-form-item v-if="!existUser">
              <el-button class="reset-btn" @click.native.prevent="handleReset">
                重置密码
              </el-button>
            </el-form-item>
            <el-form-item v-if="sendEmail && existUser">
              <el-button class="reset-btn" @click.native.prevent="handleLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import loginApi from '../../api/login'
export default {
  name: 'New',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入邮箱地址'))
      } else {
        callback()
      }
    }
    return {
      resetForm: {
        email: ''
      },
      resetRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }]
      },
      existUser: false,
      sendEmail: false,
      flag: false
    }
  },
  methods: {
    handleReset() {
      this.sendEmail = true
      this.$refs.resetForm.validate(valid => {
        if (valid) {
          // 发送重置密码请求
          loginApi.resetPassword(this.resetForm.email).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: '已发送重置密码请求！',
                center: true
              })
              this.existUser = true
            } else {
              this.existUser = false
              this.flag = true
            }
          })
        } else {
          console.log('please input email!!')
          return false
        }
      })
    },
    handleLogin() {
      this.$router.push('/login')
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
    .reset-wrapper {
      h1 {
        text-align: center;
      }
      .tip {
        margin-top: -10px;
        color: #8C92A4;
        font-size: 14px;
        line-height: 1.5;
        text-align: center;
      }
      .reset-form {
        .form-item {
          margin: 20px 0;
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
        .reset-btn {
          width: 100%;
          border-radius: 40px;
          color: #fff;
          border: 0;
          font-weight: 100;
          margin-top: 10px;
          cursor: pointer;
        }
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
      .reset-wrapper {
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
        .reset-form {
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
          .reset-btn {
            height: 50px;
            background-color: rgb(59, 72, 89);
            font-size: 20px;
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
      .reset-wrapper {
        width: 70%;
        height: 60%;
        padding-top: 15%;
        h1 {
          font-size: 30px;
          color: #fff;
        }
        .reset-form {
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
          .reset-btn {
            height: 40px;
            background-color: rgb(235, 95, 93);
            font-size: 16px;
          }
        }
      }
    }
  }
}

</style>
