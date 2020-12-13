<template>
  <div class="page">
    <div class="page-left">
      <div @click="goPage(item)" class="list" :key="index" v-for="(item, index) in route">
        {{item.title}}
      </div>
    </div>
    <router-view class="content" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: [{
        name: 'addCatalog',
        title: '新增标签'
      },{
        name: 'addArticle',
        title: '新增文章'
      }]
    }
  },
  methods: {
    goPage({name}) {
      const currName = this.$route.name
      if(currName != name) {
        this.$router.push({
          name
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page{
    height: 100%;
    display: flex;
    &-left{
      overflow: auto;
      background: #f1f1f1;
      width: 220px;
      height: 100%;
      .list{
        height: 50px;
        border-bottom: 1px solid #fff;
        cursor: pointer;
        line-height: 50px;
        padding-left: 20px;
        &:hover{
          color: #0276ea;
        }
      }
    }
    .content{
      flex: 1;
    }
  }
</style>