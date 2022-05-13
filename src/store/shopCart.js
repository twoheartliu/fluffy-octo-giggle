import { getCartList } from '@/api'

export default {
  namespaced: true,
  state: {
    cartList: [
      {
        cartInfoList: [],
      },
    ],
  },
  mutations: {
    CARTLIST(state, cartList) {
      state.cartList = cartList
    },
  },
  actions: {
    async getCartList({ commit }) {
      const res = await getCartList()
      if (res.code === 200) {
        commit('CARTLIST', res.data)
      }
    },
  },
  getters: {
    cartInfoList(state) {
      return state.cartList[0].cartInfoList
    },
  },
}
