<script>
export default {
  name: "Pagination",
  props: {
    /**
     * 布局选项，指定分页组件的布局。
     * @type {string}
     * @default "total, sizes, prev, pager, next, jumper"
     */
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },

    /**
     * 数据的总条数。
     * @type {number}
     * @required
     * @default 50
     */
    rows: {
      type: Number,
      required: true,
      default: 50
    },

    /**
     * 每页显示的数据条数的可选数组。
     * @type {array}
     * @default [10, 20, 30, 40, 50]
     */
    Sizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50]
    },

    /**
     * 当前页码。
     * @type {number}
     * @default 1
     */
    pageNo: {
      type: Number,
      default: 1
    },

    /**
     *
     * 一页几条
     * @type {number}
     * @default 1
     *
     * */
    defaultSize: {
      type: Number,
      default: 10
    }
  },

  data() {
    return {
      listQuery: {
        pageSize: this.defaultSize,
        pageNo: this.pageNo,
      }
    };
  },

  methods: {
    // 每页多少条变化的函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.listQuery.defaultSize = val;
      this.getList();
    },

    // 页码变化的函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.listQuery.pageNo = val;
      this.getList();
    },

    // 示例：获取数据的方法
    getList() {
      // 这里添加你的数据获取逻辑
    }
  },
}
</script>

<template>
  <!-- 分页器组件 -->

  <div class="block">
    <!--    total 总条数 props-rows -->
    <!--    layout 布局,props-layout -->
    <!--    page-size  props-pageSize 一页共几条-->
    <!--    page-sizes 每页显示的数据条数的可选数组 props-pageSizes 数组 --->
<!--    current-page 当前页数 props-pageNo -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.pageNo"
        :page-sizes="Sizes"
        :page-size="listQuery.pageSize"
        :layout="layout"
        :total="rows">
    </el-pagination>
  </div>
</template>

<style scoped>
/* 你的样式 */
</style>
