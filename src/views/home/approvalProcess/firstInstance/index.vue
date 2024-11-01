<script>
import {FirstInstanceData} from "@/api/api";

export default {
  name: "firstInstance",
  data() {
    return {
      // 列表数据
      tableData: [],
      // 查询参数
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        name: ""
      }
    }
  },
  mounted() {
    this.getFirstInstanceData()
  },
  methods: {
    async getFirstInstanceData() {
      let res = await FirstInstanceData(this.listQuery)
      let {code, data} = res.data;
      if (code === 20000) {
        this.tableData = data.list;
      }
    }
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
        >
          <template slot-scope="{row}">
            <el-tag :type="row.app_type | categoryStyle"> {{ row.app_type |categoryfilter }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<style scoped>

</style>
