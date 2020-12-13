<template>
  <div class="home">
    <!-- 首页 -->
    <div class="header">
      <div class="w">
        <div class="left">
          <div class="left-list">首页</div>
          <div class="left-list">列表</div>
        </div>
        <div class="right">
          <el-input v-model="search" suffix-icon="el-icon-search" size="small" />
          <div class="user">
            <div class="des"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="catalog">
      <div class="w">
        <div class="list">推荐</div>
        <div class="list">推荐</div>
        <div class="list">推荐</div>
        <div class="list">推荐</div>
      </div>
    </div>
    <div class="main">
      <div class="w" v-infinite-scroll="getList" >
        <div class="list" :key="item.id" v-for="(item, index) in list">
          <div class="l">
            <div class="title">{{item.articleName}}</div>
          </div>
          <div class="r" v-if="item.articleImg">
            <img src="../../assets/a.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserList } from "@/api/user"
import { getList } from "@/api/home"
export default {
  data() {
    return {
      search: '',
      query: {
        currPage: 0,
        pageSize: 10,
      },
      totalPage: 1,
      list: []
    }
  },
  created() {
    // this.getList() //获取文章列表
  },
  methods: {
    async getList() {
      if(this.query.currPage >= this.totalPage) {
        return
      }
      this.query.currPage += 1
      const res = await getList(this.query)
      this.list = this.list.concat(res.tableData)
      this.totalPage = Math.ceil(res.page.total / this.query.pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/home.scss';
</style>