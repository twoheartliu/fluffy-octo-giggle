import requests from './request'

// 三级联动的接口
// /api/product/getBaseCategoryList get 参数无

export const getBaseCategoryList = () =>
  requests({
    url: '/product/getBaseCategoryList',
    method: 'get',
  })
