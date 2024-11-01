<script>
// list数据请求
import {travelList} from "@/api/api";
import pagination from "@/components/global/my-Pagination/Pagination.vue";
import TableStatusFilter from "@/components/global/my-TableStatusFilter/TableStatusFilter.vue";

export default {
  name: "officeManage",
  components: {
    pagination,
    TableStatusFilter,
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

    // 筛选处理函数
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      // 显示提示框
      this.dialogDelVisible = !this.dialogDelVisible;
      // 方式深拷贝
      this.temp = {...row}
    },

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

        <!--筛选组件-->
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

                <el-table-column
                    prop="apply_"
                    label="操作"
                >
                </el-table-column>


      </el-table>

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
