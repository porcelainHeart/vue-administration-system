export const IS_DEV = process.env.NODE_ENV !== 'production'
export const CLIENT_X_SOURCE_TYPE = 2
export const STATUSCODEMAP = {
  401: '请先登录',
  400142: '验证码错误'
}

let Kb = 1024
let Mb = Kb * 1024
export const MAX_SIZE_UPLOAD = 5 * Mb
