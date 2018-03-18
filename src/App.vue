<template>
  <div id="app">
    <div class="header">
      <nav>
        <router-link to="/" exact>Index</router-link>
        <router-link to="/member">Member</router-link>
      </nav>
    </div>

    <transition name="view">
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
}
.header {
  z-index: 2;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  background: #d0af91;
  color: #fff;
}
.header a {
  display: inline-block;
  line-height: 40px;
  padding: 0 10px;
  text-decoration: none;
  transition: background-color 1s;
}
.router-link-active {
  background: rgba(0, 0, 0, 0.1);
}
.view {
  position: relative;
  box-sizing: border-box;
  min-height: calc(100% - 40px);
  width: 100%;
}
.view-enter-active,
.view-leave-active {
  transition: all .5s;
}
.view-enter, .view-leave-to {
  opacity: 0;
}
.view-leave-active {
  position: absolute;
}
</style>
<style>
* { box-sizing: border-box; }
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
