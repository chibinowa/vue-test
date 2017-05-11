import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import member from './modules/member'

const store = new Vuex.Store({
  modules: {
    member
  }
})

export default store
