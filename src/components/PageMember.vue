<template>
  <div>
    <h1>member page</h1>
    <div class="child-view-wrapper">
    <transition name="child-view" mode="out-in">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'member'
}
</script>

<style scoped>
.child-view {
  margin: 20px auto 20px;
  max-width: 500px;
}
.child-view-enter-active,
.child-view-leave-active {
  transition: transform 0.2s, opacity 0.2s;
}
.child-view-enter {
  transform: translateX(-10px);
  opacity: 0;
}
.child-view-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>
