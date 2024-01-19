<template>
  <div style="margin-top: 100px">
    <h1 style="margin-left: 2%;float: left">ChatGPT</h1>
    <div class="chat_input">
      <el-input v-model="question" placeholder="请输入内容" style="float: left;width: 500px" @keyup.enter.native="getResponse"/>
      <el-button type="primary" style="float: left" @click="getResponse">确定</el-button>
    </div>
    <el-card class="box-card">
      <div v-for="(value,index) in list" :key="index" class="text item">
        <div style="margin-top: 10px">
          <el-tag type="info" style="width: 60px;text-align: center">{{ value.role }}</el-tag>
          <vue-simple-markdown :source="value.message" style="margin-left: 5px;margin-top: 5px"/>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>

import axios from 'axios'
import { VueSimpleMarkdown } from 'vue-simple-markdown'
import 'vue-simple-markdown/dist/vue-simple-markdown.css'
export default {
  name: 'Chat',
  components: {
    VueSimpleMarkdown
  },
  data() {
    return {
      question: '',
      res: '',
      list: [
        {
          role: 'AI',
          message: '您好，有什么能为您服务的吗？'
        }
      ]
    }
  },
  methods: {
    getResponse() {
      if (this.question === '') {
        this.$message.info('内容不能为空哦！')
        return false
      }
      this.list.push({ role: '我', message: this.question })
      axios.post('http://localhost:10010/system/chat', {
        question: this.question
      }).then(res => {
        this.question = ''
        const d = res.data.data
        this.res = JSON.parse(d).choices[0].message.content
        this.list.push({ role: 'AI', message: this.res })
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  margin-top: 20px;
  margin-left: 2%;
  width: 96%;
  height: 550px;
  overflow: scroll;
}
.chat_input{
  float: right;
  width: 600px;
}
</style>
