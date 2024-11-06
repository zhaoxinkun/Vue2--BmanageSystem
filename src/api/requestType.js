import axios from "@/utils/requestConfig"

// 请求方式的封装

const http = {
    // get请求
    get: (url, params) => axios.get(url, {params}),
    // post请求
    post: (url, params) => axios.post(url, params),
    // put请求
    put: (url, data) => axios.put(url, data),

    patch: (url, data) => axios.patch(url, data),
    // 删除请求
    delete: (url, params) => axios.delete(url, params),
}

export default http;
