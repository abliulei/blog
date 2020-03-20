<template>
  <div class="music">
    <div class="console">
      <div class="control">
        <i class="layui-icon layui-icon-left" @click="musicPrev()" title="上一首"></i>
        <i :class="['layui-icon',playOrPause]" @click="musicPlayOrPause()" title="播放"></i>
        <i class="layui-icon layui-icon-right" @click="musicNext()" title="下一首"></i>
        <i :class="['layui-icon', voiceMuted]" @click="musicVoice()" title="静音"></i>
      </div>
      <div class="progress" :title="songTimes">
        <div class="rate" :style="{width: rate +'%'}" :title="songTime"></div>
      </div>
    </div>
    <div class="list">
      <div :class="{'active': nowMusic == index }" v-for="(item, index) in musicList" :key='item.id' @click="playList(index)">
        <span><font>{{index+1}}</font>{{item.name}}</span>
        <span>{{item.singer}}</span>
      </div>
    </div>
    <audio class="audio" v-if="mp3_url" :src="mp3_url"></audio>
  </div>
</template>

<script>
const myTimer=[];
export default {
  data(){
    return{
      error: '数据加载中',
      musicList: [],
      nowMusic: 0,
      rate: 0,
      mp3_url: '',
      is_play: false,
      is_muted: false,
      times: 0,
      time: 0
    }
  },
  mounted: function() { //钩子函数
    this.getMusic();
  },
  methods: {
    getMusic: function(){
      this.$http.get('https://a.abliulei.com/api/getmusic').then(
        function(res){
          let data = res.data.data
          this.musicList = data
          this.mp3_url = this.musicList[0]["url"]
      })
    },
    setAudioUrl: function(){

    },
    musicPlayOrPause: function(){
      this.mp3_url = this.musicList[this.nowMusic]["url"]
      let audio = document.getElementsByClassName("audio")[0]
      let _this = this
      audio.addEventListener('ended', function () {
        _this.musicNext()
      }, false);
      audio.load();
      if(this.is_play){
        audio.pause()
      }else{
        var times
        audio.oncanplay = function(){
          times = audio.duration
          _this.progress(times)
        }
        clearInterval(myTimer[0])
        audio.play()
      }
      _this.is_play = !_this.is_play
    },
    progress: function(times){
      let time = 0
      let _this = this
      this.times = times
      myTimer[0] = setInterval(() => {
        _this.rate = (time/times*100).toFixed(2);
        time++
        _this.time = time
        if(time==times){
          clearInterval(myTimer[0])
        }
      }, 1000);
    },
    musicPrev: function(){
      if(this.nowMusic==0){
        this.nowMusic = this.musicList.length-1
      }else{
        this.nowMusic = this.nowMusic-1
      }
      this.is_play = false
      let audio = document.getElementsByClassName("audio")[0]
      audio.pause()
      this.musicPlayOrPause()
    },
    musicNext: function(){
      if(this.nowMusic==this.musicList.length){
        this.nowMusic = 0
      }else{
        this.nowMusic = this.nowMusic+1
      }
      this.is_play = false
      let audio = document.getElementsByClassName("audio")[0]
      audio.pause()
      this.musicPlayOrPause()
    },
    playList: function(index){
      this.nowMusic = index
      this.is_play = false
      let audio = document.getElementsByClassName("audio")[0]
      audio.pause()
      this.musicPlayOrPause()
    },
    musicVoice: function(){
      let audio = document.getElementsByClassName("audio")[0]
      audio.muted = !audio.muted
      this.is_muted = !this.is_muted
    }
  },
  computed: {
    playOrPause: function(){
      if(this.is_play){
        return 'layui-icon-pause'
      }else{
        return 'layui-icon-play'
      }
    },
    voiceMuted: function(){
      if(this.is_muted){
        return 'layui-icon-mute'
      }else{
        return 'layui-icon-speaker'
      }
    },
    songTimes: function(){
      let minute = Math.floor(this.times / 60)
      if(minute<10){
        minute = "0"+minute
      }
      let second = Math.floor(this.times - (minute * 60))
      if(second<10){
        second = "0"+second
      }
      let times = minute+':'+second
      return times
    },
    songTime: function(){
      let minute = Math.floor(this.time / 60)
      if(minute<10){
        minute = "0"+minute
      }
      let second = Math.floor(this.time - (minute * 60))
      if(second<10){
        second = "0"+second
      }
      let time = minute+':'+second
      return time
    }
  }, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.music{
  width: 260px;
  max-height: 250px;
  background-color: #E6E6E6;
  position: absolute;
  left: 295px;
  top: 25px;
  border-radius: 5px;
}
.music .console{
  width: 260px;
  position: absolute;
  background-color: #E6E6E6;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
.music .console .control{
  display: flex;
  justify-content: space-around;
  margin: 12px 0px;
}
.music .console .control i{
  cursor: url('../assets/hand.png'),auto !important;
  font-size: 18px;
  color: #0a0a0a;
}
.music .console .progress{
  height: 3px;
  background: #ffffff;
  border-radius: 5px;
}
.music .console .progress .rate{
  background: #0a0a0a;
  height: 3px;
  border-radius: 5px;
}
.music .list{
  max-height: 200px;
  margin-top: 50px;
  overflow: auto;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
.music .list div{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  cursor: url('../assets/hand.png'),auto !important;
}
.music .list div span{
  display: flex;
  cursor: url('../assets/hand.png'),auto !important;
}
.music .list div font{
  cursor: url('../assets/hand.png'),auto !important;
  margin-right: 3px;
  margin-top: 1px;
  text-align: center;
  width: 15px;
  display: block;
  overflow: hidden;
}
.music .list div:hover{
  background: #cccccc;
  cursor: url('../assets/hand.png'),auto !important;
}
.music .list .active{
  background: #c0c0c0;
}
</style>
