import { getItemDetail, postAddToCart } from '@/api'
import { getUUID } from '@/utils'

export default {
  namespaced: true,
  state: {
    itemDetail: {
      categoryView: {
        category1Id: null,
        category1Name: '',
        category2Id: null,
        category2Name: '',
        category3Id: null,
        category3Name: '',
        id: null,
      },
      skuInfo: {
        skuImageList: [{ imgUrl: '' }],
      },
      spuSaleAttrList: [],
      valuesSkuJson: undefined,
      price: null,
    },
    // 游客临时身份
    uuid_token: getUUID(),
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
