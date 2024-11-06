<script>
import {FirstInstanceData} from "@/api/api";
import Pagination from "@/components/global/my-Pagination/Pagination.vue";

export default {
  name: "firstInstance",
  components: {Pagination},
  data() {
    return {
      // 列表数据
      tableData: [],
      // 查询参数
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        name: ""
      },
      // 共多少条
      rows: 0
    }
  },
  mounted() {
    this.getFirstInstanceData()
  },
  methods: {
    // 获取列表数据
    async getFirstInstanceData() {
      let res = await FirstInstanceData(this.listQuery)
      let {code, data} = res.data;
      if (code === 20000) {
        this.tableData = data.list;
        this.rows = data.rows;
      }
    },

    // 筛选处理函数
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
  },
  computed: {
    ApprovalCategory() {
      // 创建map
      let map = new Map();
      // 遍历数据
      for (let item of this.tableData) {
        // 放进去每一个数据,避免修改数据源
        let v = {...item};
        console.log(v)
        // 判断一下
        if (!map.has(v)) {
          // 文本格式化,使用我们的过滤器,传入数据
          v.text = this.$options.filters["categoryfilter"](v.app_type)
          console.log(" v.text is ", v.text)
          // 放进去
          map.set(v.app_type, v);
        }
      }
      // 放进新的data中
      const data = [...map.values()];
      return data.map(item => ({
        text: item.text,
        value: item.status
      }))
    }
  }
}
</script>

<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>一审</span>
      </div>

      <el-input v-model="listQuery.name" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>


      <el-table
          :data="tableData"
          stripe
          style="width: 100%">

        <el-table-column
            fixed
            type="index"
            label="序号"
            width="180">
        </el-table-column>

        <el-table-column
            prop="account"
            label="申请人"
            width="180">
        </el-table-column>

        <el-table-column
            prop="created"
            label="申请时间"
            width="180"
            column-key="created">
          <template slot-scope="scope">
            {{ scope.row.created | formatDate }}
          </template>
        </el-table-column>

        <el-table-column
            prop="app_type"
            label="申请类别"
            :filters="ApprovalCategory"
            :filter-method="filterHandler"
        >
          <template slot-scope="{row}">
            <el-tag :type="row.app_type | categoryStyle"> {{ row.app_type |categoryfilter }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)">通过
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">驳回
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <!--      分页器-->
      <div class="block">
        <pagination
            :rows="rows"
            :DataSize.sync="listQuery.pageSize"
            :SizesArray="[5,10,15,20,25,30]"
            :pageNo.sync="listQuery.pageNo"
            @action="getFirstInstanceData"
        ></pagination>

      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>
