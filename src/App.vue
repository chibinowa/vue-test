<template>
  <div id="app">
    <ul>
      <li>
        <router-link to="/" exact>Index</router-link>
      </li>
      <li>
        <router-link to="/member">Member</router-link>
      </li>
    </ul>
    <transition name="fade" mode="out-in" @after-enter="$store.commit('view/end')">
      <router-view class="view" />
    </transition>
    <ViewLoading />
  </div>
</template>
<script>
import ViewLoading from '@/components/ViewLoading'
export default {
  name: 'app',
  components: { ViewLoading }
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
  position: absolute;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  background: #d0af91;
  color: #fff;
}
ul a {
  display: block;
  line-height: 40px;
  padding: 0 10px;
  text-decoration: none;
  transition: background-color 1s;
}
.router-link-active {
  background: rgba(0, 0, 0, 0.1);
}
.view {
  padding-top: 40px;
  min-height: 100%;
  box-sizing: border-box;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter {
  position: absolute;
}
</style>
<style>
html,
body,
#app {
  box-sizing: border-box;
  height: 100%;
  margin: 0;
}
body {
  font-size: 14px;
}
.en-header {
  font-family: 'Georgia';
}
.router {
  padding: 10px;
}
button {
  padding: 4px 12px;
  border: none;
  border-radius: 2px;
  background: #5db4bd;
  color: #fff;
}
input[type='text'],
input[type='password'],
input:not([type]) {
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 2px;
}
a {
  color: currentColor;
}
h1 {
  margin: 0;
  background: #e3f1f3;
  color: #5db4bd;
  font-size: 12px;
  padding: 10px;
  text-transform: uppercase;
}
</style>
