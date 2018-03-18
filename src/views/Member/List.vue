<template>
  <div class="members">

    <div class="list-wrapper" :style="{ height: boxHeight + 'px' }">
      <transition-group tag="ul" name="list" ref="list" class="list">
        <li v-for="{ id, name, lv } in orderList" :key="id" class="row">
          <div class="cel name">
            [{{ id }}] <router-link :to="{ name:'member-detail', params: { id } }" v-text="name" />
          </div>
          <div class="cel lv">Lv.{{ lv }}</div>
          <div class="cel control">
            <button type="button" @click="doDelete(id)">削除</button>
            <button type="button" @click="doEdit(id)">編集</button>
          </div>
        </li>
      </transition-group>
    </div>

    <div class="add">
      <button type="button" @click="doEdit(-1)">追加</button>
    </div>
    <MemberModal @close="doEdit(null)" v-if="editId!=null" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MemberModal from '@/components/Member/Modal.vue'

export default {
  name: 'MemberList',
  components: { MemberModal },
  data() {
    return {
      boxHeight: 'auto'
    }
  },
  watch: {
    orderList: {
      handler() {
        this.$nextTick(() => {
          this.boxHeight = this.$refs.list.$el.getBoundingClientRect().height
        })
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters('member', ['editId']),
    orderList() {
      return this.$store.getters['member/orderList']('sort')
    }
  },
  methods: mapActions('member', ['doEdit', 'doDelete'])
}
</script>

<style scoped>
.list-wrapper {
  box-sizing: content-box;
  position: relative;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin: 0 0 10px 0;
  padding: 0px;
  overflow: hidden;
  transition: height 0.6s;
  min-height: 40px;
}
.list {
  margin: 0;
  padding: 0;
  border-radius: 4px;
  list-style: none;
}
.row {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.row:hover {
  background: #f8f8f8;
}
.cel {
  padding: 10px;
}
.row:not(:first-child) {
  border-top: 1px solid #ddd;
}
.name {
  flex: 1;
}
.lv {
  width: 50px;
}
.control {
  width: 130px;
  text-align: right;
}
.add {
  margin-top: 10px;
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.6s;
}
.list-leave-active {
  position: absolute;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
