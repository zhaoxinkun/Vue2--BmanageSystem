import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 路由对象
const routes = [
    // 进来就重定向
    {
        path: '/',
        redirect: '/login',
    },

    // 登录页路由
    {
        path: '/login',
        name: "login",
        component: () => import('@/views/Login.vue')
    },

    // HOME路由
    {
        path: '/home',  //导航到布局
        name: "home",
        // redirect: '/index',
        component: () => import("@/container/index.vue"),  //布局组件

        // 子路由
        children: [
            {
                // 这个要加/,因为全局匹配
                path: "/index",
                name: "index",
                component: () => import("@/views/home/Index/index.vue")
            },
            {
                path: "/approvalApply",
                name: "approvalApply",
                component: () => import("@/views/home/approvalApply/Index.vue"),

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
            },
        ]
    },
]

// 创建路由
const router = new VueRouter({
    routes
})


export default router
