<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }

</script>

<style>
  body {
    font-size: 14px;
  }
  #app {
    color: #311d0a;
    font-family: 'Meiryo';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  button {
    padding: 4px 12px;
    border: none;
    border-radius: 2px;
    background: #009dea;
    color: #fff;
  }
  input[type="text"],
  input:not([type]) {
    padding: 4px;
    border: 1px solid #ddd;
    border-radius: 2px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

</style>
