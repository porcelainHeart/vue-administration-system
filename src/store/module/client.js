import {
  SUCCESS_CLIENT_LOGIN
} from '../types'

let state = {
  uname: '',
  name_cn: '',
  token: '',
  isLogin: false
}

const mutations = {
  [SUCCESS_CLIENT_LOGIN] (state, payload) {
    let info = {...payload, isLogin: true}
    window.localStorage.setItem('userInfo', JSON.stringify(info))
    Object.keys(info).forEach(key => {
      state[key] = info[key]
    })
  }
}

export default {
  state,
  mutations
}
