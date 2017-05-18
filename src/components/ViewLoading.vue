<template>
  <div :class="state" class="overlay">
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
</template>

<script>
export default {
  name: 'view-loading',
  data() {
    return {
      state: ''
    }
  },
  methods: {
    start() {
      this.state = 'enter'
    },
    end() {
      this.state = 'leave'
      setTimeout(() => {
        this.state = ''
      }, 1200)
    }
  }
}
</script>

<style scoped>
@keyframes router-transition-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.overlay {
  position: absolute;
  background: rgba(220, 220, 220, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: none;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 1s ease .4s;
}
.overlay.enter {
  display: flex;
  opacity: 1;
  animation: router-transition-in .4s;
}
.overlay.leave {
  display: flex;
  opacity: 0;
}
</style>
