<template>
  <div id="app">
    <ul>
      <li>
        <router-link to="/">index</router-link>
      </li>
      <li>
        <router-link to="/member">member</router-link>
      </li>
    </ul>
    <router-view class="router"></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style scoped>
#app {
  color: #311d0a;
  font-family: 'Meiryo';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  background: #eee;
}
li {
  padding: 5px;
}
</style>
<style>
body {
  margin: 0;
  font-size: 14px;
}
.en-header {
  font-family: 'Georgia'
}
.router {
  border: 1px solid #ccc;
  padding: 10px;
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
