<script>
// 侧边导航递归组件
export default {
  name: "SidebarItem",
  // 接收的数据
  props: ["item"]
}
</script>

<template>

  <div>
    <!--无子集-->
    <el-menu-item :index="item.url" v-if="!item.children">
      <i :class="item.icon"></i>
      <span slot="title" class="title">{{ item.title }}</span>
    </el-menu-item>

    <!--      有子集-->
    <el-submenu :index="item.url" v-else>
      <template slot="title">
        <i :class="item.icon"></i>
        <span class="title">{{ item.title }}</span>
      </template>


      <!--      这里进行递归组件,最后传递的是第二次的数据(children)-->
      <SidebarItem v-for="sub in item.children" :key="sub.url" :item="sub"></SidebarItem>

    </el-submenu>
  </div>

</template>
