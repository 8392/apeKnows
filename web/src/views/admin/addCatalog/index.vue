<template>
  <div class="catalog">
    <el-form label-width="80px">
      <el-form-item label="标签名称">
        <el-input v-model="query.catalogName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMeth">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addCatalog } from "@/api/home"
export default {
  data() {
    return {
      query: {

      }
    }
  },
  created() {

  },
  methods: {
    async addMeth() {
      const res = await addCatalog(this.query)
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