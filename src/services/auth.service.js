import {TokenService} from '@/services/storage.service'

  const auth = {
    getHeaders() {
      return {
        headers: {
          'x-auth-token': TokenService.getToken(),
          'Content-Type': 'application/json'
        }
      }
    }
  }


  export default auth