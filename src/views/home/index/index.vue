<script>
// 引入图表
import {FangGe, Charts01, ComCharts, Map} from "@/Charts/index";

// 引入图表数据
import {Line, YiBiao,SanDian} from "@/Charts/options"

export default {
  name: "HomeIndex",

  components: {
    FangGe, Charts01, ComCharts, Map
  },
  data() {
    return {
      Line,
      YiBiao,
      SanDian
    }
  },
}
</script>

<template>
  <div class="content">
    <!--    一行两列-->
    <div class="content-row">
      <!--      列-->
      <el-row :gutter="10">

        <!--        行-->
        <el-col :xs="24" :sm="24" :md="16" :lg="16">
          <div class="bg-white bg-purple">
            <FangGe></FangGe>
          </div>
        </el-col>

        <!--        行-->
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="bg-white bg-purple-light">
            <Charts01></Charts01>
          </div>
        </el-col>

      </el-row>
    </div>

    <!--    一行三列-->
    <div class="content-row">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="bg-white bg-purple">
            <ComCharts :options="Line"></ComCharts>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="bg-white bg-purple">
            <ComCharts :options="YiBiao"></ComCharts>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="bg-white bg-purple-light"><ComCharts :options="SanDian"></ComCharts></div>
        </el-col>
      </el-row>
    </div>

    <!--    一行两列-->
    <div class="content-row">
      <!--      列-->
      <el-row :gutter="10">

        <!--        行-->
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="bg-white bg-purple">
            <FangGe></FangGe>
          </div>
        </el-col>

        <!--        行-->
        <el-col :xs="24" :sm="24" :md="16" :lg="16">
          <div class="bg-white bg-purple-light">
            <Map></Map>
          </div>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<style scoped>

</style>
