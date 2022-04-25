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
