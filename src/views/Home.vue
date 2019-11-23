<template>
  <movies-list></movies-list>
</template>

<script>
  import MoviesList from "@/views/movies-list/movies-list.vue";
  export default {
    name: "home",
    components:{
      MoviesList
    },
  }
</script>
