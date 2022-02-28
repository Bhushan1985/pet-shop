import axios from 'axios'

const LOGIN_URL = 'https://pet-shop.buckhill.com.hr/api/v1/admin/login'

export class IdentityService {
  async logIn () {
    try {
      const { data } = await axios.post(LOGIN_URL, {email: 'admin@buckhill.co.uk', password: 'admin'})
      localStorage.setItem('principal', data.data.token)
    } catch(err) {
      localStorage.removeItem('principal')
    }
  }
}

const service = new IdentityService()
export default service
