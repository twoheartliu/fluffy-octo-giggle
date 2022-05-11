import { getItemDetail, postAddToCart } from '@/api'

export default {
  namespaced: true,
  state: {
    itemDetail: {
      categoryView: {},
      skuInfo: {
        skuImageList: [{ imgUrl: '' }],
      },
      spuSaleAttrList: [],
      valuesSkuJson: undefined,
      price: null,
    },
  },
  mutations: {
    ITEMDETAIL(state, itemDetail) {
      state.itemDetail = itemDetail
    },
  },
  actions: {
    async getItemDetail({ commit }, params) {
      const res = await getItemDetail(params)
      if (res.code === 200) {
        commit('ITEMDETAIL', res.data)
      }
    },
    async postAddToCart(_, { skuId, skuNum }) {
      const res = await postAddToCart(skuId, skuNum)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('fail'))
      }
    },
  },
  getters: {
    categoryView(state) {
      return state.itemDetail.categoryView
    },
    skuInfo(state) {
      return state.itemDetail.skuInfo
    },
    spuSaleAttrList(state) {
      return state.itemDetail.spuSaleAttrList
    },
    valuesSkuJson(state) {
      return state.itemDetail.valuesSkuJson
    },
    price(state) {
      return state.itemDetail.price
    },
  },
}
