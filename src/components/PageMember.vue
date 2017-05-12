<template>
  <div>
    <h2>member page</h2>
    <router-view class="router"></router-view>
  </div>
</template>

<script>
export default {
  name: 'control',
  props: {
    reset: Boolean
  },
  data() {
    return {}
  },
  created() {
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

</style>
