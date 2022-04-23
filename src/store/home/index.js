import { getCategoryList } from '@/api'
const state = {
  // state 的默认初始值应该与接口中返回的值类型一致
  categoryList: [],
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
}
const actions = {
  async categoryList({ commit }) {
    const res = await getCategoryList()
    if (res.code === 200) {
      commit('CATEGORYLIST', res.data)
    }
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}
