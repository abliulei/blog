<template>
  <div id="comment" class="comment">
    <div class="comment_title">#发表评论</div>
    <div class="comment_content">
      <div class="comment_userinfo">
        <input type="text" placeholder="昵称">
        <input type="text" placeholder="邮箱">
        <input type="text" placeholder="地址(https://)">
      </div>
      <div class="comment_edit">
        <textarea name="" id="" cols="30" rows="10" placeholder="只接受好评。"></textarea>
      </div>
      <div class="comment_submit">
        <button>提交</button>
      </div>
    </div>
  </div>
</template>

<script>
// var AV = require('leancloud-storage');
// var { Query, User } = AV;
// // 即时通讯服务
// var { Realtime, TextMessage } = require('leancloud-realtime');
export default {
  el:'#comment',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment{
  width: 774px;
}
.comment .comment_title{
  font-size: 16px;
  color: #222;
  font-weight: 500;
  border-bottom: 1px solid #ddd;
  width: 100%;
  margin: 15px 0px;
  line-height: 40px;
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
  margin-top: 15px;
}
.comment .comment_content .comment_submit{
  text-align: right;
}
.comment .comment_content .comment_submit button{
  width: 120px;
  height: 36px;
  background: #333;
  color: #f1f1f1;
  border-radius: 3px;
  border: none;
}
</style>
