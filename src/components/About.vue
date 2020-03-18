<template>
  <div v-wechat-title="this.title" class="about">
  <main>
    <div class="article_content" id="llmd">
      <div class="comment_title"><svg t="1565416387972" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1082" width="24" height="24"><path d="M293.0688 755.2c-12.0832 0-24.2688-4.2496-33.9968-12.9024L0 512l273.4592-243.0976C294.5536 250.2144 326.912 252.0064 345.7024 273.152c18.7904 21.1456 16.896 53.504-4.2496 72.2944L154.112 512l172.9536 153.7024c21.1456 18.7904 23.04 51.1488 4.2496 72.2944C321.2288 749.4144 307.1488 755.2 293.0688 755.2zM751.0528 755.0976 1024.512 512l-259.072-230.2976c-21.1456-18.7904-53.504-16.896-72.2432 4.2496-18.7904 21.1456-16.896 53.504 4.2496 72.2944L870.4 512l-187.3408 166.5024c-21.1456 18.7904-23.04 51.1488-4.2496 72.2944C688.896 762.2144 702.976 768 717.056 768 729.1392 768 741.3248 763.7504 751.0528 755.0976zM511.5392 827.648l102.4-614.4c4.6592-27.904-14.1824-54.272-42.0864-58.9312-28.0064-4.7104-54.3232 14.1824-58.88 42.0864l-102.4 614.4c-4.6592 27.904 14.1824 54.272 42.0864 58.9312C455.5264 870.1952 458.2912 870.4 461.1072 870.4 485.6832 870.4 507.392 852.6336 511.5392 827.648z" p-id="1083" fill="#D41C26"></path></svg>关于刘磊</div>
      <div class="error" v-if="this.error">{{ error }} <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i></div>
      <div v-html="aboutMe"></div>
      <div class="comment_title"><svg t="1565416387972" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1082" width="24" height="24"><path d="M293.0688 755.2c-12.0832 0-24.2688-4.2496-33.9968-12.9024L0 512l273.4592-243.0976C294.5536 250.2144 326.912 252.0064 345.7024 273.152c18.7904 21.1456 16.896 53.504-4.2496 72.2944L154.112 512l172.9536 153.7024c21.1456 18.7904 23.04 51.1488 4.2496 72.2944C321.2288 749.4144 307.1488 755.2 293.0688 755.2zM751.0528 755.0976 1024.512 512l-259.072-230.2976c-21.1456-18.7904-53.504-16.896-72.2432 4.2496-18.7904 21.1456-16.896 53.504 4.2496 72.2944L870.4 512l-187.3408 166.5024c-21.1456 18.7904-23.04 51.1488-4.2496 72.2944C688.896 762.2144 702.976 768 717.056 768 729.1392 768 741.3248 763.7504 751.0528 755.0976zM511.5392 827.648l102.4-614.4c4.6592-27.904-14.1824-54.272-42.0864-58.9312-28.0064-4.7104-54.3232 14.1824-58.88 42.0864l-102.4 614.4c-4.6592 27.904 14.1824 54.272 42.0864 58.9312C455.5264 870.1952 458.2912 870.4 461.1072 870.4 485.6832 870.4 507.392 852.6336 511.5392 827.648z" p-id="1083" fill="#D41C26"></path></svg>关于本站</div>
      <div class="error" v-if="this.error">{{ error }} <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i></div>
      <div v-html="aboutWeb"></div>
    </div>
    <Comment :msg="'about'"/>
  </main>
  </div>
</template>

<script>
import Comment from './Comment.vue'
export default {
  data(){
    return{
      aboutMe: '',
      aboutWeb: '',
      error: '数据加载中',
      title: '关于 - about liulei'
    }
  },
  mounted: function() { //钩子函数
    this.get();
  },
  methods: {
    get: function(){
      this.$http.get('https://a.abliulei.com/api/getabout').then(
        function(res){
          let data = res.data.data
          this.error = ''
          this.aboutMe = data[0]['markdown']
          this.aboutWeb = data[1]['markdown']
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

<style scoped>
  @import '../assets/markdown.css';
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about{
  width: 720px;
  /* min-height: calc( 100vh - 238px ); */
}
.error{
  color: #666;
}
.about .comment_title{
  font-size: 16px;
  color: #D41C26;
  font-weight: 500;
  /* border-bottom: 1px solid #ddd; */
  width: 100%;
  /* margin: 15px 0px; */
  line-height: 40px;
  display: flex;
}
.about .comment_title svg{
  margin-top: 8px;
  margin-right: 4px;
}
h1{
  font-size: 16px;
  color: #222;
}
p{
  margin: 5px 0px 10px 0px;
}
</style>
