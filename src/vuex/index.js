import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import member from './modules/member'

const store = new Vuex.Store({
  modules: {
    member
  },
  state: {
    popupContent: null,
    menuCurrent: 0,
    menu: [
      { id: 1, label: 'かばん', width: 0, left: 0 },
      { id: 2, label: 'サーバル', width: 0, left: 0 },
      { id: 3, label: 'フェネック', width: 0, left: 0 },
      { id: 4, label: 'アライグマ', width: 0, left: 0 }
    ],
    x: 50,
    y: 50,
    isMove: false
  },
  mutations: {
    setSize(state, arg) {
      state.menu[arg.id].width = arg.width
    },
    setName(state) {
      state.menu[0].label = 'かばんちゃん'
    },
    updateX(state, value) {
      state.x = value
    },
    setMove(state, value) {
      state.isMove = value
    }
  }
})

export default store
