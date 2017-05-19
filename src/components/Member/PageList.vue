<template>
  <div id="member-list">
    <ul>
      <li v-for="val in orderList('sort')">
        <div class="name">
          [{{ val.id }}]
          <router-link :to="{name:'member-detail', params: { id: val.id }}">{{ val.name }}</router-link>
        </div>
        <div class="lv">Lv.{{ val.lv }}</div>
        <div class="control">
          <button @click="$store.dispatch('member/delete', val.id)">削除</button>
          <button @click="editid=val.id">編集</button>
        </div>
      </li>
    </ul>
    <div class="add">
      <button @click="editid=-1">追加</button>
    </div>
    <member-modal :editid="editid" @close="editid=null" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MemberModal from './Modal'
import store from '@/vuex'
export default {
  name: 'member-list',
  data() {
    return {
      editid: null
    }
  },
  computed: {
    ...mapGetters('member', [
      'orderList'
    ])
  },
  beforeRouteEnter(route, redirect, next) {
    store.dispatch('member/load').then(() => {
      next()
    })
  },
  beforeDestroy() {
    this.$store.commit('member/destroy')
  },
  components: { MemberModal }
}
</script>

<style scoped>
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
  width: 120px;
  text-align: right;
}
.add {
  margin-top: 10px;
}
</style>
