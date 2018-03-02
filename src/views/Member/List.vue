<template>
  <div class="member-list">
    <ul>
      <li v-for="{ id, name, lv } in orderList('sort')" :key="id">
        <div class="name">
          [{{ id }}]
          <router-link :to="{ name:'member-detail', params: { id } }">{{ name }}</router-link>
        </div>
        <div class="lv">Lv.{{ lv }}</div>
        <div class="control">
          <button @click="$store.dispatch('member/delete', id)">削除</button>
          <button @click="edit(id)">編集</button>
        </div>
      </li>
    </ul>
    <div class="add">
      <button @click="editid=-1">追加</button>
    </div>
    <MemberModal :editid="editid" @close="editid=null" v-if="editid!=null" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MemberModal from '@/components/Member/Modal.vue'
export default {
  name: 'MemberList',
  components: { MemberModal },
  data() {
    return {
      editid: null
    }
  },
  computed: {
    ...mapGetters('member', ['orderList'])
  }
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
