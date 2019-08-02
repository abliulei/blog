<template>
  <article id="article" class="article">
    <div class="article_title">{{ title }}</div>
    <div class="article_time">更新于：{{ time }}</div>
    <div class="article_content" v-html="markdown">
    </div>
    <!-- <Comment msg="article"/> -->
  </article>
</template>

<script>
import Comment from './Comment.vue'

export default {
  data(){
    return{
      title:'',
      time:'',
      markdown:''
    }
  },
  mounted: function() { //钩子函数
    this.get();
  },
  methods: {
    get: function(){
      let id = this.$route.params.id
      this.$http.get('http://admin.abliulei.com/api/getarticlebyid?id='+id).then(
        function(res){
          this.title = res.data.data.title;
          this.time = res.data.data.time;
          this.markdown = res.data.data.markdown;
      })
      .catch(function(err){
          // console.log(err);
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
  width: 774px;
  min-height: calc( 100vh - 265px );
}
.article .article_title{
  color: #222;
  font-size: 20px;
  font-weight: 600;
}
.article .article_time{
  margin: 10px 0px;
  font-size: 13px;
  color: #222;
}
</style>
