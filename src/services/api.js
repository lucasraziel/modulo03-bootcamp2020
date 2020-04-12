import axios from 'axios'

const api = axios.create({
  baseURL:'http://172.29.26.66:3333'
})

export default api