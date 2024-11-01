<script>
// 总体布局组件

// 分别导入头部,中心,侧边栏 组件
import {Sidebar, Header, Main} from "@/container/components";

export default {
  name: "layoutIndex",
  // 组件注册
  components: {Sidebar, Header, Main},

}
</script>

<template>

  <div class="app-wrapper">
    <el-container>
      <!--左侧导航-->
      <Sidebar></Sidebar>

      <el-container>
        <!--        头部-->
        <el-header>
          <Header></Header>
        </el-header>

        <!--        主体-->
        <el-main>
          <!--          <Main></Main>-->
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>

  </div>
</template>
