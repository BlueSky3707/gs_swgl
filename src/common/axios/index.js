import axios from 'axios'
import {ElMessage} from 'element-plus'

const instance = axios.create({
    baseURL: '/',
    timeout: 30000,
    withCredentials: true
})

const err = (error) => {
    console.log(Object.prototype.toString.call(error));
    if (error.response) {
        const data = error.response.data
        if (error.response.status === 403) {
            ElMessage({
                message: '服务器发生错误,请您稍后再试',
                type: 'warning',
            })
        }
    }
    return Promise.reject(error)
}

// 添加请求拦截器
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.token = token
    }
    return config
}, err)

// 添加响应拦截器
instance.interceptors.response.use(response => {
    const data = Object.create(response)
    for (const key in response.data) {
        data[key] = response.data[key]
    }
    return data
}, err)

export default instance
