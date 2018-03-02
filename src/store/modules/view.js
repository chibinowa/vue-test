export default {
  namespaced: true,
  state: {
    loading: false
  },
  mutations: {
    start(state) { state.loading = true },
    end(state) { state.loading = false }
  }
}
