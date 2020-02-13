/*
封装axios
*/
import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'
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
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  if (error.response && error.response.status === 401) {
    // 1.如果没有refresh_token,则直接登录
    const user = store.state.user
    if (!user || !user.refresh_token) {
      redirectLogin()
      return
    }

    // 2.如果有，则发请求更新 token
    try {
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
          // Authorization: `Bearer ${user.refresh_token}`
        }
      })
      console.log(data)

      store.commit('setUser', {
        ...user, // ... 对象展开操作符
        token: data.data.token
      })

      // 4.把失败的请求发出去

      return request(error.config)
    } catch (error) {
      console.log('刷新token失败')
      redirectLogin()
    }
  }

  // 跳转登录也
  function redirectLogin () {
    router.push({
      name: 'login',
      query: {
        // router.currentRoute.fullPath想当于当前路由对象，像我们在组件中的this.$router
        redirect: router.currentRoute.fullPath
      }
    })
  }
  return Promise.reject(error)
})
export default request
