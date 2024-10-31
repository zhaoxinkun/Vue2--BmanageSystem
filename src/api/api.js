// 统一接口地址
import http from "./requestType"

// 用户登录
export const login = data => http.post(`/user/login`, data)

// 用户退出
export const logout = token => http.post(`/user/logout`, token)

// 查询用户分布
export const employMap = token => http.get(`/user/employ-map`, token)

// 查询所有员工列表
export const employee=token=>http.get(`/user/employee`,token)

// 提交申请 --办公申请
/**
 * @param data
 * */
export const officeCreate = data => http.post(`apply/office/createOrUpd`, data)

// 办公审批的数据list
export  const officeList =data=>http.get(`apply/office/list`,data)

export const userInfo = data => http.get(`/user/info`)
