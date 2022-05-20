import { v4 as uuid } from 'uuid'
const isEmpty = (obj) => {
  if (typeof obj === 'undefined' || obj === null || obj === '') {
    return true
  } else {
    return false
  }
}
// 移除对象中空元素
export const removeEmptyElement = (obj) => {
  Object.keys(obj).forEach((item) => {
    if (isEmpty(obj[item])) {
      delete obj[item]
    }
  })
  return obj
}

// 获取游客 uuid
export const getUUID = () => {
  let uuid_token = localStorage.getItem('uuid_token')
  if (!uuid_token) {
    uuid_token = uuid()
    localStorage.setItem('uuid_token', uuid_token)
  }
  return uuid_token
}

export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const clearStorage = () => {
  localStorage.clear()
}
