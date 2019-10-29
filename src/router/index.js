import Vue from 'vue'
import Router from 'vue-router'
import profile from '@/components/Profile'
import login from '@/components/login'
import addEmployee from '@/components/addEmployee'
import listUsers from '@/components/listUsers'
import page404 from '@/components/404'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/404',
      name: '404',
      component: page404

    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/addEmployee',
      name: 'addEmployee',
      component: addEmployee
    },
    {
      path: '/profile/:id',
      name: 'profile/',
      component: profile
    },
    {
      path: '/listUsers',
      name: 'listUsers',
      component: listUsers
    }
  ]
});