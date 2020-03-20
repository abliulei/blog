<template>
  <div class="page">
    <div class="pagelist prev">
      <i class="layui-icon" @click="prevPage(prev)">&#xe603;</i>
    </div>
    <div class="pagelist now">
      <span>{{ now }}</span>
    </div>
    <div class="pagelist">
      <span>/</span>
    </div>
    <div class="pagelist count">
      <span>{{ count }}</span>
    </div>
    <div class="pagelist next">
      <i class="layui-icon" @click="nextPage(next)">&#xe602;</i>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      now: this.pdata[0]['nowPage']
      ,count: this.pdata[0]['count']
      ,prev: this.pdata[0]['nowPage'] - 1
      ,next: this.pdata[0]['nowPage'] + 1
    }
  },
  props: ['pdata'],
  mounted: function() { //钩子函数

  },
  methods: {
    nextPage(num){
      this.$emit('changePage', num) // 用来触发父组件定义的@change-num
    },
    prevPage(num){
      this.$emit('changePage', num) // 用来触发父组件定义的@change-num
    }
  },
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
