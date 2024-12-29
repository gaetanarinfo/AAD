import { defineStore, acceptHMRUpdate } from 'pinia'
import { SessionStorage } from 'quasar';

export const useUserStore = defineStore('main', {

  state: () => ({
    stateUser: {
      user: null,
      token: null,
    },
  }),
  getters: {
    isLoggedIn: (state) => {

      if (SessionStorage.getItem('token') === null) {
        return !!state.stateUser.token;
      } else {
        return SessionStorage.getItem('token');
      }
    },
    user: (state) => {

      if (SessionStorage.getItem('token') === null) {
        return !!state.stateUser.token;
      } else {
        return state.stateUser.user;
      }
    },
  },
  actions: {
  },
  mutations: {
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
