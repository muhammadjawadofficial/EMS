import axios from 'axios'
import {
  TokenService
} from '@/services/storage.service'
import auth from '@/services/auth.service'

import Vue from 'vue'
import toasted from 'vue-toasted'
Vue.use(toasted)
import router from '@/router'
Vue.use(router)

const server = process.env.NODE_SERVER

function errorCheck(error) {
  // if (!error.response || !error.response.success) {
    // console.log('network error')
    Vue.toasted.global.error()
    console.log(error.response)
    // router.replace({
    //   path: '/404'
    // })
    return error.response
  // }
  //   else if (!error.response.success)
  //     console.log('something went wrong')
}

const ApiService = {

//   init(baseURL) {
//       axios.defaults.baseURL = baseURL;
//     },

//   setHeader() {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`
//     },

//   removeHeader() {
//       axios.defaults.headers.common = {}
//     },

//   get(resource) {
//     return axios.get(resource, headers)
//   },

//   post(resource, data) {
//     return axios.post(resource, data, headers)
//   },

//   patch(resource, data) {
//     return axios.patch(resource, data, headers)
//   },

//   put(resource, data) {
//     return axios.put(resource, data, headers)
//   },

//   delete(resource) {
//     return axios.delete(resource, headers)
//   },

  async get(resource) {
    try {
      return await axios.get(server + resource, auth.getHeaders())
    } catch (error) {
      errorCheck(error) 
    }
  },

  async post(resource, data) {
    try {
      return await axios.post(server + resource, data, auth.getHeaders())
    } catch (error) {
      errorCheck(error) 
    }
  },

  async patch(resource, data) {
    try {
      const response = await axios.patch(server + resource, data, auth.getHeaders())
      Vue.toasted.global.update()
      return response
    } catch (error) {
      errorCheck(error) 
    }
    // return axios.patch(resource, data, headers)
  },

  async put(resource, data) {
    try {
      const response = await axios.put(server + resource, data, auth.getHeaders())
      return response
    } catch (error) {
      errorCheck(error) 
    }
    // return axios.put(resource, data, headers)
  },

  async delete(resource) {
    try {
      const response = await axios.delete(server + resource, auth.getHeaders())
      return response
    } catch (error) {
      errorCheck(error) 
    }
    // return axios.delete(resource, headers)
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data)
  }
}

export default ApiService