<template>
  <div ref="searchBar" id="app">
    <Header msg="读万卷书，行万里路"/>
    <div class="nav">
      <router-link to="/" class="menu-home" active-class="active" exact>首页</router-link>
      <router-link to="/tag" class="menu-tag" active-class="active">标签</router-link>
      <router-link to="/link" class="menu-link" active-class="active">友链</router-link>
      <router-link to="/about" class="menu-about" active-class="active">关于</router-link>
    </div>
    <router-view></router-view>
    <Footer/>
    <transition name="fade">
      <div class="return_top" v-if="top" @click="returnTop()" @mouseover="over($event)" @mouseout="out($event)">
        <i class="layui-icon">&#xe619;</i>   
      </div>
    </transition>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import click from './assets/click.js'
export default {
  name: 'app',
  data(){
    return{
      top:false
    }
  },
  components: {
    Header,
    Footer
  },
  mounted: function() { //钩子函数
    this.pv()
    this.appload()
    this.box = this.$refs.searchBar
      // console.log(this.box.offsetHeight)
    // 监听这个dom的scroll事件
    window.addEventListener('scroll', this.returnTopShow)
  },
  methods: {
    returnTopShow: function(){
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        
      if(scrollTop>200){
        this.top = true;
      }else{
        this.top = false;
      }
    },
    pv: function(){
      this.$http.get('https://a.abliulei.com/api/abliulei').then(
        function(){
          
      })
    }
    ,appload(){
      
    }
    ,returnTop: function(){
      let speed = 150;//定义一个速度，即每隔30毫秒走多少px
      let myTimer = null;
      myTimer = setInterval(function () {
          // console.log(document.documentElement.scrollTop)
          document.documentElement.scrollTop = document.documentElement.scrollTop - speed;
          //如果scroll的滚动值为0，也就是到达了页面顶部，需要停止定时器
          if(document.documentElement.scrollTop==0){
              clearInterval(myTimer)
          }
      },30)
    }
    ,over: function(){
      // console.log(event)
      // event.style("css","transform:rotate(360deg)")
    }
    ,out: function(){
      // console.log(event)
    }
  }
  ,compiled: function(){
    this.appload();
  }
}
</script>

<style>
#nprogress .bar {
  background: #222 !important;
}
*{
  margin: 0;
  padding: 0;
  font-family: Consolas,Monaco,Tahoma,"Helvetica Neue",Helvetica,"Lucida Grande","Lantinghei SC","Open Sans","Microsoft YaHei",sans-serif !important;
  font-size: 14px;
  text-decoration: none;
  cursor: url('./assets/mouse.png'),auto;
}
a:hover{
  cursor: url('./assets/hand.png'),auto !important;
}
#app{
  max-width: 984px;
  margin: 5vh auto;
  padding: 20px;
  /* margin-top: 4vh; */
  display: flex;
  flex-wrap: wrap;
}
/* @media screen and (min-height: 100vh){
  #app{
    margin: 5vh auto;
  }
} */
.nav{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
}
.nav a{
  margin-right: 15px;
  font-size: 14px;
  transition-property: border-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
  color: #666;
  line-height: 20px;
  padding-bottom: 1.5px;
}
.nav .active{
  color: #D41C26;
  border-bottom: 1.5px solid #D41C26;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width:10px;
  background-color: #f0f0f0;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 2px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius:10px;
  background:#999;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 2s;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 2s;
}
.return_top{
  width: 30px;
  height: 30px;
  position: fixed;
  right: calc( 50vw - 380px );
  bottom: 15vh;
}
.return_top :hover{
  cursor: url('./assets/hand.png'),auto !important;
}
.return_top i{
  font-size: 30px; 
  color: #222;
}
/** 
  鼠标单击效果
*/
.text-popup {
    animation: textPopup 1s;
    color: #D41C26;
    user-select: none;
    white-space: nowrap;
    position: absolute;
    z-index: 99;
}
@keyframes textPopup {
    0%, 100% {
        opacity: 0;
    }
    5% {
        opacity: 1;
    }
    100% {
        transform: translateY(-50px);    
    }
}
</style>
