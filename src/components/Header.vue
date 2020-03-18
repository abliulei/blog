<template>
  <header class="header">
    <h1 class="title">About刘磊</h1>
    <p>{{ msg }}</p>
    <div class="music" @click="play()" @dblclick="next()" title="单击播放，双击换歌，双击别太快...">
      <svg t="1576990696958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10989" width="18" height="18"><path d="M875.52 433.152q-7.168-1.024-12.8-10.24t-8.704-33.792q-5.12-39.936-26.112-58.88t-65.024-27.136q-46.08-9.216-81.408-37.376t-58.88-52.736q-22.528-21.504-34.816-15.36t-12.288 22.528l0 44.032 0 96.256q0 57.344-0.512 123.904t-0.512 125.952l0 104.448 0 58.368q1.024 24.576-7.68 54.784t-32.768 56.832-64 45.568-99.328 22.016q-60.416 3.072-109.056-21.504t-75.264-61.952-26.112-81.92 38.4-83.456 81.92-54.272 84.992-16.896 73.216 5.632 47.616 13.312l0-289.792q0-120.832 1.024-272.384 0-29.696 15.36-48.64t40.96-22.016q21.504-3.072 35.328 8.704t28.16 32.768 35.328 47.616 56.832 52.224q30.72 23.552 53.76 33.792t43.008 18.944 39.424 20.992 43.008 39.936q23.552 26.624 28.672 55.296t0.512 52.224-14.848 38.4-17.408 13.824z" p-id="10990"></path></svg>
      <audio class="audio" v-if="mp3_url" :src="mp3_url"></audio>
    </div>
  </header>
</template>

<script>
var clickTimeId = null
var time = null
export default {
  name: 'Header',
  props: {
    msg: String
  },
  data(){
    return{
      is_play: false,
      rot: 0,
      mp3_url:'',
      // mp3_load: false,
      // is_next: false
    }
  },
  mounted: function() { //钩子函数
    // var time;
    this.getMusic();
    // var mp3 = 'https://a.abliulei.com/music/c2364ca523e207225478ab85fc7e0af0.mp3'
    // var mp3 = new Audio(mp3);
    // mp3.play(); //播放 mp3这个音频对象
  },
  methods: {
    play: function(){
        // 取消上次延时未执行的方法
        clearTimeout(clickTimeId);
        // //执行延时
        let _this = this
        clickTimeId = setTimeout(function() {
          //此处为单击事件要执行的代码
          let audio = document.getElementsByClassName("audio")[0]
          audio.addEventListener('ended', function () {
            // this.stop()
            _this.next()
          }, false);
          if(_this.is_play == true){
            clearInterval(time)
            audio.pause()
            _this.musicRest()
            _this.is_play = false
          }else{
            time = setInterval(_this.begin,60)
            audio.play()
            _this.is_play = true
          }
        }, 333);
    },
    begin: function(){
      this.rot += 1;
      document.getElementsByClassName("music")[0].style.transform = "rotate("+this.rot+"deg)"
      if(this.rot == 360){
        this.rot = 0;
      }
    },
    musicRest: function(){
      document.getElementsByClassName("music")[0].style.transform = "rotate(0deg)"
      this.rot = 0
    },

    getMusic: function(){
      this.$http.get('https://a.abliulei.com/api/getmusic').then(
        function(res){
          let data = res.data.data
          this.mp3_url = data.url
          let music = document.getElementsByClassName("music")[0]
          music.setAttribute("title","当前播放：'"+data.name+"'，单击播放，双击换歌，双击别太快...")
      })
    },
    next: function(){
      // 取消上次延时未执行的方法
      clearTimeout(clickTimeId);
      let _this = this
      setTimeout(function(){
        _this.is_play = false
        _this.getMusic()
        _this.musicRest()
        _this.play()
      },800)
    }
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
  /* border-bottom: 1px solid #ddd; */
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
.header .music{
  width: 18px;
  height: 18px;
  margin-top: 20px;
  margin-left: 10px;
  color: #9c9c9c;
}
.header .music :hover{
  cursor: url('../assets/hand.png'),auto !important;
}
</style>
