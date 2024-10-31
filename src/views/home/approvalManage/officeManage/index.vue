<script>
// list数据请求
import {officeList} from "@/api/api";

import StatusMenu from "@/utils/StatusMenu"
import {statusFilter} from "@/filter/filter";

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
      StatusMenu
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    statusFilter,
    // 获取审批列表
    async getList() {
      try {
        const res = await officeList(this.listQuery);
        let {code, data} = res.data;

        if (code === 20000) {
          this.tableData = data.list;
          console.log("获取办公审批列表成功");
          console.log("草泥马");

        } else {
          console.log("获取办公审批列表失败");
        }
      } catch (error) {
        console.error("请求发生错误：", error);
      }

    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

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
            :filters=StatusMenu
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


  </el-card>
</template>

<style scoped>


</style>
