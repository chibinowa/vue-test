<template>
  <div class="member-detail">
    <div class="wrapper" :style="{ height: boxHeight + 'px' }" :class="{loading: isLoading}">
      <dl v-if="member" ref="body" class="body">
        <dt>name</dt>
        <dd>{{ member.name }}</dd>
        <dt>lv</dt>
        <dd>Lv.{{ member.lv }}</dd>
        <dt>sort</dt>
        <dd>{{ member.sort }}</dd>
      </dl>
      <transition name="fade">
        <div class="overlay" v-show="isLoading"><span>LOADING NOW</span></div>
      </transition>
    </div>
    <router-link to="/member" tag="button">戻る</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MemberDetail',
  props: { id: Number },
  data() {
    return {
      isLoading: true,
      boxHeight: 40
    }
  },
  computed: mapGetters('member', {
    member: 'editMember'
  }),
  watch: {
    id: {
      handler() {
        this.isLoading = true
        this.$store.dispatch('member/get', this.id).then(() => {
          this.$nextTick(function () {
            this.isLoading = false
            this.boxHeight = this.$refs.body.getBoundingClientRect().height
          })
        })
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin: 0 0 10px 0;
  padding: 0px;
  overflow: hidden;
  transition: height .4s;
  min-height: 40px;
}
.body {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 10px;
  transition: opacity .4s ease, transform .4s ease;
}

.overlay {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(240, 240, 240, 0.9);
  color: #bbb;
  font-size: 12px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>
