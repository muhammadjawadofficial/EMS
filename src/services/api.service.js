import axios from 'axios'

import auth from '@/services/auth.service'

import Vue from 'vue'

import toasted from 'vue-toasted'
Vue.use(toasted)

// import router from '../router/index'
// Vue.use(router)

const server = process.env.NODE_SERVER

function errorCheck(error) {
  doconsole(error)
  doconsole(error.response)
  if(error.response)
  {
    if(!error.response.data.status)
    {
      Vue.toasted.global.error()
      return error.response
    }
  }
  Vue.toasted.global.error({ message: 'Check Your Internet Connection and then Try Again!!' })
  // router.replace({
  //   path: '/404'
  // })
}

const ApiService = {

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

  async postCheck(resource, data) {
    try {
      return await axios.post(server + resource, data, auth.getHeaders())
    } catch (error) {
      return errorCheck(error) 
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