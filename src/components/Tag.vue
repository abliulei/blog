<template>
  <div v-wechat-title="this.title" class="tag">
  <main>
    <div class="error" v-if="this.error">{{ error }} <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i></div>
    <span v-for="item in tags" :key="item.id" :class="item.code">
      {{item.name}}
    </span>
  </main>
    <div class="count">
      当前共<span>{{ num }}</span>个标签
    </div>
  </div>
</template>

<script>
export default {
  // data:{
  //   active:'NULL',
  //   article:[]
  // },
  data(){
    return{
      tags:[],
      title: '标签 - more and more',
      error: '数据加载中',
      num: 0
    }
  },
  mounted: function() { //钩子函数
    this.get();
  },
  methods: {
    get: function(){
      this.loading = true;
      this.$http.get('https://a.abliulei.com/api/getTagList').then(
        function(res){
          this.tags = res.data.data;
          this.error = ''
          this.num = res.data.data.length;
          let app = document.getElementById("app")
          let num = 5
          let myTimer = null;
          myTimer = setInterval(function () {
            app.style.marginTop = num+'vh'
            //如果scroll的滚动值为0，也就是到达了页面顶部，需要停止定时器
            num++;
            if(num==20){
                clearInterval(myTimer)
            }
          },30)
      },function(){
          this.error = '服务器无响应，即将刷新页面...';
          let timer = setTimeout(function(){
            location.reload()
          },2000);
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
  width: 720px;
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
    /* color: rgb(212,28,38); */
}
.h2{
    font-size: 20px;
    line-height: 20px;
    /* color: rgb(222,38,48); */
}
.h3{
    font-size: 16px;
    line-height: 18px;
    /* color: rgb(234,48,58); */
}
.h4{
    font-size: 14px;
    line-height: 16px;
    /* color: rgb(242,58,68); */
}
.h5{
    font-size: 12px;
    line-height: 14px;
    /* color: rgb(252,68,78); */
}
.count{
  margin: 5px 0px;
  border-left: 2px solid #D41C26;
  text-indent: 6px;
  color: #555;
}
.count span{
  font-size: 20px;
  margin: 0px 5px;
  color: #000;
}
.error{
  color: #666;
  margin: 8px 0px 5px 0px;
}
</style>
