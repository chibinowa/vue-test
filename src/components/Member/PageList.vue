<template>
  <div id="member-list">
    <h3>Members</h3>
    <ul>
      <li v-for="val in orderMembers('sort')">
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
      <li class="loading" v-if="loading">loading</li>
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
export default {
  name: 'member-list',
  data() {
    return {
      loading: true,
      editid: null
    }
  },
  computed: {
    ...mapGetters('member', [
      'orderMembers'
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
  beforeDestroy() {
    console.log('beforeDestroy')
    this.$store.commit('member/destroy')
  },
  components: { MemberModal }
}
</script>

<style scoped>
#member-list {
  margin: auto;
  max-width: 500px;
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
  width: 120px;
  text-align: right;
}

.add {
  margin-top: 10px;
}
</style>
