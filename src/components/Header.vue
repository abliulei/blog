<template>
  <header class="header">
    <h1 class="title">About刘磊</h1>
    <p>{{ msg }}</p>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  width: 100%;
  margin: 0 auto;
  background: transparent;
}
.header .title{
  line-height: 50px;
  font-size: 28px;
  font-weight: 600;
  color: #0A0A0A;
  border-bottom: 1px solid #ddd;
}
.header p{
  font-size: 13px;
  margin-top: 10px;
  color: #9c9c9c;
}
</style>
