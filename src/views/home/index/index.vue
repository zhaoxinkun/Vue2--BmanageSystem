<script>
import {userInfo} from "@/api/api";

export default {
  name: "HomeIndex",
  created() {
    // userInfo().then(res => console.log("userInfo", res));

  }
}
</script>

<template>
  <div class="content">
    <!--    一行两列-->
    <div class="content-row">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="bg-white bg-purple">11</div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="16" :lg="16">
          <div class="bg-white bg-purple-light">22</div>
        </el-col>
      </el-row>
    </div>

    <!--    一行三列-->
    <div class="content-row">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="bg-white bg-purple">11</div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="bg-white bg-purple">11</div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="bg-white bg-purple-light">22</div>
        </el-col>
      </el-row>
    </div>

    <!--    一行两列-->
    <div class="content-row">

      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-col>
            <div class="bg-white bg-purple">11</div>
          </el-col>

          <el-col>
            <div class="bg-white bg-purple">11</div>
          </el-col>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <div class="bg-white bg-purple-light">22</div>
        </el-col>

      </el-row>

    </div>
  </div>
</template>

<style scoped>

</style>
