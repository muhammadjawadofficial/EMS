// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
// import 'jwt-decode'
window.jwtDecode = require('jwt-decode');

// import VueSession from 'vue-session'
// Vue.use(VueSession)

import VModal from 'vue-js-modal'
Vue.use(VModal)
// Vue.use(VModal, { dialog: true })

import 'axios'
window.axios = require('axios');

Vue.config.productionTip = false

import vueSmoothScroll from 'vue2-smooth-scroll'
Vue.use(vueSmoothScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app', 
  router,
  components: { App },
  template: '<App/>'
})
