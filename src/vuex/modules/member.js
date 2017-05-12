import Vue from 'vue'
// 先に作ったAPIモジュールを使う
import api from '@/api/member'
// lodashの特定のメソッドだけ使う
import { orderBy, findIndex, find } from 'lodash'

const member = {
  // ネームスペースを利用する
  namespaced: true,
  state: {
    members: [],
    error: null
  },
  getters: {
    // エラーメッセージを返す
    error: (state) =>
      state.error,
    // 引数の項目でソートして返す
    orderMembers: (state) => (field) =>
      orderBy(state.members, field, 'asc'),
    // メンバーIDから配列インデックスを返す
    findIndexById: (state) => (id) =>
      findIndex(state.members, o => o.id === id),
    // メンバーIDからメンバー内容を返す
    findMemberById: (state) => (id) =>
      find(state.members, o => o.id === id),
    firstMember: (state) => state.members[0]
  },
  mutations: {
    // 全メンバーを代入
    setMembers(state, members) {
      state.members = members
    },
    // メンバーを更新
    updateMember(state, payload) {
      const idx = findIndex(state.members, o => o.id === payload.id)
      Vue.set(state.members, idx, payload)
    },
    // メンバーを追加
    addMember(state, payload) {
      state.members.push(payload)
    },
    // メンバーリストを破棄
    destroy(state) {
      state.members = []
    },
    // エラーメッセージをセット
    setError(state, msg) {
      state.error = msg
    },
    // エラーメッセージをリセット
    resetError(state) {
      state.error = null
    }
  },
  actions: {
    // 全メンバーを読み込む
    get({ commit }, id) {
      return api.getMember(id)
        .then(entry => {
          commit('addMember', entry)
        })
    },
    load({ commit }) {
      return api.getMembers()
        .then(entry => {
          commit('setMembers', entry)
        })
    },
    // メンバーを保存する
    saveMember({ commit }, member) {
      // IDが-1なら追加
      const type = member.id === -1 ? api.postMember : api.putMember
      return type(member.id, member)
        .then(entry => {
          // サーバー側で成功したらフロントのデータを更新する
          if (member.id === -1) {
            commit('addMember', entry)
          } else {
            commit('updateMember', entry)
          }
        })
        .catch(error => {
          // サーバー側で失敗したらエラーをセット
          commit('setError', error)
        })
    },
    delete({ commit }, id) {
      return api.deleteMember(id)
        .then(entry => {
          commit('destroy')
          api.getMembers()
            .then(entry => {
              commit('setMembers', entry)
            })
        })
    }
  }
}

export default member
