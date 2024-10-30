<script>
// 图表的复用

// 001导入图表模块
import * as echarts from 'echarts';

export default {
  name: "ComCharts",
  // 接收参数
  props: {
    // 宽
    width: {
      type: String,
      default: "100%"
    },
    // 高
    height: {
      type: String,
      default: "300px"
    },
    // 配置项
    options: {
      type: Object,
      default: () => ({
        title: {
          text: "企业图表"
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      })

    }

  },
  data() {
    return {
      // 定义变量,用在存储图标实例.不然无法实现响应式
      myChart: null
    }
  },
  mounted() {
    // 使用init方法.创建图表
    this.init()
    // 图表响应式事件
    window.addEventListener('resize', () => {
      this.myChart.resize()
    })
    console.log(this.options)
  },
  computed: {
    // 样式
    style() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  methods: {
    // 003创建渲染方法
    init() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs.charts01);
      // 实例的配置
      this.myChart.setOption(this.options)
    }
  }
}
</script>

<template>
  <!-- 002创建图表容器 -->
  <div ref="charts01" class="charts01" :style="style" ></div>

</template>

<style scoped>

</style>
