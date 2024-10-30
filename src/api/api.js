// 统一接口地址
import http from "./requestType"

// 用户登录
export const login = data => http.post(`/user/login`, data)

// 用户退出
export const logout = token => http.post(`/user/logout`, token)

// 查询用户分布

export const employMap = token => http.get(`/user/employ-map`, token)

export const userInfo = data => http.get(`/user/info`)
