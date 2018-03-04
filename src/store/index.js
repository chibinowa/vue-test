import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import toast from './modules/toast.js'
import view from './modules/view.js'
import auth from './modules/auth.js'
import member from './modules/member.js'

const store = new Vuex.Store({
  modules: {
    toast,
    view,
    auth,
    member
  },
  strict: process.env.NODE_ENV !== 'production'
})

if (module.hot) {
  module.hot.accept([
    './modules/auth',
    './modules/member'
  ], () => {
    store.hotUpdate({
      modules: {
        auth: require('./modules/auth').default,
        member: require('./modules/member').default
      }
    })
  })
}

export default store
