<template>
  <div>
    test
    <div @click="clickBtn(2, $event)">点击</div>
    <div :class="isClass">

    </div>
    <input type="text" v-model.lazy="inputVal">
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        name: '111'
      },
      test1: 1,
      isActive: true,
      isClass: [],
      inputVal: ''
    }
  },
  watch: {
    test1(newVal, oldVal) {
      console.log("val", newVal, oldVal)
    },
    data: {
      handler(val, oldVal) {
        // watch深度监听，不能拿到老的值
        // v-if,v-for不能一起使用
        // v-for优先级高
        // multiple
        console.log("val", val, oldVal)
      },
      deep: true,
    }
  },
  mounted() {

  },
  methods: {
    clickBtn(val, event) {
      // console.log("tets", val, event.__proto__.constructor)
      // // this.test1 = 66
      // this.data.name = 666
      // this.isClass = ['isActive']
      const res = this.inputVal
      console.log("res", res)
    }
  }
}
</script>

<style lang="scss" scoped>
.isActive {
  height: 60px;
  width: 180px;
  background: #ccc;
}
</style>