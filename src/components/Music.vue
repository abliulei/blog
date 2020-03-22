<template>
  <div class="music">
    <div class="console">
      <div class="control">
        <i class="layui-icon layui-icon-left" @click="musicPrev()" title="上一首"></i>
        <i :class="['layui-icon',playOrPause]" @click="musicPlayOrPause()" :title="playOrPauseWords"></i>
        <i class="layui-icon layui-icon-right" @click="musicNext()" title="下一首"></i>
        <i :class="['layui-icon', voiceMuted]" @click="musicVoice()" :title="voiceMutedWords"></i>
      </div>
      <div class="progress" :title="songTimes">
        <div class="rate" :style="{width: rate +'%'}" :title="songTime"></div>
        <div class="point" :style="{left: rate +'%'}" :title="songTime"></div>
      </div>
    </div>
    <div class="list">
      <div :class="{'active': nowMusic == index }" v-for="(item, index) in musicList" :key='item.id' @click="playList(index)">
        <span><font>{{index+1}}</font>{{item.name}}</span>
        <span>{{item.singer}}</span>
      </div>
    </div>
    <audio class="audio" v-if="mp3_url" :src="mp3_url" preload></audio>
  </div>
</template>

<script>
export default {
  data(){
    return{
      error: '数据加载中',
      musicList: [],
      nowMusic: 0,
      rate: 0, //进度，百分数
      mp3_url: '',
      is_play: false,
      is_muted: false,
      times: 0, //总秒数
      time: 0,  //已经播放秒数
      myTimer: null
    }
  },
  mounted: function() { //钩子函数
    // clearInterval(this.timer)
    this.getMusic();
  },
  methods: {
    /**
     * 初始获取播放列表
    */
    getMusic: function(){
      this.$http.get('https://a.abliulei.com/api/getmusic').then(
        function(res){
          let data = res.data.data
          this.musicList = data
          this.mp3_url = this.musicList[0]["url"]
      })
    },
    /**
     * 播放或者暂停
    */
    musicPlayOrPause: function(){
      let _this = this
      let audio = document.getElementsByClassName("audio")[0]
      if(_this.is_play){
        //暂停
        _this.progress(_this.time,_this.times,0)  //进度条暂停
        audio.pause()
      }else{
        //判断是不是重新播放，如果进度条是0就需要加载新的
        if(_this.time == 0){
          audio.addEventListener('ended', function () {
            _this.musicNext()
          }, false);
          audio.load()
          audio.oncanplay = function(){
            _this.times = audio.duration
          }
        }
        //恢复进度条，播放
        _this.progress(_this.time,_this.times,1)
        audio.play()
      }
      _this.is_play = !_this.is_play
      _this.returnStatus(_this.is_play) //返回播放状态
    },
    /**
     * 控制进度条
     * time   当前已经播放的秒数
     * times  音乐总时长
     * type   0暂停播放，1开始播放
    */
    progress: function(time,times,type){
      let _this = this
      clearInterval(_this.timer)
      _this.timer = null
      if(type === 1){
        _this.time = time
        _this.times = times
        _this.timer = setInterval(() => {
          _this.rate = (_this.time/_this.times*100).toFixed(2);
          _this.time ++
          if(_this.time == _this.times){
            clearInterval(_this.timer)
            _this.timer = null
          }
        }, 1000);
      }
    },
    /**
     * 上一首
    */
    musicPrev: function(){
      // 默认循环播放，如果当前在第一首直接播放最后一首
      if(this.nowMusic==0){
        this.nowMusic = this.musicList.length-1
      }else{
        this.nowMusic = this.nowMusic-1
      }
      this.is_play = false
      this.time = 0
      this.rate = 0
      this.playMusic()
    },
    /**
     * 下一首
    */
    musicNext: function(){
      // 默认循环播放，如果当前在最后一首直接播放第一首
      if(this.nowMusic == this.musicList.length){
        this.nowMusic = 0
      }else{
        this.nowMusic = this.nowMusic+1
      }
      this.is_play = false
      this.time = 0
      this.rate = 0
      this.playMusic()
    },
    /**
     * 播放列表里的歌
    */
    playList: function(index){
      this.nowMusic = index
      this.is_play = false
      this.time = 0
      this.rate = 0
      this.playMusic()
    },
    /**
     * 播放音频
    */
    playMusic: function(){
      let _this = this
      let audio = document.getElementsByClassName("audio")[0]
      _this.mp3_url = _this.musicList[_this.nowMusic]["url"]
      //延迟200毫秒执行否则播放失败
      setTimeout(function(){
        audio.addEventListener('ended', function () {
          _this.musicNext()
        }, false);
        audio.load()
        audio.oncanplay = function(){
          _this.times = audio.duration
          _this.progress(_this.time,_this.times,1)
        }
        audio.play()
        _this.is_play = true
        _this.returnStatus(_this.is_play) //返回播放状态
      },200)
    },
    musicVoice: function(){
      let audio = document.getElementsByClassName("audio")[0]
      audio.muted = !audio.muted
      this.is_muted = !this.is_muted
    },
    /**
     * 返回播放状态
    */
    returnStatus: function(){
      let _this = this
      setTimeout(function(){
        _this.$emit('returnStatus', _this.is_play) // 用来触发父组件定义的@change-page
      },200)
    }
  },
  computed: {
    //播放暂停按钮样式切换
    playOrPause: function(){
      if(this.is_play){
        return 'layui-icon-pause'
      }else{
        return 'layui-icon-play'
      }
    },
    //播放暂停按钮文字切换
    playOrPauseWords: function(){
      if(this.is_play){
        return '暂停'
      }else{
        return '播放'
      }
    },
    //喇叭静音和播放样式切换
    voiceMuted: function(){
      if(this.is_muted){
        return 'layui-icon-mute'
      }else{
        return 'layui-icon-speaker'
      }
    },
    //喇叭静音和播放文字切换
    voiceMutedWords: function(){
      if(this.is_muted){
        return '恢复音量'
      }else{
        return '静音'
      }
    },
    //当前播放歌曲总时间转换00：00
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
    //当前播放歌曲的当前播放时间转换00：00
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
  overflow: hidden;
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
  position: relative;
  display: flex;
}
.music .console .progress .rate{
  background: #0a0a0a;
  height: 3px;
  border-radius: 5px;
}
.music .console .progress .point{
  width: 5px;
  height: 5px;
  background: #0a0a0a;
  border-radius: 50%;
  position: absolute;
  top: -1px;
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
