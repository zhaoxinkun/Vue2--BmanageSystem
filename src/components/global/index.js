//1、index.js 处理所有的文件，生成全局组件
import Vue from 'vue'
//读取的文件的路径
const conText = require.context('./',true,/\.js$/); //查找文件路径,是否查找子目录,正则匹配

console.log(conText.keys());
//循环集合  
conText.keys().forEach(item=>{
    const componentConfig = conText(item);//获取组件配置 
    //加载全局组件 
    const module = componentConfig.default || componentConfig;
    if(module?.name){
        Vue.component(module.name,module)
    }
})

