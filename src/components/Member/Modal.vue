<template>
  <transition name="modal">
    <div id="member-modal" @click.self="$emit('close')">
      <div class="body">
        <h1>{{ title }}</h1>
        <form @submit="onSaveMember">
          <dl>
            <dt>名前</dt>
            <dd>
              <input v-model="intarnal.name">
            </dd>
            <dt>レベル</dt>
            <dd>
              <input v-model.number="intarnal.lv" size="3">
            </dd>
          </dl>
        </form>
        <footer>
          <div class="left">
            <button type="button" @click="$emit('close')">閉じる</button>
          </div>
          <div class="right">
            <button type="button" @click="onSaveMember">保存する</button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'MemberModal',
  props: { editid: Number },
  data() {
    return {
      intarnal: {}
    }
  },
  computed: {
    title() {
      return this.editid === -1 ? '追加' : 'クイック編集'
    },
    ...mapGetters('member', ['editMember'])
  },
  methods: {
    // 保存ボタン＆サブミットで内部データをストアに送る
    onSaveMember() {
      this.$store.dispatch('member/doSave', this.intarnal).then(() => {
        // 結果にエラーが無ければウィンドウを閉じる
        // エラーがあればメッセージとして表示
        if (!this.error) this.$emit('close')
      })
    }
  },
  created() {
    // 初期化で状態を一時的にコピーする
    this.intarnal = cloneDeep(this.editMember)
  }
}
</script>
<style scoped>
#member-modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
}
h1 {
  margin: 0;
  padding: 5px 10px;
  background: #f5f5f5;
  font-size: 14px;
}
footer {
  display: flex;
  margin: 0;
  padding: 10px;
  background: #f5f5f5;
  justify-content: space-between;
}
dl {
  margin: 0;
}
dl::after {
  display: table;
  clear: both;
  content: ' ';
}
dt {
  float: left;
  clear: left;
  margin: 0;
  padding: 5px;
  width: 20%;
}
dd {
  float: left;
  margin: 0;
  padding: 5px;
}
.error {
  padding: 6px 10px;
  border-radius: 2px;
  background: #ffe4e4;
  color: #d40000;
}
.body {
  width: 400px;
  background: #fff;
}
form {
  padding: 10px;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .body,
.modal-leave-active .body {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.modal-enter .body,
.modal-leave-to .body {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
