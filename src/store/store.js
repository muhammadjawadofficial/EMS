import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import UserService from '@/services/user.service'
import {
  TokenService
} from '@/services/storage.service'

export const store = new Vuex.Store({
  state: {
    USERID: null,
    USERNAME: '',
    USERIMAGE: '',
    USERROLE: ''
  },
  getters: {
    USERID: state => state.USERID,
    USERNAME: state => state.USERNAME,
    USERIMAGE: state => state.USERIMAGE,
    USERROLE: state => state.USERROLE
  },
  mutations: {
    SET_USERID: (state, payload) => {
      state.USERID = payload
    },
    SET_USERNAME: (state, payload) => {
      state.USERNAME = payload
    },
    SET_USERIMAGE: (state, payload) => {
      state.USERIMAGE = payload
    },
    SET_USERROLE: (state, payload) => {
      state.USERROLE = payload
    }
  },
  actions: {
    SET_USER_INFO: async (context) => {
      const response = await UserService.getUserDetails(TokenService.getCurrentEmployeeId())
      const data = response.data.data
      context.commit('SET_USERID', data.id)
      context.commit('SET_USERNAME', data.firstName + ' ' + data.lastName)
      context.commit('SET_USERIMAGE', data.image.data)
      context.commit('SET_USERROLE', TokenService.getIsAdmin())
    },
  }
})