<template>
  <transition name="router">
    <div class="overlay" v-if="loading">
      <div v-pre>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
          <rect x="0" y="13" width="4" height="5" fill="#bbb">
            <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="1s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="1s" repeatCount="indefinite" />
          </rect>
          <rect x="10" y="13" width="4" height="5" fill="#bbb">
            <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="1s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="1s" repeatCount="indefinite" />
          </rect>
          <rect x="20" y="13" width="4" height="5" fill="#bbb">
            <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="1s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="1s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'view-loading',
  computed: {
    loading() {
      return this.$store.state.view.loading
    }
  }}
</script>

<style scoped>
.overlay {
  position: absolute;
  background: rgba(220, 220, 220, 1);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.router-enter-active{
  transition: all .4s;
}
.router-leave-active {
  transition: all .8s ease 0.4s;
}
.router-enter,.router-leave-to {
  opacity: 0;
}
</style>
