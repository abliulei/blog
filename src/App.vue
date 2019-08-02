<template>
  <div id="app">
    <Header msg="沉淀的越多越觉得自己无知。"/>
    <div class="nav">
      <router-link to="/" class="menu-home" active-class="active" exact>首页</router-link>
      <router-link to="/tag" class="menu-tag" active-class="active">标签</router-link>
      <router-link to="/link" class="menu-link" active-class="active">友链</router-link>
      <router-link to="/about" class="menu-about" active-class="active">关于</router-link>
    </div>
    <router-view></router-view>
    <Footers/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footers from './components/Footers.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footers
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
  font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 14px;
  list-style: none;
  color: #999;
  text-decoration:none;
  cursor: url('./assets/mouse.png'),auto
}
a:hover{
  cursor: url('./assets/hand.png'),auto !important;;
}
#app{
  max-width: 1024px;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  margin-top: 4vh;
  display: flex;
  flex-wrap: wrap;
}
.nav{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0px;
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
  color: #222;
  border-bottom: 1.5px solid #222;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width:12px;
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
</style>
