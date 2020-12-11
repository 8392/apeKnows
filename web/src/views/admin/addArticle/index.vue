<template>
  <div class="catalog">
    <el-form label-width="80px">
      <el-form-item label="文章名称">
        <el-input v-model="query.articleName"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input v-model="query.articleContent"></el-input>
      </el-form-item>
      <el-form-item label="文章图片">
        <el-input v-model="query.articleImg"></el-input>
      </el-form-item>
      <el-form-item label="标签名称">
        <el-input v-model="query.catalogId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMeth">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addArtical } from "@/api/home"
export default {
  data() {
    return {
      query: {
        articleName: '',
        articleContent: '',
        articleImg: '',
        catalogId: '',
      }
    }
  },
  created() {

  },
  methods: {
    async addMeth() {
      const res = await addArtical(this.query)
      this.$message.success("新增成功！")
      console.log("res", res)
    }
  }
}
</script>

<style lang="scss" scoped>
  .catalog{
    padding: 20px;
  }

</style>