import { getAddress, getTradeInfo } from '@/api'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAddress({ commit }) {
      const res = await getAddress()
      if (res.code === 200) {
        console.log('res', res)
      }
    },
    async getTradeInfo({ commit }) {
      const res = await getTradeInfo()
      if (res.code === 200) {
        console.log('res', res)
      }
    },
  },
  getters: {},
}
