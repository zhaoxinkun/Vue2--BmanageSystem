<script>
// 侧边导航组件

// 使用菜单小组件
import SidebarItem from './SidebarItem.vue'

// 导入菜单数据
import items from "@/utils/menuData";

export default {
  name: "Sidebar",
  components: {
    SidebarItem
  },
  data() {
    return {
      // 本地化数据
      items
    }
  }
}
</script>

<template>
  <el-aside width="200px" class="aside">

    <!--    菜单栏-->
    <!--    :default-active="$route.path" exact   获取路由地址,并精确匹配-->
    <el-menu
        :default-active="$route.path" exact
        class="el-menu-vertical-demo" router
    >

      <!--      递归组件,并把拿到的数据,传递下去-->
      <SidebarItem v-for="item in items" :key="item.url" :item="item"></SidebarItem>

    </el-menu>


  </el-aside>
</template>

<style scoped>

</style>
