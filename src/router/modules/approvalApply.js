// 暂时不用了,我们使用了递归路由的方式
const approvalApply = {
    path: "/approvalApply",
    name: "approvalApply",
    component: () => import("@/views/home/approvalApply/index.vue"),
    // 子路由
    children: [
        {
            // 这里的就不能加/,因为是要相对于父路由地址的
            path: "leaveApply",
            name: "leaveApply",
            component: () => import("@/views/home/approvalApply/leaveApply/index.vue")
        },
        {
            // 这里的就不能加/,因为是要相对于父路由地址的
            path: "officeApply",
            name: "officeApply",
            component: () => import("@/views/home/approvalApply/officeApply/index.vue")
        },
        {
            // 这里的就不能加/,因为是要相对于父路由地址的
            path: "travelApply",
            name: "travelApply",
            component: () => import("@/views/home/approvalApply/travelApply/index.vue")
        }
    ]
}


export default approvalApply
