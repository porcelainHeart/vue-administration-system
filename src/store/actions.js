import {
  SUCCESS_CLIENT_LOGIN
} from './types'
import api from '../api'
const { client } = api
import app from '../main'

function warnLog (name) {
  console.warn(`[actions/${name}]: 劳资就是要搞事情 (╯°□°）╯︵┻━┻)`)
}
// Client 相关
// [登录]
export const clientLogin = ({commit}, data) => {
  return client.clientLogin(data).then(resdata => {
    if (resdata && resdata.code === 200) {
      app.$message({
        message: '登录成功!',
        type: 'success'
      })
      app.$router.push('/')
      commit(SUCCESS_CLIENT_LOGIN, resdata.data)
    } else { warnLog('clientLogin') }
    return resdata
  })
}
// [验证码]
export const clientSendCode = (state, data) => {
  return client.clientSendCode(data).then(resdata => {
    if (resdata && resdata.code === 200) {
      app.$message({
        message: '验证码发送成功,请注意查收',
        type: 'success'
      })
    } else { warnLog('clientSendCode') }
    return resdata
  })
}
// [账户列表]
export const getClientList = ({commit}, data) => {
  return client.getClientList(data).then(resdata => {
    if (resdata && resdata.code === 200) {
      return resdata.data
    } else { warnLog('getClientList') }
    return resdata
  })
}
// [创建账户]
export const createClient = ({commit}, data) => {
  return client.createClient(data).then(resdata => {
    if (resdata && resdata.code === 200) {
      app.$message({
        message: '创建账户成功!',
        type: 'success'
      })
      return resdata.data
    } else { warnLog('createClient') }
  })
}
// [获取账户]
export const getClient = ({commit}, data) => {
  return client.getClient(data).then(resdata => {
    if (resdata && resdata.code === 200) {
      return resdata.data
    } else { warnLog('getClient') }
  })
}
// [更新账户]
export const updateClient = ({commit}, data) => {
  return client.updateClient(data).then(resdata => {
    if (resdata && resdata.code === 200) {
      return resdata.data
    } else { warnLog('updateClient') }
  })
}
// [删除账户]
export const deleteClient = ({commit}, data) => {
  return client.deleteClient(data).then(resdata => {
    if (resdata && resdata.code === 200) {
      return resdata.data
    } else { warnLog('deleteClient') }
  })
}
// [设置管理员]
export const adminTransfer = ({commit}, data) => {
  return client.adminTransfer(data).then(resdata => {
    if (resdata && resdata.code === 200) {
      return resdata.data
    } else { warnLog('adminTransfer') }
  })
}
