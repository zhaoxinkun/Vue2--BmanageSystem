<script>
export default {
  name: "TableStatusFilter",
  props: {
    tableDataProps: {
      type: Array,
    },
  },
  data() {
    return {}
  },
  mounted() {
    console.log("this.tableDataProps", this.tableDataProps)
  },
  methods: {
    // 筛选处理函数
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
  },
  computed: {
    StatusMenuFilter() {
      // 数组对象的去重
      // 创建map
      let map = new Map();
      // 遍历数据
      for (let item of this.tableDataProps) {
        // 避免修改源数据
        let v = {...item};
        // 看看有没有
        if (!map.has(v)) {
          // 文本格式化,使用我们的过滤器,传入数据
          v.text = this.$options.filters["statusFilter"](v.status)
          // 放进去
          map.set(v.status, v);
        }
      }
      // 放进新的data中
      const data = [...map.values()];
      return data.map(item => ({
        text: item.text,
        value: item.status
      }))
    }
  },
}
</script>

<template>
  <!--        使用子组件-->
  <el-table-column
      prop="status"
      label="审批状态"
      :filters="StatusMenuFilter"
      :filter-method="filterHandler"
  >
    <template slot-scope="scope">
      <!--            使用全局过滤器-->
      <el-tag :type="scope.row.status | statusStyle"> {{ scope.row.status | statusFilter }}</el-tag>
    </template>
  </el-table-column>
</template>

<style scoped>

</style>
