import axios from "@/utils/requestConfig"

// 请求方式的封装

const http = {
    // get请求
    get: (url, params) => axios.get(url, {params}),
    post: (url, params) => axios.post(url, params),
    put: (url, data) => axios.put(url, data),
    patch: (url, data) => axios.patch(url, data),
    delete: (url, params) => axios.delete(url, params),
}

export default http;
