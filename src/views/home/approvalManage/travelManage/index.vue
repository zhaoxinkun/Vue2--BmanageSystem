<script>

// list数据请求
import {officeDelete, travelDelete, travelList} from "@/api/api";

// 分页器组件
import pagination from "@/components/global/my-Pagination/Pagination.vue";

// 审批状态组件
import TableStatusFilter from "@/components/global/my-TableStatusFilter/TableStatusFilter.vue";

import Dialog from "@/components/global/my-dialog//Dialog.vue"

export default {
  name: "officeManage",
  components: {
    pagination,
    TableStatusFilter,
    Dialog
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      // 查询参数
      listQuery: {
        pageNo: 1,
        // 一页多少个
        pageSize: 10,

      },
      //总条数
      rows: 0,
      // 当前页码
      pages: 0,
      // 用于删除loading框处理
      dialogDelVisible: false,
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
        const res = await travelList(this.listQuery);
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

    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      // 显示提示框
      this.dialogDelVisible = !this.dialogDelVisible;
      // 方式深拷贝
      this.temp = {...row}
    },

    // 删除确定的处理逻辑
    async DeleteData() {
      const res = await travelDelete(this.temp.id);
      let {code} = res.data;
      if (code === 20000) {
        //通知框组件
        this.$notify({
          title: '删除成功',
          message: '删除成功',
          type: "success",
          duration: 1500
        });
        this.dialogDelVisible = !this.dialogDelVisible;
        // 重新刷新数据列表
        await this.getList()
      }
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
            class="custom-column">
        </el-table-column>

        <el-table-column
            prop="created"
            label="申请时间"
            column-key="created">
          <template slot-scope="scope">
            {{ scope.row.created | formatDate }}
          </template>
        </el-table-column>

        <el-table-column
            prop="destination"
            label="出差城市"
        >
        </el-table-column>

        <el-table-column
            prop="money"
            label="报销金额"
        >
        </el-table-column>

        <el-table-column
            prop="travel_days"
            label="出差天数"
        >
        </el-table-column>

        <el-table-column
            prop="bill_name"
            label="发票文件"
        >
        </el-table-column>

        <!--状态筛选组件-->
        <TableStatusFilter
            :tableDataProps="tableData"
        >


        </TableStatusFilter>

        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            <el-button
                size="mini"
                type="primary"
                @click="handleSubmit(scope.$index, scope.row)"
                :disabled="scope.status === 0">提交
            </el-button>
          </template>
        </el-table-column>


      </el-table>

      <Dialog
          :visible.sync="dialogDelVisible"
          @confirm="DeleteData"
      >
      </Dialog>


    </div>

    <!--    使用自己封装的分页器组件-->
    <div class="block">
      <!--    total -rows  总条数-->
      <!--      胜率了layout-->
      <!--     page-size- Size 一页多少个-->
      <!--    page-sizes- Sizes  分页大小-->
      <!--    current-page -pageNo  当前页码-->

      <pagination
          :rows="rows"
          :DataSize.sync="listQuery.pageSize"
          :SizesArray="[5,10,15,20,25,30]"
          :pageNo.sync="listQuery.pageNo"
          @action="getList"
      ></pagination>
    </div>


  </el-card>
</template>

<style scoped>


</style>
