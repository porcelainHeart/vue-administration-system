import axios from '../utils/_axios'
import Catcher from './errCatcher'
import { API_ROOT } from './config'
// 全局配置文件
import { CLIENT_X_SOURCE_TYPE } from '../config'

let Ax = axios.create({
  baseURL: API_ROOT,
  headers: {'x-token': '', 'x-source-type': CLIENT_X_SOURCE_TYPE}
})
Ax.interceptors.request.use(function (config) {
  const USER_INFO = JSON.parse(window.localStorage.getItem('userInfo'))
  if (config.needToken) {
    config.headers['x-token'] = USER_INFO.token || ''
  }
  return config
}, function (error) {
  Catcher(error)
  return Promise.reject(error)
})

Ax.interceptors.response.use(function (response) {
  Catcher(response)
  return response
}, function (error) {
  Catcher(error)
  return Promise.reject(error)
})
export default Ax
