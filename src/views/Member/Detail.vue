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
import { mapGetters } from 'vuex'
export default {
  name: 'MemberDetail',
  props: { id: Number },
  computed: {
    ...mapGetters('member', ['findMemberById']),
    member() {
      return this.findMemberById(this.id)
    }
  }
}
</script>

<style scoped>
</style>
