<template>
  <transition name="modal">
    <div id="member-modal" v-if="editid!=null" @click.self="$emit('close')">
      <div class="body">
        <h1>{{ title }}</h1>
        <form @submit.prevent="onSaveMember">
          <button type="submit" style="display:none"></button>
          <transition name="modal">
            <div v-if="error" class="error" 
                 @click.self="$store.commit('item/resetError')">{{ error }}</div>
          </transition>
          <dl>
            <dt>名前</dt>
            <dd><input v-model="intarnal.name"></dd>
            <dt>レベル</dt>
            <dd><input v-model.number="intarnal.lv" size="3"></dd>
          </dl>
        </form>
        <footer>
          <div class="left"><button type="button" @click="$emit('close')">閉じる</button></div>
          <div class="right"><button type="button" @click="onSaveMember">保存する</button></div>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'member-modal',
    props: { editid: Number },
    data() {
      return {
        intarnal: {}
      }
    },
    computed: {
      title() { return this.editid === -1 ? '追加' : '編集' },
      ...mapGetters('member', [
        'findMemberById',
        'error'
      ])
    },
    watch: {
      editid() {
        // IDがnull以外ならメンバーデータをクローンする
        if (this.editid != null) {
          // デフォルトデータの作成はストアに書いたほうが良さげかも？
          this.intarnal = Object.assign({
            id: -1,
            name: '',
            lv: ''
          }, this.findMemberById(this.editid))
        }
      }
    },
    methods: {
      // 保存ボタン＆サブミットで内部データをストアに送る
      onSaveMember() {
        this.$store.dispatch('member/saveMember', this.intarnal).then(() => {
          // 結果にエラーが無ければウィンドウを閉じる
          // エラーがあればメッセージとして表示
          if (!this.error) this.$emit('close')
        })
      }
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
    background: rgba(0, 0, 0, .4);
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
    content: " ";
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
    transition: opacity .4s;
  }
  .modal-enter,
  .modal-leave-to {
    opacity: 0;
  }
  .modal-enter-active .body,
  .modal-leave-active .body {
    transition: opacity .3s ease, transform .3s ease;
  }
  .modal-enter .body,
  .modal-leave-to .body {
    opacity: 0;
    transform: translateY(-100px);
  }

</style>
