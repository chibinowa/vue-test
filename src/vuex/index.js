import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import auth from './modules/auth'
import member from './modules/member'

const store = new Vuex.Store({
  modules: {
    auth,
    member
  },
  state: {
    overlay: false
  },
  mutations: {
    setOverlay(state, mode) {
      state.overlay = mode
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})

if (module.hot) {
  module.hot.accept(['./modules/auth', './modules/member'], () => {
    store.hotUpdate({
      modules: {
        auth: require('./modules/auth').default,
        member: require('./modules/member').default
      }
    })
  })
}

export default store
