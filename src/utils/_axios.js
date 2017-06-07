import axios from 'axios'
let AXPROTO = Object.getPrototypeOf(axios)
AXPROTO.__reqListeners = []
AXPROTO.__resListeners = []
AXPROTO.__INTERCEPTORS = {
  addReqListener: (resolve, reject) => {
    if (typeof resolve !== 'function' || typeof reject !== 'function') {
      console.error('[axios]: __INTERCEPTORS.addReqListener params both must be function.')
      return false
    }
    AXPROTO.__reqListeners.push([resolve, reject])
  },
  addResListener: (resolve, reject) => {
    if (typeof resolve !== 'function' || typeof reject !== 'function') {
      console.error('[axios]: __INTERCEPTORS.addResListener params both must be function.')
      return false
    }
    AXPROTO.__resListeners.push([resolve, reject])
  }
}

const originCreate = axios.create
axios.create = (...args) => {
  const instance = originCreate(...args)
  instance.interceptors.request.use(request => {
    AXPROTO.__reqListeners.forEach(fnArr => fnArr[0](request))
    return request
  }, error => {
    AXPROTO.__reqListeners.forEach(fnArr => fnArr[1](error))
    return error
  })
  instance.interceptors.response.use(response => {
    AXPROTO.__resListeners.forEach(fnArr => fnArr[0](response))
    return response
  }, error => {
    AXPROTO.__resListeners.forEach(fnArr => fnArr[1](error))
    return error
  })
  return instance
}

/* example
axios.__INTERCEPTORS.addReqListener(request => {
  console.log('__req', request)
}, error => {
  console.log('__req.error', error)
})

axios.__INTERCEPTORS.addResListener(response => {
  console.log('__res', response)
}, error => {
  console.log('__res.error', error)
})
*/

export default axios
