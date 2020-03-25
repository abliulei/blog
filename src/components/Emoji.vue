<template>
  <div class="emoji">
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('kaixin')" title="开心">
      <use xlink:href="#icon-kaixin"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('huaihuai')" title="坏坏">
      <use xlink:href="#icon-huaihuai"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('meiyan')" title="媚眼">
      <use xlink:href="#icon-meiyan"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('huachi')" title="花痴">
      <use xlink:href="#icon-huachi"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('zhenjing')" title="震惊">
      <use xlink:href="#icon-zhenjing"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('haha')" title="哈哈">
      <use xlink:href="#icon-haha"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('daxiao')" title="大笑">
      <use xlink:href="#icon-daxiao"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('xinshang')" title="欣赏">
      <use xlink:href="#icon-xinshang"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('shiwang')" title="失望">
      <use xlink:href="#icon-shiwang"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('shangxin')" title="伤心">
      <use xlink:href="#icon-shangxin"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('haipa')" title="害怕">
      <use xlink:href="#icon-haipa"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('tanshui')" title="贪睡">
      <use xlink:href="#icon-tanshui"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('keai')" title="可爱">
      <use xlink:href="#icon-keai"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('xiangwen')" title="香吻">
      <use xlink:href="#icon-xiangwen"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('foxi')" title="佛系">
      <use xlink:href="#icon-foxi"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('shengqi')" title="生气">
      <use xlink:href="#icon-shengqi"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('caimi')" title="财迷">
      <use xlink:href="#icon-caimi"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('zhengjing')" title="正经">
      <use xlink:href="#icon-zhengjing"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('yun')" title="晕">
      <use xlink:href="#icon-yun"></use>
    </svg>
    <svg class="emoji-icon" aria-hidden="true" @click="submitEmoji('guli')" title="鼓励">
      <use xlink:href="#icon-guli"></use>
    </svg>
  </div>
</template>

<script>
import '../assets/emoji.js';
export default {
  data(){
    return{
      
    }
  },
  props: {
    msg: String
  },
  mounted: function() { //钩子函数
  
  },
  methods: {
    submitEmoji: function(code){
        this.$emit('changeEmoji', code) // 用来触发父组件定义的@change-page
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
<style scoped>
.emoji{
  position: absolute;
  left: 80px;
  top: 8px;
  width: 225px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #e6e6e6;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
.emoji .emoji-icon{
  width: 25px;
  height: 25px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: 20px;
  margin: 10px;
  cursor: url('../assets/hand.png'),auto !important;
}
.emoji .emoji-icon {
  cursor: url('../assets/hand.png'),auto !important;
}
</style>
