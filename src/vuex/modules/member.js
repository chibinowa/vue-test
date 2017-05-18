import Vue from 'vue'
// 先に作ったAPIモジュールを使う
import api from '@/api/member'
// lodashの特定のメソッドだけ使う
import { orderBy, findIndex, find } from 'lodash'

export const templateMember = {
  id: -1,
  name: '',
  lv: ''
}

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
    error: (state) => state.error,
    // カレントメンバーを返す
    currentMember: (state) => state.currentMember,
    // メンバーリストを引数の項目でソートして返す
    orderList: (state) => (field) =>
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
    setCurrent(state, payload) {
      state.currentMember = payload
    },
    // メンバーリストを更新
    update(state, payload) {
      const idx = findIndex(state.members, o => o.id === payload.id)
      Vue.set(state.members, idx, payload)
    },
    // メンバーリストをセット
    setList(state, members) {
      state.members = members
    },
    // メンバーリストに追加
    add(state, payload) {
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
          commit('setCurrent', entry)
        })
    },
    load({ commit }) {
      return api.getMembers()
        .then(entry => {
          commit('setList', entry)
        })
    },
    // メンバーを保存
    save({ commit }, member) {
      // IDが-1なら追加
      const type = member.id === -1 ? api.postMember : api.putMember
      return type(member.id, member)
        .then(entry => {
          // サーバー側で成功したらフロントのデータを更新
          if (member.id === -1) {
            commit('add', entry)
          } else {
            commit('update', entry)
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
              commit('setList', entry)
            })
        })
    }
  }
}

export default member
