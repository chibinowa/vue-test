<template>
  <div id="control-member-list">
    <h1>Members</h1>
    <ul>
      <li v-for="val in orderList('lv')" :key="val.id">
        <div class="name">{{ val.name }}</div>
        <div class="lv">Lv.{{ val.lv }}</div>
        <div class="control">
          <button @click="editid=val.id">編集</button>
        </div>
      </li>
      <li class="loading" v-if="loading">loading</li>
    </ul>
    <div class="add">
      <button @click="editid=-1">追加</button>
    </div>
    <control-member-modal :editid="editid" @close="editid=null" v-if="editid!=null"></control-member-modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ControlMemberModal from './MemberModal'
export default {
  name: 'control-member-list',
  data() {
    return {
      loading: true,
      editid: null
    }
  },
  computed: {
    ...mapGetters('member', [
      'orderList'
    ])
  },
  created() {
    // 作成時にメンバーリストを取得
    this.$store.dispatch('member/load').then(() => {
      this.loading = false
      console.log('取得完了')
    }).catch(e => {
      console.log(e)
    })
  },
  destroyed() {
    this.$store.dispatch('member/destroy')
  },
  components: { ControlMemberModal }
}

</script>
<style scoped>
#control-member-list {
  margin: auto;
  max-width: 500px;
}
h1 {
  font-family: 'Georgia';
}
.loading {
  display: block;
  background: #eee;
  text-align: center;
}
ul {
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
  border: 2px solid #ddd;
  border-radius: 4px;
  list-style: none;
}
li {
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
}
li:hover {
  background: #f8f8f8;
}
li:not(:first-child) {
  border-top: 1px solid #ddd;
}
.name {
  flex: 1;
}
.lv {
  width: 50px;
}
.control {
  width: 100px;
  text-align: right;
}
.add {
  margin-top: 10px;
}
</style>
