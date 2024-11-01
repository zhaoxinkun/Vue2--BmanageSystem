// 统一接口地址
import http from "./requestType"

// 用户登录
export const login = data => http.post(`/user/login`, data)

// 用户退出
export const logout = token => http.post(`/user/logout`, token)

// 查询用户分布
export const employMap = token => http.get(`/user/employ-map`, token)

// 查询所有员工列表
export const employee = token => http.get(`/user/employee`, token)

// 审批类别---办公申请
// 提交申请 --办公申请
/**
 * @param data
 * */
export const officeCreate = data => http.post(`apply/office/createOrUpd`, data)


// 差旅审批的数据list
export const travelList = data => http.get(`apply/travel/list`, data)

export const userInfo = data => http.get(`/user/info`)

// 申请管理----办公管理-------------------------

// 办公管理的数据list
export const officeList = data => http.get(`apply/office/list`, data)

// 申请管理 --办公管理-提交-------------------------
/**
 * @param data
 * */
export const officeSubmit = data => http.post(`apply/office/submitToApprove`, data)

// 申请管理 --办公管理-提交-------------------------
/**
 * @param id
 * */
export const officeDelete = id => http.delete(`apply/office/delete/${id}`)


// 审批管理
export const FirstInstanceData=data=>http.get(`approve/one/list`, data)
