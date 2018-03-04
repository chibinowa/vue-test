export default {
  namespaced: true,
  state: {
    entries: []
  },
  mutations: {
    add(state, [type, message]) {
      state.entries.push({
        type: 'error',
        message: message
      })
    }
  }
}
