<script>
import {FirstInstanceData, FirstPass, FirstReject} from "@/api/api";
import Pagination from "@/components/global/my-Pagination/Pagination.vue";
import Dialog2 from "@/components/global/my-dialog2/Dialog2.vue";

export default {
  name: "firstInstance",
  components: {Dialog2, Pagination},
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
      rows: 0,
      dialogVisible: false,
      // 驳回还是通过
      passOrNo: "通过"
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

    // 点击通过或驳回
    handleSubmit(row, type) {
      this.temp = {...row}
      this.passOrNo = type;
      this.dialogVisible = true;
    },
    //提交通过或驳回
    async confirm() {
      //传的参数 app_id,app_type,id 传给服务端
      let {app_id, app_type, id} = this.temp;
      this.passOrNo === '通过' ?
          await FirstPass({app_id, app_type, id})
          :
          await FirstReject({app_id, app_type, id});
      this.$notify({
        title: '一审',
        message: '操作成功',
        type: 'success',
        duration: 1000
      });
      this.dialogVisible = false;
      await this.getFirstInstanceData(); //查询数据
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
        // 判断一下
        if (!map.has(v)) {
          // 文本格式化,使用我们的过滤器,传入数据
          v.text = this.$options.filters["categoryfilter"](v.app_type)
          // console.log(" v.text is ", v.text)
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
                @click="handleSubmit( scope.row,'通过')">通过
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleSubmit( scope.row,'驳回')">驳回
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <Dialog2
          :dialog-btn="passOrNo"
          :dialog-title="passOrNo"
          :visible.sync="dialogVisible"
          @confirm="confirm"
      >
      </Dialog2>

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
