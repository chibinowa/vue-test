<template>
  <div>
    <h1>member page</h1>
    <div class="child-view-wrapper">
      <transition name="child-view" mode="out-in">
        <keep-alive>
          <router-view class="child-view" />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'Member',
  beforeRouteEnter(route, redirect, next) {
    // 読み込みの遅いページの例
    store.dispatch('member/load').then(() => {
      setTimeout(() => {
        next()
      }, 500)
    }).catch(e => {
      store.commit('view/end')
      next(false)
    })
  },
  beforeDestroy() {
    this.$store.commit('member/destroy')
  }
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
.child-view-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
