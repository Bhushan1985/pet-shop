import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    alert: { show: false, color: 'info', message: '' },
    accesstoken: ''
  },
  mutations: {
    setAlert (state, data) {
      Object.assign(state.alert, { color: 'info', show: true }, data)
      state.alert = data
    },
    setIdentity(state, data) {
      state.accesstoken = data
    }
  }
})

export default store
