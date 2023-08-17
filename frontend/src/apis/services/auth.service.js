import { post } from '@/apis/instance'
import { Endpoint } from '../endpoint'

export default {
  login: async function (username, password) {
    const response = await post(Endpoint.Login, { username, password })
    return response.data
  }
}
