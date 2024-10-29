<script>
import BreadCrumb from "@/container/components/Header/BreadCrumb.vue";
import LogOut from "@/container/components/Header/LogOut.vue";
import Lang from "@/container/components/Header/Lang.vue"
// 头部组件
export default {
  name: "Header",
  components: {BreadCrumb, LogOut, Lang},
}
</script>

<template>
  <div class="app-breadcrumb">
    <!--    面包屑-->
    <BreadCrumb></BreadCrumb>
    <!--    右侧按钮-->
    <div class="right-menu">
      <LogOut></LogOut>
      <Lang></Lang>
    </div>

  </div>
</template>

<style scoped>

</style>
