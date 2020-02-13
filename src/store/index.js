import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
import decodeJwt from 'jwt-decode'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user'),
    cachePages: ['TabBar']
  },
  mutations: {
    setUser (state, data) {
      if (data && data.token) {
        // 解析token
        data.id = decodeJwt(data.token).user_id
      }
      state.user = data

      setItem('user', state.user)
    },
    addCachePage (state, name) {
      if (!state.cachePages.includes(name)) {
        state.cachePages.push(name)
      }
    },
    removeCachePage (state, name) {
      const index = state.cachePages.indexOf(name)
      if (index !== -1) {
        state.cachePages.splice(index)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
