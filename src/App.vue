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
  @import "assets/vars-styles";
  body{
    @import "@/assets/fonts/_fonts";

    margin: 0;
    background-color: $base-background-color;
    color: $base-text-color;
    font-family: 'Source Sans Pro',sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: 14px;
  }
</style>
