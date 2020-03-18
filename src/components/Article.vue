<template>
  <div v-wechat-title="this.title">
    <article id="article" class="article">
      <div class="article_error" v-if="this.error">{{ error }} <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i></div>
      <div class="article_title" v-if="this.title != '数据加载中...'">{{ title }}</div>
      <div class="article_time">{{ time }}</div>
      <div class="article_content" id="llmd" v-html="markdown"></div>
      <div class="article_footer">本文由<a href="https://abliulei.com" class="abliulei">abliulei</a>原创。</div>
      <Comment v-if="id" :msg="'article&'+this.id"/>
    </article>
  </div>
</template>

<script>
import Comment from './Comment.vue'

export default {
  data(){
    return{
      id:'',
      title:'数据加载中...',
      time:'',
      markdown:'',
      error: '数据加载中'
    }
  },
  mounted: function() { //钩子函数
    this.get();
  },
  methods: {
    get: function(){
      let id = this.$route.params.id
      this.id = id
      this.$http.get('https://a.abliulei.com/api/getarticlebyid?id='+id).then(
        function(res){
          this.error = ''
          this.title = res.data.data.title;
          this.time = "更新于："+res.data.data.time;
          this.markdown = res.data.data.markdown;
          let app = document.getElementById("app")
          let num = 20
          let myTimer = null;
          myTimer = setInterval(function () {
            app.style.marginTop = num+'vh'
            //如果scroll的滚动值为0，也就是到达了页面顶部，需要停止定时器
            num--;
            if(num==5){
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

  },
  components: {
    Comment    // 第二步：局部注册组件
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/markdown.css';
</style>
<style scoped>
.article{
  width: 720px;
}
.article .article_error{
  color: #666;
  margin: 8px 0px 5px 0px;
}
.article .article_title{
  color: #222;
  font-size: 22px;
  font-weight: 500;
}
.article .article_time{
  margin: 10px 0px;
  font-size: 13px;
  color: #222;
}
.article .article_content{
  /* margin-bottom: 10px; */
}
.article_footer{
  border-left: 3px solid #D41C26;
  text-indent: 8px;
  line-height: 2;
}
.abliulei{
  text-indent: 0;
  margin: 0px 5px;
  display: inline-block;
  color: #666;
}
.abliulei:hover{
  color: #D41C26;
}
</style>
