<template>
  <div class="page">
    <div class="pagelist prev">
      <i :class="['layui-icon',{'disabled':prevClass}]" @click="prevPage(prev)">&#xe603;</i>
    </div>
    <div class="pagelist now">
      <span>{{ pdata[0]['nowPage'] }}</span>
    </div>
    <div class="pagelist">
      <span>/</span>
    </div>
    <div class="pagelist count">
      <span>{{ pdata[0]['count'] }}</span>
    </div>
    <div class="pagelist next">
      <i :class="['layui-icon',{'disabled':nextClass}]" @click="nextPage(next)">&#xe602;</i>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      prevClass: false,
      nextClass: false,
      layuiIcon: 'layui-icon'
    }
  },
  props: ['pdata'],
  mounted: function() { //钩子函数
    this.resetPage()
  },
  methods: {
    prevPage(num){
      if(!this.prevClass){
        this.$emit('changePage', num) // 用来触发父组件定义的@change-page
        this.resetPage()
      }
    },
    nextPage(num){
      if(!this.nextClass){
        this.$emit('changePage', num) // 用来触发父组件定义的@change-page
        this.resetPage()
      }
    },
    resetPage(){
      if(this.prev == 0){
        this.prevClass = true
      }else{
        this.prevClass = false
      }
      if(this.next > this.pdata[0]["count"]){
        this.nextClass = true
      }else{
        this.nextClass = false
      }
    }
  },
  computed: {
    prev: function(){
      return this.pdata[0]['nowPage'] - 1
    },
    next: function(){
      return this.pdata[0]['nowPage'] + 1
    }
  }, 
  // watch: {
  //   prevClass: function (val) {
  //     console.log(val)
  //   },
  //   nextClass: function (val) {
      
  //   }
  // }
}
</script>
<style scoped>
.page{
  display: flex;
}
.page .pagelist{
  margin: 0px 5px;
}
.prev i,
.next i{
  cursor: url('../assets/hand.png'),auto;
}
.page .pagelist .disabled{
  cursor: not-allowed;
  color: #ccc;
}
</style>
