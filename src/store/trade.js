import { getAddress, getTradeInfo } from '@/api'

export default {
  namespaced: true,
  state: {
    addressList: [],
    tradeInfo: {},
  },
  mutations: {
    ADDRESSLIST(state, addressList) {
      state.addressList = addressList
    },
    TRADEINFO(state, tradeInfo) {
      state.tradeInfo = tradeInfo
    },
  },
  actions: {
    async getAddress({ commit }) {
      const res = await getAddress()
      if (res.code === 200) {
        commit('ADDRESSLIST', res.data)
      }
    },
    async getTradeInfo({ commit }) {
      const res = await getTradeInfo()
      if (res.code === 200) {
        commit('TRADEINFO', res.data)
      }
    },
  },
  getters: {
    detailArrayList(state) {
      return state.tradeInfo.detailArrayList || []
    },
  },
}
