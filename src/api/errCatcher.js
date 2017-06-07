import { isType } from '../utils'
import { STATUSCODEMAP } from '../config'
import app from '../main'
const DURATION = 2333 * 2.33

function Catcher (flow) {
  const isError = isType('error', flow)
  if (isError) {
    if (flow.response) {
      const title = flow.response.data.description || flow.response.statusText
      const code = flow.response.data.code || flow.response.status
      const msg = STATUSCODEMAP[code] || '出错了'
      if (code === 401) app.$router.push('/login')
      app.$notify({
        title: title,
        type: 'error',
        message: msg,
        duration: DURATION
      })
    } else {
      app.$notify({
        title: flow.message,
        type: 'error',
        message: '阿西八阿哥, 请刷新后重试',
        duration: DURATION
      })
    }
  }
}

export default Catcher
