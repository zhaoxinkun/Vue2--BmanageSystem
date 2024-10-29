// 暂时不用了,我们使用了递归路由的方式
const approvalApply= {
    // 申请类别 布局组件容器
    path: "/approvalApply",
    name: "approvalApply",
    // 路由二级出口 ,父容器一定要有route-view,渲染子组件
    component: () => import("@/views/HOME/approvalApply/index"),
    children: [
        {
            // 请假审批
            path: "/approvalApply/leaveApply",
            name: "leaveApply",
            // 路由渲染组件
            component: () => import("@/views/HOME/approvalApply/leaveApply/index")
        },
        {
            // 办公审批
            path: "officeApply",
            name: "officeApply",
            component: () => import("@/views/HOME/approvalApply/officeApply/index")
        },
        {
            // 差旅审批
            path: "travelApply",
            name: "travelApply",
            component: () => import("@/views/HOME/approvalApply/travelApply/index")
        }
    ]
}


export default approvalApply
