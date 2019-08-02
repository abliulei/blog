<template>
  <main class="tag">
    <span v-for="item in tags" :key="item.id" :class="item.code">
      {{item.name}}
    </span>
  </main>
</template>

<script>
export default {
  // data:{
  //   active:'NULL',
  //   article:[]
  // },
  data(){
    return{
      tags:[]
    }
  },
  mounted: function() { //钩子函数
    this.get();
  },
  methods: {
    get: function(){
      this.loading = true;
      this.$http.get('http://admin.abliulei.com/api/getTagList').then(
        function(res){
          this.tags = res.data.data;
      })
    },
    search: function(){
      this.get();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tag{
  width: 100%;
  min-height: calc( 100vh - 265px );
}
.h1,.h2,.h3,.h4,.h5{
  display: inline-block;
  padding: 15px;
  font-weight: 600; 
  color: #222;
  font-family: Arial, Helvetica, sans-serif;
}
.h1{
    font-size: 24px;
    line-height: 24px;
}
.h2{
    font-size: 20px;
    line-height: 20px;
}
.h3{
    font-size: 16px;
    line-height: 18px;
}
.h4{
    font-size: 14px;
    line-height: 16px;
}
.h5{
    font-size: 12px;
    line-height: 14px;
}
</style>
