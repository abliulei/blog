import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Article from './components/Article.vue'
import Tag from './components/Tag.vue'
import Link from './components/Link.vue'
import About from './components/About.vue'
import NProgress from 'nprogress' //
import 'nprogress/nprogress.css'
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.config.productionTip = false
Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes: [
      //一个个对象
      { path: '/', component: Home },
      { path: '/article/:id' ,component:Article},
      { path: '/tag', component: Tag },
      { path: '/link', component: Link },
      { path: '/about', component: About }
  ]
});
NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
});
 //当路由进入前
 router.beforeEach((to, from , next) => {
  // 每次切换页面时，调用进度条
 NProgress.start();
 // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
  next();
});
//当路由进入后：关闭进度条
router.afterEach(() => {  
 // 在即将进入新的页面组件前，关闭掉进度条
 NProgress.done()
})
new Vue({
  router: router, //可以简写router
  render: h => h(App),
}).$mount('#app')
