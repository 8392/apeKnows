<template>
  <div>
    <!-- <div id="flashit" class="btn" :class="isFirst ? 'red' : 'green'">

    </div> -->
  </div>
</template>

<script>
import { getUser } from "@/api/test";
export default {
  data() {
    return {
      color: "red",
      isFirst: true
    }
  },
  mounted() {
    this.getData()
    // this.getTest()
  },
  methods: {
    getTest() {
      const fn = () => {
        setInterval(() => {
          if(this.isFirst) {
            this.isFirst = false
          }else {
            this.isFirst = true
          }
        }, 200)
      }
      fn()
    },
    async getData() {
      try{
        const res = await getUser()
      }catch(err) {
        console.log("err", err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn{
  float: right;
  height: 40px;
  width: 150px;
  background: #f1f1f1;
  border-radius: 10px;
}
.red{
  background: #f00;
}
.green{
  background: yellowgreen;
}
</style>