<template>
  <div class="detail">
    detail {{ member }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'detail',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('member', {
      member: 'firstMember'
    })
  },
  created() {
    this.$store.dispatch('member/get', parseInt(this.$route.params.id)).then(() => {
    }).catch(e => {
      console.log(e)
    })
  }
}
</script>

<style scoped>

</style>
