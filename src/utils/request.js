/*
封装axios
*/
import axios from 'axios'
import jsonBig from 'json-bigint'
import store from './storage'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  } return config
}, function (error) {
  return Promise.reject(error)
})
// 相应拦截器
export default request
