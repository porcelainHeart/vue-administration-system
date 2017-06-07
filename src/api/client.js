import Ax from './axios'
import { CLIENT_API } from './config'

// 获取验证码[client/获取验证码接口]
export function clientSendCode (data) {
  return Ax.post(`${CLIENT_API}/send_code`, {...data})
    .then(res => res.data)
}
// 账户登录[client/client login]()
export function clientLogin (data) {
  return Ax.post(`${CLIENT_API}/mobile/login`, {...data})
    .then(res => {
      console.dir(res)
      return res.data
    })
}
// 账户列表[client/client list]
export function getClientList (data) {
  return Ax.get(CLIENT_API, {params: {...data}, needToken: true})
    .then(res => res.data)
}

// 新建账户[client/new client]
export function createClient (data) {
  return Ax.post(CLIENT_API, {...data}, {needToken: true})
    .then(res => res.data)
}

// 获取账户[client/get client]
export function getClient (clientid) {
  return Ax.get(`${CLIENT_API}/${clientid}`, {needToken: true})
    .then(res => res.data)
}

// 更新账户[client/update client]
export function updateClient (data) {
  return Ax.patch(`${CLIENT_API}/${data.id}`, {...data}, {needToken: true})
    .then(res => res.data)
}

// 删除账户[client/delete client]
export function deleteClient (clientid) {
  return Ax.delete(`${CLIENT_API}/${clientid}`, {needToken: true})
    .then(res => res.data)
}

// 设置为管理员账户[client/transfer admin]
export function adminTransfer (data) {
  return Ax.post(`${CLIENT_API}/admin/transfer`, {needToken: true})
    .then(res => res.data)
}
