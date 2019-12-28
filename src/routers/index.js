import Vue from 'vue'
import Router from 'vue-router'
import applyLeave from './applyLeave'
import mine from './mine'
import login from './login'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  // base:"./",
  routes: [
    applyLeave,
    mine,
    login,
    {
      path:"/*",
      redirect:"/login"
    }
  ]
})
