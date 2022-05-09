import { postSearchList } from '@/api'

export default {
  namespaced: true,
  state: {
    searchList: {
      attrsList: [],
      goodsList: [],
      trademarkList: [],
    },
  },
  mutations: {
    SEARCHLIST(state, searchList) {
      state.searchList = searchList
    },
  },
  actions: {
    async postSearchList({ commit }, params = {}) {
      const res = await postSearchList(params)
      if (res.code === 200) {
        commit('SEARCHLIST', res.data)
      }
    },
  },
  getters: {
    attrsList(state) {
      return state.searchList.attrsList
    },
    goodsList(state) {
      return state.searchList.goodsList
    },
    trademarkList(state) {
      return state.searchList.trademarkList
    },
    total(state) {
      return state.searchList.total
    },
  },
}
