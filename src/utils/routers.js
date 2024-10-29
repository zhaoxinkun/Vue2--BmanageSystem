/**
 * #递归路由方法
 * 传入两个参数
 * @param RouterData {Object}  --this is 路由的树形数据
 * @param targetArray {Array} 我们自己创建的需要往里添加的home的children数组
 *
 * */

export function initRouter(RouterData, targetArray) {
    console.log("RouterData is", RouterData)
    // 遍历传入的 RouterData 数组，每个 item 是一个路由节点
    RouterData.forEach(item => {

        // 定义添加到路由配置中的对象模板
        const routesObj = {
            path: item.url, // 路由的路径
            name: item.name, // 路由的名称
            meta: {
                //路由元信息
                title: item.title
            },
            component: () => import(`@/views/home/${item.component}/index.vue`) // 路由对应的组件
        }

        // 判断 targetArray 是不是数组（即当前处理的是不是根路由层级）
        if (targetArray instanceof Array) {
            // 如果是数组（根层级），直接将 routesObj 添加进去
            targetArray.push(routesObj);
        } else {
            // 如果不是数组（子路由），判断 children 属性是否存在，不存在则创建
            if (!targetArray.children) {
                targetArray.children = [];
            }
            // 将 routesObj 添加到子路由的 children 中
            targetArray.children.push(routesObj);
        }

        // 如果当前路由节点有子节点，递归调用 initRouter 处理子节点
        if (item.children) {
            initRouter(item.children, routesObj)
        }
    });
}
