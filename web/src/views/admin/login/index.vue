<template>
  <div class="register">
    <!-- 注册 -->
    <div class="content">
      <el-form label-position="right" label-width="80px" >
        <el-form-item label="用户名：">
          <el-input v-model="query.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="query.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        userName: 'artist',
        password: '123456',
      }
    }
  },
  methods: {
    async submitForm() {
      const res = await this.$store.dispatch('user/login', this.query)
      console.log("res", res)
      this.$message.success("登录成功！")
    }
  }
}
</script>

<style lang="scss" scoped>
.register{
  background: #0d1117;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content{
    width: 400px;
    padding: 20px;
    // height: 300px;
  }
}
</style>