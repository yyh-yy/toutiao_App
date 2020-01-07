/*
封装axios
*/
import axios from 'axios'
import jsonBig from 'json-bigint'

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

// 相应拦截器
export default request
