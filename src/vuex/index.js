import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import member from './modules/member'

const store = new Vuex.Store({
  modules: {
    member
  },
  strict: process.env.NODE_ENV !== 'production'
})

if (module.hot) {
  module.hot.accept(['./modules/member'], () => {
    store.hotUpdate({
      modules: {
        member: require('./modules/member').default
      }
    })
  })
}

export default store
