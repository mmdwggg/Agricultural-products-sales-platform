import axios from 'axios'

const baseUrl = 'https://v0.yiketianqi.com/api'
    // 传送json格式的post请求
    // export const postRequest = (url, params) => {
    //   return axios({
    //     url: `${baseUrl}${url}`,
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    //     data: qs.stringify(params)
    //   })
    // }
    // 传送json格式的get请求
export const getRequest = (params) => {
    return axios({
        url: `${baseUrl}`,
        method: 'get',
        params: params
    })
}