import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn:false,
    token: '',
  },
  mutations: {
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload
    },
    setToken(state, payload) {
        state.token = payload
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
