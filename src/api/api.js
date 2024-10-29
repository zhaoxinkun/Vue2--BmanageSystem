// 统一接口地址
import http from "./requestType"

export const login = data => http.post(`/user/login`, data)

export const userInfo = data => http.get(`/user/info`)
