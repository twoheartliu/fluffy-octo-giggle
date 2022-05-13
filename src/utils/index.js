import { v4 as uuid } from 'uuid'
const isEmpty = (obj) => {
  if (typeof obj === 'undefined' || obj === null || obj === '') {
    return true
  } else {
    return false
  }
}

export const removeEmptyElement = (obj) => {
  Object.keys(obj).forEach((item) => {
    if (isEmpty(obj[item])) {
      delete obj[item]
    }
  })
  return obj
}

export const getUUID = () => {
  let uuid_token = localStorage.getItem('uuid_token')
  if (!uuid_token) {
    uuid_token = uuid()
    localStorage.setItem('uuid_token', uuid_token)
  }
  return uuid_token
}
