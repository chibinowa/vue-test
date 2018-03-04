<template>
  <div class="member-detail">
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'MemberDetail',
  props: { id: Number },
  data() {
    return {
      member: {},
      isLoading: true,
      boxHeight: 40
    }
  },
  computed: mapGetters('member', ['findMemberById']),
  watch: {
    id: {
      handler() {
        this.member = this.findMemberById(this.id)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('member', ['get'])
  }
}
</script>

<style scoped>
</style>
