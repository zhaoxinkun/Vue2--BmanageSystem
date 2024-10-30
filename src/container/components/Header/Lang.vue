<script>
export default {
  name: "Lang"
}
</script>

<template>
  <el-dropdown size="mini" split-button type="primary" class="el-dropdown">
    小型尺寸
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>黄金糕</el-dropdown-item>
      <el-dropdown-item>狮子头</el-dropdown-item>
      <el-dropdown-item>螺蛳粉</el-dropdown-item>
      <el-dropdown-item>双皮奶</el-dropdown-item>
      <el-dropdown-item>蚵仔煎</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<style scoped>
.el-dropdown{
   margin-left: 10px;
}

</style>
