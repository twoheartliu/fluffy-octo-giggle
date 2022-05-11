import requests from './ajax'
import mockRequests from './mockAjax'

// 三级联动的接口
// /api/product/getBaseCategoryList get 参数无

export const getCategoryList = () =>
  requests.get('/product/getBaseCategoryList')

// mock banner 接口
export const getBannerList = () => mockRequests.get('/banner')

// mock floor 接口
export const getFloorList = () => mockRequests.get('/floor')

// 产品搜索列表
// params 默认参数，应当是一个空对象，否则报错
// 当参数是空对象时，返回所有 items
export const postSearchList = (params) =>
  requests({
    url: '/list',
    method: 'post',
    data: params,
  })

export const getItemDetail = (skuId) =>
  requests({
    url: `/item/${skuId}`,
    method: 'get',
  })

export const postAddToCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
  })
