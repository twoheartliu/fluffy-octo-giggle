import requests from './ajax'
import mockRequests from './mockAjax'

// 三级联动的接口
// /api/product/getBaseCategoryList get 参数无

export const getCategoryList = () =>
  requests({
    url: '/product/getBaseCategoryList',
  })

// mock banner 接口
export const getBannerList = () =>
  mockRequests({
    url: '/banner',
  })

// mock floor 接口
export const getFloorList = () =>
  mockRequests({
    url: '/floor',
  })
