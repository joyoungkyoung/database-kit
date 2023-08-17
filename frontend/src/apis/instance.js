import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 60000
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

const { get, put, post, patch, delete: destroy } = instance

export { get, post, put, patch, destroy }
