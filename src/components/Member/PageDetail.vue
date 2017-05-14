<template>
  <div id="member-detail">
    <dl v-if="member">
      <dt>name</dt>
      <dd>{{ member.name }}</dd>
      <dt>lv</dt>
      <dd>Lv.{{ member.lv }}</dd>
      <dt>sort</dt>
      <dd>{{ member.sort }}</dd>
    </dl>
    <router-link to="/member" tag="button">戻る</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/vuex'
export default {
  name: 'detail',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('member', {
      member: 'currentMember'
    })
  },
  beforeRouteEnter(route, redirect, next) {
    store.dispatch('member/get', parseInt(route.params.id)).then(() => {
      next()
    })
  }
}
</script>

<style scoped>

</style>
