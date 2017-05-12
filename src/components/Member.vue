<template>
  <div>
    <h2>member page</h2>
    <router-view class="router"></router-view>
  </div>
</template>

<script>
export default {
  name: 'control',
  data() {
    return {}
  },
  beforeDestroy() {
   // this.$store.commit('member/destroy')
  }
}
</script>

<style scoped>

</style>
