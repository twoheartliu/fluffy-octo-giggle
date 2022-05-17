import { getLogout, getUserInfo, postLogin } from '@/api'
import { clearStorage, getToken, setToken } from '@/utils'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {},
  },
  mutations: {
    LOGIN(state, token) {
      state.token = token
    },
    USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    LOGOUT(state) {
      state.token = ''
      state.userInfo = {}
      clearStorage()
    },
  },
  actions: {
    async postLogin({ commit }, params) {
      const res = await postLogin(params)
      if (res.code === 200) {
        commit('LOGIN', res.data.token)
        setToken(res.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      if (res.code === 200) {
        commit('USERINFO', res.data)
      }
    },
    async getLogout({ commit }) {
      const res = await getLogout()
      if (res.code === 200) {
        commit('LOGOUT')
        return 'ok'
      } else {
        return Promise.reject(new Error('fail'))
      }
    },
  },
  getters: {},
}
