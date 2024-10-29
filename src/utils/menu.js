// 左边菜单公共数据
// 无限极递归的数据

export default [
    {
        title: "企业首页",
        url: "/index",
        icon: "el-icon-menu",
        name: "index",
        component: "index",
    },
    {
        title: "审批类别",
        url: "/approvalApply",
        icon: "el-icon-coin",
        name: "approvalApply",
        component: "approvalApply",
        // 子数据
        children: [
            {
                title: "办公申请",
                url: "/approvalApply/officeApply",
                icon: "el-icon-shopping-bag-2",
                name: "officeApply",
                component: "approvalApply/officeApply"
            },

            {
                title: "差旅申请",
                url: "/approvalApply/travelApply",
                icon: "el-icon-s-promotion",
                name: "travelApply",
                component: "approvalApply/travelApply"
            },
            {
                title: "请假申请",
                url: "/approvalApply/leaveApply",
                icon: "el-icon-chat-dot-square",
                name: "leaveApply",
                component: "approvalApply/leaveApply"
            },
        ]
    },
    {
        title: "档案管理",
        url: "/approvalManage",
        icon: "el-icon-s-order",
        name: "approvalManage",
        component: "approvalManage",
        // 子数据
        children: [
            {
                title: "办公管理",
                url: "/approvalManage/officeManage",
                icon: "el-icon-shopping-bag-2",
                name: "officeManage",
                component: "approvalManage/officeManage"
            },

            {
                title: "差旅管理",
                url: "/approvalManage/travelManage",
                icon: "el-icon-s-promotion",
                name: "travelManage",
                component: "approvalManage/travelManage"
            },
            {
                title: "请假管理",
                url: "/approvalManage/leaveManage",
                icon: "el-icon-chat-dot-square",
                name: "leaveManage",
                component: "approvalManage/leaveManage"
            },
        ]
    },
    {
        title: "全局组件",
        url: "/globalCOM",
        icon: "el-icon-menu",
        name: "globalCOM",
        component: "globalCOM",
    },
]
