<template>
  <header class="header">
    <h1 class="title">About刘磊</h1>
    <p>{{ msg }}</p>
    <div class="musicPlay" @click="openMusic()" title="打开播放器">
      <i class="layui-icon layui-icon-headset"></i>
      <!-- <svg t="1576990696958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10989" width="18" height="18"><path d="M875.52 433.152q-7.168-1.024-12.8-10.24t-8.704-33.792q-5.12-39.936-26.112-58.88t-65.024-27.136q-46.08-9.216-81.408-37.376t-58.88-52.736q-22.528-21.504-34.816-15.36t-12.288 22.528l0 44.032 0 96.256q0 57.344-0.512 123.904t-0.512 125.952l0 104.448 0 58.368q1.024 24.576-7.68 54.784t-32.768 56.832-64 45.568-99.328 22.016q-60.416 3.072-109.056-21.504t-75.264-61.952-26.112-81.92 38.4-83.456 81.92-54.272 84.992-16.896 73.216 5.632 47.616 13.312l0-289.792q0-120.832 1.024-272.384 0-29.696 15.36-48.64t40.96-22.016q21.504-3.072 35.328 8.704t28.16 32.768 35.328 47.616 56.832 52.224q30.72 23.552 53.76 33.792t43.008 18.944 39.424 20.992 43.008 39.936q23.552 26.624 28.672 55.296t0.512 52.224-14.848 38.4-17.408 13.824z" p-id="10990"></path></svg> -->
    </div>
    <Music :class="['mHide',{'mShow':muiscShow}]" @returnStatus="musicStatus"/>
  </header>
</template>

<script>
import Music from './Music.vue'
export default {
  name: 'Header',
  props: {
    msg: String
  },
  data(){
    return{
      muiscShow: false,
      rot: 0,
      timer: null
    }
  },
  mounted: function() { //钩子函数

  },
  methods: {
    openMusic:function(){
      this.muiscShow = !this.muiscShow
    },
    musicStatus: function(status){
      if(status){
        this.begin()
      }else{
        this.stop()
      }
    },
    begin: function(){
      let _this = this
      _this.timer = setInterval(function(){
        _this.rot += 1;
        document.getElementsByClassName("musicPlay")[0].style.transform = "rotate("+_this.rot+"deg)"
        if(_this.rot == 360){
          _this.rot = 0;
        }
      },60)
    },
    stop: function(){
      clearInterval(this.timer);
      document.getElementsByClassName("musicPlay")[0].style.transform = "rotate(0deg)"
      this.rot = 0;
      this.timer = null
    }
  },
  components:{
    Music
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  width: 100%;
  margin: 0 auto;
  background: transparent;
  display: flex;
  position: relative;
}
.header .title{
  line-height: 50px;
  font-size: 26px;
  font-weight: 500;
  color: #0A0A0A;
}
.header p{
  font-size: 14px;
  margin-top: 20px;
  margin-left: 10px;
  color: #9c9c9c;
}
.header .musicPlay{
  width: 18px;
  height: 18px;
  margin-top: 20px;
  margin-left: 10px;
  color: #9c9c9c;
}
.header .musicPlay i{
  font-size: 18px;
  font-weight: 500;
  color: #0A0A0A;
}
.header .musicPlay i:hover{
  cursor: url('../assets/hand.png'),auto !important;
}
.header .mHide{
  display: none;
}
.header .mShow{
  display: block !important;
}
</style>
