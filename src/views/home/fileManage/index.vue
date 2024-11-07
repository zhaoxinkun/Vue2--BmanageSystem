<script>
import {doc, CreateDoc, DownloadDoc} from "@/api/api";
import Pagination from "@/components/global/my-Pagination/Pagination.vue";
import {getToken} from "@/utils/token";

export default {
  name: "fileManage",
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
      rows: 0,
      dialogVisible: false,
      // 驳回还是通过
      passOrNo: "通过",
    }
  },
  mounted() {
    this.getDoc()
  },
  methods: {
    // 获取列表数据
    async getDoc() {
      let res = await doc(this.listQuery)
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

    // 生成凭证
    async handleCreate(id) {
      let res = await CreateDoc({id})
      let {code} = res.data;
      if (code === 20000) {
        this.$notify({
          title: '生成凭证',
          message: '生成凭证成功',
          type: 'success',
          duration: 1000
        });
        await this.getDoc(); //查询数据
      }

    },
    // 下载凭证
    async handleDownloadDoc(id) {
      let res = await DownloadDoc({id})
      let {code, data} = res.data;
      if (code === 20000) {
        this.$notify({
          title: '下载凭证',
          message: '下载凭证成功',
          type: 'success',
          duration: 1000
        });
        console.log(data.file_path)
        await this.getDoc(); //查询数据
        this.downloadFile(`http://124.223.161.17:5058/static/${data.file_path}`, data.file_path);
      }

    },
    // 下载的流的请求
    downloadFile(url, fileName) {  //第二次请求 获取到文件流
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = "blob"; //blob字节流
      xhr.setRequestHeader('token', getToken()); //传入token
      xhr.send();
      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log(xhr.response)
          this.createA(xhr.response, fileName);
        }
      }
    },
    //动态创建a标签  <!-- <a href="文件的链接地址" download="下载的文件名称"></a> -->
    createA(data, fileName) {
      let _blob = new Blob([data]);
      //window对象下有URL对象作用：专门用来将blob或file读取成url;
      let a = document.createElement('a'); //创建a标签
      a.href = window.URL.createObjectURL(_blob);
      a.download = fileName;  //下载的文件名称
      a.click(); //触发a标签
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

        <el-table-column label="凭证处理">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="success"
                :disabled="scope.row.file_path != null"
                @click="handleCreate(scope.row.id)">生成凭证
            </el-button>
            <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.file_path === null"
                @click="handleDownloadDoc( scope.row.id)">下载凭证
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
            @action="getDoc()"
        ></pagination>

      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>
