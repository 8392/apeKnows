<template>
  <div>
    <div class="topDiv">

    </div>
    <div class="div">
      <ul class="navgator">
        <li class="navgatorLi" :class="{'isActive': index===navgatorIndex}" @click="handleLeft(index)" v-for="(item,index) in navgator" :key="item">{{item}}</li>
      </ul>
      <ul class="rightList">
        <li :id="'id'+index" v-for="(item,index) in listBox" :key="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
  data() {
    return {
      navgator: [
        '列表A',
        '列表B',
        '列表C',
        '列表D',
      ],
      navgatorIndex: 0,
      listBox: [
        'A','B','C','D'
      ],
      listBoxState: true,//点击导航栏时，暂时停止监听页面滚动
    };
  },
  created() {

  },
  mounted() {
    let timeId;
    window.addEventListener('scroll', () => {
      // 页面滚动停止100毫秒后才会执行下面的函数。
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        this.scrollToTop();
        console.log('执行完了哦');
      }, 100);
    } , true);
  },
  methods: {
    // 点击导航菜单，页面滚动到指定位置
    handleLeft(index) {
      this.navgatorIndex = index;

      this.$el.querySelector(`#id${index}`).scrollIntoView({
        behavior: "smooth",  // 平滑过渡
        block:    "start"  // 上边框与视窗顶部平齐。默认值
      });
      this.listBoxState=false;

      let timeId;
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        this.listBoxState=true;
      },200);
    },
    // 监听页面元素滚动，改变导航栏选中
    scrollToTop() {
      // 获取视窗高度
      var domHight = document.body.offsetHeight;
      // dom滚动位置
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

      if (this.listBoxState) {//作用是点击导航栏时，延迟这里执行。
        this.listBox.map((v,i) => {
          // 获取监听元素距离视窗顶部距离
          var offsetTop = document.getElementById(`id${i}`).offsetTop;
          // 获取监听元素本身高度
          var scrollHeight = document.getElementById(`id${i}`).scrollHeight;

          // 如果 dom滚动位置 >= 元素距离视窗距离 && dom滚动位置 <= 元素距离视窗距离+元素本身高度
          // 则表示页面已经滚动到可视区了。
          if (scrollTop >= offsetTop && scrollTop<=(offsetTop+scrollHeight)) {
            // 导航栏背景色选中
            this.navgatorIndex = i;
          }
        })
      }
    },
  },
}
</script>

<style lang='scss' scoped>
  .topDiv{
    height: 100px;
    background: goldenrod;
  }
  .div {
    width: 100%;
    background: #ededed;
    padding-top: 100px;
  }
  .navgator {
    width: 200px;
    position: fixed;
    top: 100px;
    .navgatorLi {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      border-top: none;
      cursor: pointer;
    }
    .isActive {
      color: #fff;
      background: darkseagreen;
    }
  }
  .rightList {
    width: 560px;
    margin-left : 200px;
    li {
      width: 100%;
      height: 700px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
    }
  }
</style>