<template>
  <main id="link" class="link">
    <span v-for="item in link" :key='item.id'>
      <div class="linklist">
        <img :src='item.image' :alt='item.name'>
        <a :href='item.url' target="_blank" class="linkname">{{item.name}}</a>
        <span>{{ item.title }}</span>
      </div>
    </span>
  </main>
</template>

<script>
export default {
  data(){
    return{
      link:[]
    }
  },
  mounted: function() { //钩子函数
    this.get();
  },
  methods: {
    get: function(){
      this.$http.get('http://admin.abliulei.com/api/getlinklist').then(
        function(res){
          this.link = res.data.data
      })
    },
    search: function(){
      this.get()
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .link{
    width: 100%;
    min-height: calc( 100vh - 265px );
  }
  .linklist{
    display: flex;
    margin-bottom: 20px;
  }
  .linklist img{
    border-radius: 100%;
    width: 22px;
    height: 22px;
  }
  .linkname{
    margin: 0px 8px;
    color: #222;
  }
  .linkname:hover{
    border-bottom: 1px solid #222;
  }
</style>
