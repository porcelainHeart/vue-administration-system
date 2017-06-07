import { IS_DEV } from '../config'
export const API_ROOT = IS_DEV ? 'http://localhost:8118/api' : '/api'

export const QINIU_UPLOAD_API = IS_DEV ? 'https://up.qbox.me' : 'http://upload.qiniu.com/'
export const PICTURE_API = `${API_ROOT}/pic`
export const CLIENT_API = `${API_ROOT}/client`
