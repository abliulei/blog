<template>
  <div class="comment">
    <div class="comment_title"><svg t="1565416387972" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1082" width="24" height="24"><path d="M293.0688 755.2c-12.0832 0-24.2688-4.2496-33.9968-12.9024L0 512l273.4592-243.0976C294.5536 250.2144 326.912 252.0064 345.7024 273.152c18.7904 21.1456 16.896 53.504-4.2496 72.2944L154.112 512l172.9536 153.7024c21.1456 18.7904 23.04 51.1488 4.2496 72.2944C321.2288 749.4144 307.1488 755.2 293.0688 755.2zM751.0528 755.0976 1024.512 512l-259.072-230.2976c-21.1456-18.7904-53.504-16.896-72.2432 4.2496-18.7904 21.1456-16.896 53.504 4.2496 72.2944L870.4 512l-187.3408 166.5024c-21.1456 18.7904-23.04 51.1488-4.2496 72.2944C688.896 762.2144 702.976 768 717.056 768 729.1392 768 741.3248 763.7504 751.0528 755.0976zM511.5392 827.648l102.4-614.4c4.6592-27.904-14.1824-54.272-42.0864-58.9312-28.0064-4.7104-54.3232 14.1824-58.88 42.0864l-102.4 614.4c-4.6592 27.904 14.1824 54.272 42.0864 58.9312C455.5264 870.1952 458.2912 870.4 461.1072 870.4 485.6832 870.4 507.392 852.6336 511.5392 827.648z" p-id="1083" fill="#D41C26"></path></svg>发表评论</div>
    <!-- <form class="layui-form"> -->
    <div class="comment_content">
        <div class="comment_userinfo">
          <input type="text" name="username" @focus="input_focus($event)" @blur="input_blur($event)" placeholder="昵称" >
          <input type="text" name="email" @focus="input_focus($event)" @blur="input_blur($event)" placeholder="邮箱">
          <input type="text" name="url" @focus="input_focus($event)" @blur="input_blur($event)" placeholder="地址(https://)">
        </div>
        <div class="comment_edit">
          <textarea name="content" id="comment-info" cols="30" rows="10" placeholder="只接受好评。"></textarea>
        </div>
        <div class="comment_submit">
          <div class="comment_control">
            <a href="https://abliulei.com/markdown" target="_blank" class="zhichi_md">
              <svg t="1576509244954" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1715" width="28" height="28"><path d="M895.318 192 128.682 192C93.008 192 64 220.968 64 256.616l0 510.698C64 802.986 93.008 832 128.682 832l766.636 0C930.992 832 960 802.986 960 767.312L960 256.616C960 220.968 930.992 192 895.318 192zM568.046 704l-112.096 0 0-192-84.08 107.756L287.826 512l0 192L175.738 704 175.738 320l112.088 0 84.044 135.96 84.08-135.96 112.096 0L568.046 704 568.046 704zM735.36 704l-139.27-192 84 0 0-192 112.086 0 0 192 84.054 0-140.906 192L735.36 704z" p-id="1716" fill="#333333"></path></svg>
            </a>
            <i class="layui-icon" @click="showEmoji()">&#xe650;</i>
          </div>
          <button @click="submit();">提交</button>
          <Emoji v-if="isEmoji" @changeEmoji="addEmoji" />
        </div>
    </div>
    <div class="error" v-if="this.error">{{ error }} <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i></div>
    <div class="tips" v-if="this.tips">{{ tips }}</div>
    <div class="count" v-if="this.count">当前共<font>{{ count }}</font>条评论</div>
    <!-- </form> -->
    <div class="comment_list" id="llmd">
      <div class="clist_u" v-for="item in comments" :key='item.id'>
        <img class="cuimg" :src="item.avatar">
        <div class="curight" @mouseover="replay_mouseover($event)" @mouseout="replay_mouseout($event)">
          <a :href="item.url" class="cuname" target="_blank">{{ item.username }}</a>
          <div class="cuinfo">
            <div class="cudate">
              <span>{{ item.addtime }}</span>
              <span class="replay" @mouseover="replay_mouseover_s($event)" @click="replay(item.id,item.username)">回复</span>
            </div>
            <div class="cucontent" v-html="item.md"></div>
            <template v-if="item.son">
              <div class="cureplay">
                <div v-for="son in item.son" :key="son.id" class="clist_u">
                  <img class="cuimg" :src="son.avatar">
                  <div class="curight_sm">
                    <a :href="son.url" target="_blank" class="cuname">{{ son.username }}</a>
                    <div class="cuinfo">
                      <div class="cudate">
                        <span>{{ son.addtime }}</span>
                        <span class="replay" @mouseover="replay_mouseover_s($event)" @click="replay_son(item.id,son.username)">回复</span>
                      </div>
                      <div class="cucontent" v-html="son.md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <input type="hidden" name="comment_id">
      <input type="hidden" name="father_username">
    </div>
  </div>
</template>

<script>
import '../assets/emoji.js';
import Emoji from './Emoji.vue'
export default {
  data(){
    return{
      error: '评论加载中',
      tips: '',
      count: '',
      comments: [],
      type: '',
      id: '',
      isEmoji: false,
      eee: '<svg class="emoji-icon" aria-hidden="true" title="开心"><use xlink:href="#icon-kaixin"></use></svg>'
    }
  },
  props: {
    msg: String
  },
  mounted: function() { //钩子函数
    this.comment(this.msg);
    layui.use(['form','layer'], function(){
      var form = layui.form
        ,layer = layui.layer
        // form.on('submit(comment)',function(data){
          // layer.msg(JSON.stringify(data.field))
          // return false;
        // });
    });
  },
  methods: {
    input_focus: function(event){
      event.currentTarget.className = 'active'
    },
    input_blur: function(){
      event.currentTarget.className = ''
    },
    replay_mouseover: function(event){
      var replay = event.target.getElementsByClassName("replay");
      // console.log(replay)
      for (var i=0;i<replay.length;i++)
      {   
        replay[i].style.display = "block"; 
      }
    },
    replay_mouseout: function(event){
      var replay = event.target.getElementsByClassName("replay");
      for (var i=0;i<replay.length;i++)
      {   
        replay[i].style.display = "none"; 
      }
    },
    replay_mouseover_s: function(event){
      event.target.style.display = "block"
    },
    replay: function(id,name){
      let input = document.getElementsByTagName("input")
      input.comment_id.value = id
      let textarea = document.getElementsByTagName("textarea")[0]
      textarea.placeholder = "@"+name
      event.target.style.display = "block"
    },
    replay_son: function(id,name){
      let input = document.getElementsByTagName("input")
      input.comment_id.value = id
      input.father_username.value = name
      let textarea = document.getElementsByTagName("textarea")[0]
      textarea.placeholder = "@"+name
      event.target.style.display = "block"
    },
    comment: function(data){
      let storage = window.localStorage;
      let input = document.getElementsByTagName("input")
      let username = storage.getItem("username");
      let email = storage.getItem("email");
      let url = storage.getItem("url");
      input.username.value = username
      input.email.value = email
      input.url.value = url
      let arr= new Array(); //定义一数组
      let param = null;
      arr = data.split("&"); //字符分割
      if(arr[1]){
        param = 'id='+arr[1]+'&type='+arr[0];
        this.type = arr[0];
        this.id = arr[1];
      }else{
        param = 'type='+arr[0];
        this.type = arr[0];
      }
      this.$http.get('https://a.abliulei.com/api/getcomment?'+param).then(
        function(res){
          // console.log(res.data.data.length)
          this.comments = res.data.data
          this.error = ''
          if(res.data.data.length==0){
            this.tips = '沙发还空着呢，快来评论鸭~'
          }else{
            this.count = res.data.data.length
          }
        },function(){
          this.error = '服务器无响应，即将刷新页面...';
          setTimeout(function(){
            this.get();
          },2000);
        })
    },
    submit: function(){
        let input = document.getElementsByTagName("input")
        if(Object.keys(input.username.value).length === 0){
          layer.msg("请输入昵称~");
          return false;
        }
        if(Object.keys(input.email.value).length === 0){
          layer.msg("请输入邮箱~");
          return false;
        }
        let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(mailReg.test(input.email.value) === false){
          layer.msg("邮箱格式不对~");
        }
        let urlReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
        if(Object.keys(input.url.value).length != 0 && urlReg.test(input.url.value) === false){
          layer.msg("网址格式不对~");
        }
        let textarea = document.getElementsByTagName("textarea");
        if(Object.keys(textarea.content.value).length === 0){
          layer.msg("请输入评论~");
          return false;
        }
        // let data = [];
        // data.username = input.username.value
        // data.email = input.email.value
        // data.url = input.url.value
        // data.content = textarea.content.value
        // data.type = this.type
        // data.id = this.id
        // console.log(data)
        // let datas = JSON.stringify(data)
        let loading = layer.load(1,{shade:0.5,time:0});
        this.$http.post('https://a.abliulei.com/api/sendComment',{'username':input.username.value,'email':input.email.value,'url':input.url.value,'content':textarea.content.value,'type':this.type,'article_id':this.id,'comment_id':input.comment_id.value,'father_username':input.father_username.value},{emulateJSON:true}).then(
            function(res){
              let storage = window.localStorage;
              storage.setItem("username",input.username.value);
              storage.setItem("email",input.email.value);
              storage.setItem("url",input.url.value);
              layer.close(loading);
              if(res.data.code==200){
                layer.msg("评论成功！")
              }else{
                layer.msg("评论失败！")
              }
              textarea.content.value = ''
              this.comment(this.msg);
              return false;
            }
        )
    },
    showEmoji: function(){
      this.isEmoji = !this.isEmoji
    },
    addEmoji: function(code){
      let info = document.getElementById("comment-info")
      document.getElementById("comment-info").value = info.value+'&#'+code+'&#'
      info.focus();
    }
  },
  components: {
    Emoji    // 第二步：局部注册组件
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/markdown.css';
</style>
<style scoped>
.emoji-icon{
  width: 25px;
  height: 25px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: 20px;
  margin: 10px;
  cursor: url('../assets/hand.png'),auto !important;
}
.error,.tips,.count{
  color: #666;
  margin-top: 10px;
}
.count font{
  margin: 0px 3px;
  font-size: 18px;
  font-weight: 600;
}
.comment{
  width: 100%;
}
.comment .comment_title{
  font-size: 16px;
  color: #D41C26;
  font-weight: 500;
  /* border-bottom: 1px solid #ddd; */
  width: 100%;
  margin: 15px 0px;
  line-height: 40px;
  display: flex;
}
.comment .comment_title svg{
  margin-top: 8px;
  margin-right: 4px;
}
.comment .comment_content{
  border: 1px solid #efefef;
  border-radius: 5px;
  padding: 10px 15px;
}
.comment .comment_content .comment_userinfo input{
  width: calc( 100% / 3 );
  height: 45px;
  resize: none;
  outline: none;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 13px;
  text-indent: 6px;
}
.comment .comment_content .comment_userinfo .active{
  /* color: #D41C26; */
  border-bottom: 1px solid #D41C26;
}
input::-webkit-input-placeholder{
  color: #999;
}
input::-moz-placeholder{
  color: #999;
}
textarea::-webkit-input-placeholder{
  color: #999;
}
textarea::-moz-placeholder{
  color: #999;
}
.comment .comment_content .comment_edit textarea{
  width: 100%;
  resize: none;
  outline: none;
  border: none;
  margin: 15px 0px;
}
.comment .comment_content .comment_submit{
  display: flex;
  justify-content: space-between;
  position: relative;
  /* text-align: right; */
}
.comment .comment_content .comment_submit .comment_control{
  display: flex;
}
.comment .comment_content .comment_submit .comment_control i{
  margin: 8px 0px 0px 5px;
  font-weight: 600;
  font-size: 18px;
  cursor: url('../assets/hand.png'),auto !important;
}
.comment .comment_content .comment_submit .comment_control .zhichi_md{
  margin-top: 3px;
  width: 28px;
  height: 28px;
}
.comment .comment_content .comment_submit .comment_control .zhichi_md :hover{
  cursor: url('../assets/hand.png'),auto !important;
}
.comment .comment_content .comment_submit button{
  width: 120px;
  height: 36px;
  background: #333;
  color: #f1f1f1;
  border-radius: 3px;
  border: none;
  cursor: url('../assets/hand.png'),auto !important;
}
.comment_list{
  margin-top: 20px;
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
}
.comment_list .clist_u{
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}
.comment_list .clist_u .cuimg{
  width: 70px;
  height: 70px;
  border-radius: 35px;
}
.comment_list .clist_u .curight,.comment_list .clist_u .curight_sm{
  width: calc( 100% - 90px );
  padding: 0px 10px 10px 10px;
}
.comment_list .clist_u .curight .cuname{
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  font-weight: 600;
  color: #222 !important;
  cursor: url('../assets/hand.png'),auto;
  text-decoration: none !important;
}
.comment_list .clist_u .curight .cuname:hover{
  color: #D41C26 !important;
  cursor: url('../assets/hand.png'),auto !important;
  border-bottom: 1px solid #D41C26;
}
.comment_list .clist_u .curight .cuinfo .cudate{
  height: 25px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  color: #9c9c9c;
}
.comment_list .clist_u .curight .cuinfo .cucontent{
  width: calc( 100% - 0px );
  overflow: auto;
  line-height: 1.8;
}
.comment_list .clist_u .curight .cuinfo .cureplay .curight{
  width: calc( 100% - 80px );
  padding: 0px 0px 10px 10px;
}
.replay{
  cursor: url('../assets/hand.png'),auto;
  display: none;
}
</style>
