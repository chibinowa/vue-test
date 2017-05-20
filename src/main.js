// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import firebase from 'firebase'
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/vuex'
import { fireBaseConfig } from '@/firebase.config'
Vue.config.productionTip = false

// Firebase初期化
firebase.initializeApp(fireBaseConfig)

// 認証を初期化
store.dispatch('auth/init').then(() => {
  /* eslint-disable no-new */
  new Vue({
    store,
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
})
