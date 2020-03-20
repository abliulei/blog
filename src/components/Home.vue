<template>
  <div v-wechat-title="this.title" class="main">
    <main id="home">
      <div class="error" v-if="this.error">{{ error }} <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i></div>
      <div class="article">
        <span>[置顶广告]</span>
        <span>1970-01-01</span>
        <a href="https://abliulei.com/tool" target="_blank">在线小工具</a>
      </div>
      <div v-for="(item,index) in article" class="article" :key='item.id' v-if="index < (pageData[0]['nowPage']*showNum) && index > ((pageData[0]['nowPage']-1)*showNum)-1">
        <span>[{{ item.name }}]</span>
        <span>{{ item.time }}</span>
        <router-link :to="'/article/'+item.id" >{{ item.title }}</router-link>
      </div>
      {{pageData}}
      <!-- <Page v-if="count" :msg="'count='+this.count+'&nowpage='+this.nowPage" @changePage="updateNowpage" /> -->
      <Page v-if="pageData[0]['count']" v-bind:pdata="pageData" @changePage="updateNowpage" />
    </main>
  </div>
</template>

<script>
import Page from './Page.vue'

export default {
  data(){
    return{
      active: 'NULL',
      article: [],
      error: '数据加载中',
      title: '刘磊 - 读万卷书，行万里路',
      // count: 0,
      // nowPage: 1,
      showNum: 5,
      pageData: [
        {'count': 0,'nowPage': 1}
      ]
    }
  },
  mounted: function() { //钩子函数
    this.get();
  },
  methods: {
    get: function(){
      this.$http.get('https://a.abliulei.com/api/getarticlelist').then(
        function(res){
          this.article = res.data.data;
          this.error = ''
          this.pageData[0]['count'] = Math.ceil(res.data.data.length / this.showNum)
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
    }, 
    updateNowpage(type) { // type是子组件$emit传递的参数
      this.pageData[0]['nowPage'] = type
      console.log(this.pageData)
      this.get()
    }
  },
  components: {
    Page    // 第二步：局部注册组件
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  width: 720px;
}
.main span{
  width: 100%;
  margin: 0px 10px 0px 0px;
}
.main .article{
  width: 100%;
  margin: 20px 0px;
}
.main .article a{
  overflow-wrap: break-word;
  word-wrap: break-word;
  font-weight: 600;
  /* font-weight: bold; */
  /* font-size: 16px; */
  color: #000;
  /* margin: 8px 0px; */
  cursor: pointer;
}
.main .article a:hover{
  color: #D41C26;
  border-bottom: 2px solid #D41C26;
}
.main .error{
  color: #666;
  margin: 8px 0px 5px 0px;
}
</style>
