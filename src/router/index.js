import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login.vue'
import Client from '../pages/Client'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Client
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/client',
      name: 'Client',
      component: Client
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log('to', to)
  let userInfo = window.localStorage.getItem('userInfo')
  userInfo = JSON.parse(userInfo)
  if (to.path !== '/login') {
    if (userInfo) {
      return next()
    } else {
      return next('/login')
    }
  }
  next()
})
export default router
