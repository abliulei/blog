<template>
  <main id="home" class="main">
    <div v-for="item in article" class="article">
      <span>[ {{ item.name }} ]</span>
      <span>{{ item.time }}</span>
      <router-link :to="'/article/'+item.id" >{{ item.title }}</router-link>
    </div>
  </main>
</template>

<script>
export default {
  data(){
    return{
      active:'NULL',
      article:[]
    }
  },
  mounted: function() { //钩子函数
    this.get();
  },
  methods: {
    get: function(){
      this.$http.get('http://admin.abliulei.com/api/getarticlelist').then(
        function(res){
          this.article = res.data.data;
          console.log(this.article);
      })
      .catch(function(err){
          // console.log(err);
      })
    },
    search: function(){
        this.get();
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  width: 100%;
  min-height: calc( 100vh - 265px );
}
.main span{
  width: 100%;
  margin: 0px 10px 10px 0px;
}
.main .article{
  width: 100%;
  margin-bottom: 20px;
}
.main .article a{
  overflow-wrap: break-word;
  word-wrap: break-word;
  font-weight: 500;
  font-weight: bold;
  font-size: 16px;
  color: #555;
  margin: 8px 0px;
  cursor: pointer;
}
.main .article a:hover{
  border-bottom: 2px solid #555;
}
</style>
