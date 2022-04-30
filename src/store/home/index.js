import { getBannerList, getCategoryList, getFloorList } from '@/api'
const state = {
  // state 的默认初始值应该与接口中返回的值类型一致
  categoryList: [],
  bannerList: [],
  floorList: [],
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList
  },
}
const actions = {
  async categoryList({ commit }) {
    const res = await getCategoryList()
    if (res.code === 200) {
      commit('CATEGORYLIST', res.data)
    }
  },
  async getBannerList({ commit }) {
    const res = await getBannerList()
    if (res.code === 200) {
      commit('BANNERLIST', res.data)
    }
  },
  async getFloorList({ commit }) {
    const res = await getFloorList()
    if (res.code === 200) {
      commit('FLOORLIST', res.data)
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
