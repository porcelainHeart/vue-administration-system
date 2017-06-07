import Vue from 'vue'
import { isType } from '../utils'
const VueProto = Vue.prototype
VueProto._confirm = (tip, fn) => {
  return VueProto.$confirm(tip, '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    fn()
  }).catch(e => {
    let message = '用户取消操作'
    let type = 'info'
    if (isType('error', e)) {
      message = '出现错误'
      type = 'error'
    }
    VueProto.$message({type, message})
  })
}
