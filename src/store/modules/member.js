// 先に作ったAPIモジュールを使う
import { member as api } from '@/api/member'
// Lodash
import orderBy from 'lodash/orderBy'
import find from 'lodash/find'

export default {
  // ネームスペースを利用する
  namespaced: true,
  state: {
    editId: null,
    members: []
  },
  getters: {
    // 編集中の要素IDを返す
    editId: state => state.editId,
    // 編集要素のテンプレートを返す
    editTemplate: state => {
      if (state.editId !== -1) {
        return find(state.members, o => o.id === state.editId)
      } else {
        return {
          id: -1,
          name: 'noname',
          lv: 10
        }
      }
    },
    // メンバーリストを引数の項目でソートして返す
    orderList: state => field =>
      orderBy(state.members, field, 'asc'),
    // メンバーリストのメンバーIDからメンバー内容を返す
    findMemberById: state => id =>
      find(state.members, o => o.id === id)
  },
  mutations: {
    // 編集中のIDをセット
    setEditId(state, { id }) {
      state.editId = id
    },
    // メンバーリストをセット
    setList(state, { members }) {
      state.members = members
    },
    // メンバーを追加
    add(state, { newdata }) {
      state.members.push(newdata)
    },
    // メンバーを更新
    update(state, { member, newdata }) {
      member.name = newdata.name
      member.lv = newdata.lv
    },
    // メンバーを削除
    delete(state, { id }) {
      state.members = state.members.filter(el => el.id !== id)
    },
    // メンバーリストを破棄
    destroy(state) {
      state.members = []
    }
  },
  actions: {
    // 全メンバーを読み込む
    load({ commit }) {
      return api.getMembers().then(members => {
        commit('setList', { members })
      }).catch(error => {
        commit('toast/add', error, { root: true })
        return Promise.reject()
      })
    },
    // 編集を開始
    doEdit({ commit, getters }, id) {
      commit('setEditId', { id })
    },
    // メンバーを保存
    doSave({ commit, getters }, newdata) {
      // IDが-1なら追加
      if (newdata.id === -1) {
        api.postMember(newdata.id, newdata).then(newdata => {
          commit('add', { newdata })
        }).catch(error => {
          commit('toast/add', error, { root: true })
        })
      } else {
        api.putMember(newdata.id, newdata).then(newdata => {
          const member = getters.findMemberById(newdata.id)
          commit('update', { member, newdata })
        }).catch(error => {
          commit('toast/add', error, { root: true })
        })
      }
    },
    // メンバーを削除
    doDelete({ commit, dispatch }, id) {
      api.deleteMember(id).then(entry => {
        commit('delete', { id })
      })
    }
  }
}
