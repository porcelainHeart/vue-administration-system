// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import './utils/promise.prototype.finally'
// import 'element-ui/lib/theme-default/index.css'     // 默认主题 白色
// import '../static/element-#19c53e/index.css'           // 原谅绿
import '../static/element-#b779c5/index.css'        // 基佬紫
// import '../static/element-#d0d14e/index.css'        // 土豪金
import 'normalize-css'
import './utils/extendVue'
import Vuerify from 'vuerify'
import rules from './utils/rules'
import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.use(Vuerify, rules)
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
// ===============
// import MockRun from './mock'
// MockRun()
// ===============

export default app
