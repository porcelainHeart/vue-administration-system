import { trim } from './index'
export default {
  must: {
    test (value) {
      if (!value) return false
      return trim(value) !== ''
    },
    message: '必填项'
  },
  phone: {
    test (value) {
      return /^1[34578]\d{9}$/.test(value)
    },
    message: '请填写正确的手机格式'
  }
}
