import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// import approvalApply from "@/router/modules/approvalApply";

// 导入路由数据
import RouterData from "@/utils/menuData";
// 导入我们自定义的路由方法
import {initRouter} from "@/utils/routers";

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
        redirect: '/index',
        component: () => import("@/container/index.vue"),  //布局组件

        // 子路由  --已使用递归形式
        // children: [
        //     {
        //         // 这个要加/,因为全局匹配
        //         path: "/index",
        //         name: "index",
        //         component: () => import("@/views/home/index/TableStatusFilter.vue")
        //     },
        //     approvalApply
        // ]
    },
]

// 做路由递归
// 1.遍历路由对象,拿到home
const homeRoutes = routes.filter(v => v.path === "/home")[0]
// console.log("homeRoutes is", homeRoutes)

// 2.然后手动往里添加子集
homeRoutes.children = []

// 3.使用我们的自定义函数,
initRouter(RouterData, homeRoutes.children)

// 创建路由
const router = new VueRouter({
    routes
})


export default router
