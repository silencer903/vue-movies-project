<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App",
  }
</script>

<style lang="scss">
  body{
    margin: 0;
    background-color: #26252a;
    color: #f4f4f4;
  }
#app {


  //font-family: "Source Sans Pro";
}
/*
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}*/
</style>
