<template>
  <div class="hello">
    <control-member-list></control-member-list>
  </div>
  
</template>

<script>
  import ControlMemberList from './Control/MemberList'
  export default {
    name: 'hello',
    data() {
      return {}
    },
    components: {
      ControlMemberList
    }
  }
</script>

<style scoped>

</style>
