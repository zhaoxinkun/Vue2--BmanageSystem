import Vue from 'vue'
import App from './App.vue'

// 使用Vue路由
import router from "./router";


// 引入Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 使用Element-ui
Vue.use(ElementUI);


// 引入样式文件
import "@/style/index.scss"

Vue.config.productionTip = false

// 全局组件
import "./components/global/myHello"

import "@/filter"

new Vue({
    router,
    render: h => h(App),

}).$mount('#app')
