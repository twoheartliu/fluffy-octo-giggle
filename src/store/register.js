import { getSendCode, postLogin, postRegister } from '@/api'

export default {
  namespaced: true,
  state: {
    captcha: '',
  },
  mutations: {
    SENDCODE(state, captcha) {
      state.captcha = captcha
    },
  },
  actions: {
    async getSendCode({ commit }, phone) {
      const res = await getSendCode(phone)
      if (res.code === 200) {
        commit('SENDCODE', res.data)
      }
    },
    async postRegister(_, params) {
      const res = await postRegister(params)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('fail'))
      }
    },
  },
  getters: {},
}
