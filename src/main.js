// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
window.log = (() => console.log.bind(console))()
import 'es6-promise/auto'
import firebase from 'firebase'
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import { fireBaseConfig } from '@/firebase.config'
Vue.config.productionTip = false

// Firebaseの初期化
firebase.initializeApp(fireBaseConfig)

// Userの状態へのアクセスを簡略化する
Object.defineProperty(Vue.prototype, '$user', {
  get: () => store.getters['auth/user']
})

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  beforeCreate() {
    // 認証の初期化
    store.dispatch('auth/init')
  }
})
