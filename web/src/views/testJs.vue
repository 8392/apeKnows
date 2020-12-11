<template>
  <div>

  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {
    // this.testFind()
    // this.tetsReduce()
    this.testArr()
  },
  methods: {
    testFind() {
      const arr = [{
        id: 1,
        city: '成都',
        age: 22
      }, {
        id: 2,
        city: '重庆',
        age: 23
      }, {
        id: 3,
        city: '北京',
        age: 26
      }]
      const res = arr.some((curr) => {
        return curr.id === 6
      })
      console.log("res", res)
    },
    tetsReduce() {
      const vaiForm = {
        name: {
          id: 1,
          city: '成都',
          age: 22
        },
        city: {
          id: 2,
          city: '重庆',
          age: 23
        },
        age: {
          id: 3,
          city: '北京',
          age: 26
        },
        father: {
          id: 3,
          city: '北京',
          age: 26
        }
      }
      const query = Object.keys(vaiForm)
      const obj = {
        name: '张三',
        city: '北京',
        father: 'Luis'
      }

      const res = query.reduce((all, curr) => {
        const isAtt = obj.hasOwnProperty(curr)
        if(isAtt)
          all[curr] = obj[curr]
        return all
      }, {})
      console.log("res", res)
    },
    testArr() {
      // const obj = []
      // const res = Array.isArray(obj)
      // console.log(res)
      var arr = ["a", "b", "c"];
      var iterator = arr.entries();
      console.log(iterator.next().value);
    }
  }
}
</script>