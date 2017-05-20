import firebase from 'firebase'

const auth = {
  namespaced: true,
  state: {
    user: {}
  },
  getters: {
    user: (state) => state.user
  },
  mutations: {
    set(state, payload) {
      state.user = payload
    }
  },
  actions: {
    init({ commit }) {
      // 起動用にPromiseで返す
      return new Promise((resolve) => {
        // 状態が変わった時の処理を登録
        firebase.auth().onAuthStateChanged((user) => {
          console.log('onAuthStateChanged callback')
          let profile = {
            auth: false,
            uid: '',
            email: ''
          }
          if (user) {
            profile = {
              auth: true,
              uid: user.uid,
              email: user.email
            }
          }
          commit('set', profile)
          // 変わった事を通知
          resolve()
        })
      })
    }
  }
}

export default auth
