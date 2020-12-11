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
        <el-form-item label="昵称：">
          <el-input v-model="query.nickName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/user"
export default {
  data() {
    return {
      query: {
        userName: '',
        password: '',
        nickName: '',
      }
    }
  },
  methods: {
    async submitForm() {
      const res = await register(this.query)
      this.$message.success("注册成功！")
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