<script>
// list数据请求
import {officeList} from "@/api/api";

export default {
  name: "officeManage",
  data() {
    return {
      // 表格数据
      tableData: [],
      // 查询参数
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        name: ""
      },
      //总条数
      rows: 0,
      // 当前页码
      pages: 0
    }
  },
  mounted() {
    // 挂载的时候先获取数据
    this.getList();
  },
  methods: {
    // 获取审批列表
    async getList() {
      try {
        // 发送请求
        const res = await officeList(this.listQuery);
        let {code, data} = res.data;

        if (code === 20000) {
          this.tableData = data.list;
          console.log("获取办公审批列表成功");
          // 总条数
          this.rows = data.rows;
          this.pages = data.pages;

        } else {
          console.log("获取办公审批列表失败");
        }
      } catch (error) {
        console.error("请求发生错误：", error);
      }

    },

    // 筛选处理函数
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

    // 每页多少条变化的函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.listQuery.pageSize = val;
      this.getList();
    },

    // 页码变化的函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.listQuery.pageNo = val;
      this.getList();
    }

  },
  computed: {
    StatusMenu() {
      // 数组对象的去重
      // 创建map
      let map = new Map();
      // 遍历数据
      for (let item of this.tableData) {
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
  <!--  卡片-->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>办公申请</span>
    </div>


    <div class="filter-container">

      <!--    搜索框  clearable-可清除-->
      <el-input
          prefix-icon="el-icon-search"
          placeholder="请输入查询用户名"
          v-model="listQuery.name"
          @input="getList()"
          clearable
          style="width: 100%;"
          size="medium"
      >
      </el-input>

      <!--表格   stripe-斑马纹-->
      <el-table
          :data="tableData"
          style="width: 100%"
          stripe
      >

        <el-table-column
            fixed
            type="index"
            label="序号"
        >
        </el-table-column>

        <el-table-column
            fixed
            prop="account"
            label="申请人"
            column-key="account"
            :filter-method="filterHandler"
            class="custom-column">
        </el-table-column>

        <el-table-column
            prop="created"
            label="申请时间"
            column-key="created">
        </el-table-column>

        <el-table-column
            prop="apply_goods"
            label="物品名称"
        >
        </el-table-column>

        <el-table-column
            prop="apply_goods_num"
            label="申请数量"
        >
        </el-table-column>

        <el-table-column
            prop="apply_reason"
            label="申请原因"
        >
        </el-table-column>

        <!--        使用子组件-->
        <el-table-column
            prop="status"
            label="审批状态"
            :filters="StatusMenu"
            :filter-method="filterHandler"
        >
          <template slot-scope="scope">
            <!--            使用全局过滤器-->
            <el-tag :type="scope.row.status | statusStyle"> {{ scope.row.status | statusFilter }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
            prop="apply_"
            label="操作"
        >
        </el-table-column>
      </el-table>

    </div>

    <div class="block">

      <!--      size-change每页多少条的函数-->
      <!--      current-change 页码变化的函数-->
      <!--      current-page 当前页码-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.pageNo"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="rows">
      </el-pagination>
    </div>


  </el-card>
</template>

<style scoped>


</style>
