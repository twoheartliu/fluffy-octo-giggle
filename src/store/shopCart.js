import { deleteCart, getCartList, getCheckCart } from '@/api'

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
    async deleteCart(_, skuId) {
      const res = await deleteCart(skuId)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('fail'))
      }
    },
    async getCheckCart(_, { skuId, isChecked }) {
      const res = await getCheckCart({ skuId, isChecked })
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('fail'))
      }
    },
    deleteCheckedItem({ getters, dispatch }) {
      const list = getters.cartInfoList
      let promiseAll = []
      list.map((item) => {
        const promise =
          item.isChecked === 1 && dispatch('deleteCart', item.skuId)
        promise && promiseAll.push(promise)
      })
      return Promise.all(promiseAll)
    },
    allCheckedOnchange({ getters, dispatch }, isAllChecked) {
      const list = getters.cartInfoList
      let promiseAll = []
      list.map((item) => {
        if (isAllChecked !== item.isChecked) {
          const promise = dispatch('getCheckCart', {
            skuId: item.skuId,
            isChecked: isAllChecked,
          })
          promiseAll.push(promise)
        }
      })
      return Promise.all(promiseAll)
    },
  },
  getters: {
    cartInfoList(state) {
      return state.cartList.length ? state.cartList[0].cartInfoList : []
    },
  },
}
