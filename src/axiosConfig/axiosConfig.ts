import axios from 'axios'
import { history } from 'utils'
import getBaseUrl from './axiosEnv'
const service = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    let token = window.token
    config.headers.Authorization = token
    return config
  },
  error => {
    // 对请求错误做些什么
    // message.warn('系统繁忙')
    console.log(error)
    return Promise.reject(error)
  }
)
// 添加响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 权限判断,权限code待定
    if (res.code === 'F404') {
      // message.warning('对不起,你没有权限访问');
      history.push('/login')
    }
    return res
  },
  error => {
    // 对请求错误做些什么
    // message.warn('系统繁忙');
    console.log(error)
    return Promise.reject(error)
  }
)
export default service
