import axios from 'axios'
import {getToken} from '../utils/token'

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 12000,
    headers: {
        'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data' // 设置请求头的Content-Type为'multipart/form-data'
      },
})

//请求拦截器
instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      // 将token放入请求头中
      if (token) {
        config.headers.token = token;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  )
  //响应拦截器
  instance.interceptors.response.use(
    (res) => {
      return res.data
    },
    (err) => {
        // 对响应错误做点什么
        if(err.response.status === 401){
          //跳回到登录 reactRouter不支持在组件之外完成跳转
          //需要自己来实现
          window.location.href = '/'
          removeToken()
        }
        return Promise.reject(err)
    }
  )
  

export default instance