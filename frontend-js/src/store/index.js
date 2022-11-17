import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: sessionStorage.getItem('isLoggedIn') || false,
    token : '',
    isLoginPage: true
  },
  getters: {
  },
  mutations: {
    setLoggedIn(state, payload) {
      sessionStorage.setItem('isLoggedIn', payload)
      state.isLoggedIn = payload
    },
    setToken(state, payload) {
      sessionStorage.setItem('token', payload)
      state.token = payload
    },
    setIsLoginPage(state, payload) {
      state.isLoginPage = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
