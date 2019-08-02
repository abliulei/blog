<template>
  <main class="about">
    <div class="article_content" v-html="about">
      
    </div>
  </main>
</template>

<script>
export default {
  data(){
    return{
      about: ''
    }
  },
  mounted: function() { //钩子函数
    this.get();
  },
  methods: {
    get: function(){
      this.$http.get('http://admin.abliulei.com/api/getabout').then(
        function(res){
          this.about = res.data.data.markdown;
      })
    },
    search: function(){
        this.get();
    }

  }
}
</script>

<style scoped>
  @import '../assets/markdown.css';
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about{
  width: 100%;
  min-height: calc( 100vh - 265px );
}
h1{
  font-size: 16px;
  color: #222;
}
p{
  margin: 5px 0px 10px 0px;
}
</style>
