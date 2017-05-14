import Vue from 'vue'
// 先に作ったAPIモジュールを使う
import api from '@/api/member'
// lodashの特定のメソッドだけ使う
import { orderBy, findIndex, find } from 'lodash'

const member = {
  // ネームスペースを利用する
  namespaced: true,
  state: {
    currentMember: null,
    members: [],
    error: null
  },
  getters: {
    // エラーメッセージを返す
    error: (state) =>
      state.error,
    // カレントメンバーを返す
    currentMember: (state) => state.currentMember,
    // メンバーリストを引数の項目でソートして返す
    orderMembers: (state) => (field) =>
      orderBy(state.members, field, 'asc'),
    // メンバーリストのメンバーIDから配列インデックスを返す
    findIndexById: (state) => (id) =>
      findIndex(state.members, o => o.id === id),
    // メンバーリストのメンバーIDからメンバー内容を返す
    findMemberById: (state) => (id) =>
      find(state.members, o => o.id === id)
  },
  mutations: {
    // カレントメンバーをセット
    setCurrentMember(state, payload) {
      state.currentMember = payload
    },
    // メンバーリストをセット
    setMembers(state, members) {
      state.members = members
    },
    // メンバーリストを更新
    updateMember(state, payload) {
      const idx = findIndex(state.members, o => o.id === payload.id)
      Vue.set(state.members, idx, payload)
    },
    // メンバーリストに追加
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
          commit('setCurrentMember', entry)
        })
    },
    load({ commit }) {
      return api.getMembers()
        .then(entry => {
          commit('setMembers', entry)
        })
    },
    // メンバーを保存
    saveMember({ commit }, member) {
      // IDが-1なら追加
      const type = member.id === -1 ? api.postMember : api.putMember
      return type(member.id, member)
        .then(entry => {
          // サーバー側で成功したらフロントのデータを更新
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
    // メンバーを削除
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
