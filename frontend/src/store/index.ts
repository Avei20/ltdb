import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

export interface State {
  isLoggedIn:boolean,
  token:string
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
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

export function useStore() {
  return baseUseStore(key)
}