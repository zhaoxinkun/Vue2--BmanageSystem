<script>
import {getEmployeeData} from "@/utils/employeeData"
import {city, travelUpdate} from "@/api/api"

export default {
  name: "travelApply",
  data() {
    return {
      // 表单数据
      ruleForm: {
        applicant: '',  //申请人
        created: '', //申请日期
        travel_days: '1', //出差的天数
        money: '',//报销金额
        bill: '',//上传的文件
        destination: '北京市', //出差城市
      },
      // 所有员工数据
      EmployeeData: [],
      rules: {
        applicant: [
          {required: true, message: '请选择申请人', trigger: 'blur'},
        ],
        created: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        money: [
          {required: true, message: '请选择商品', trigger: 'change'}
        ],
        travel_days: [
          {required: true, message: '请输入数量', trigger: 'change'}
        ],
        destination: [
          {required: true, message: '请输入申请原因', trigger: 'change'}
        ]
      },
      options: [],
    }
  },
  async mounted() {
    // 获取员工数据
    try {
      this.EmployeeData = await getEmployeeData();
      if (this.EmployeeData === null) {
        console.log("无数据")
      }
    } catch {
      console.log("获取数据失败")
    }

    await this.getCity()
  },
  methods: {
    // 提交
    submitForm(formName) { //创建数据
      let formData = new FormData();
      for(let k in this.ruleForm){
        if(k==='destination'){
          this.ruleForm['destination'] =this.ruleForm['destination'] .join(',');  //类型转换
        };
        formData.append(k,this.ruleForm[k])
      };
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await travelUpdate(formData);
          let {code} = res.data;
          if(code === 20000){
            await this.$router.push('/approvalManage/travelManage');
          }
        }else {
          return false;
        }
      });
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    // 暂存
    uploadFile(params) { //覆盖默认的上传行为，可以自定义上传的实现
      //暂存
      this.ruleForm.bill = params.file;
    },
    // 文件超出个数
    handleExceed() {
      this.$notify({
        title: '最大上传数为1',
        message: '最大上传数为1',
        type: 'success',
        duration: 2000
      });
    },

    //上传文件之前的钩子，参数为上传的文件  限制上传的格式或大小
    beforeUpload(file) {
      console.log(file);
      const isJPG = file.type === 'image/jpeg';
      const isSize = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('只能上传jpg图片文件');
      }
      if (!isSize) {
        this.$message.error('上传图片大小不能超过');
      }
      return isJPG && isJPG;
    },

    // 获取省市区数据
    async getCity() {
      let res = await city();
      let {code, data} = res.data;
      if (code === 20000) {
        console.log(data)
        this.options = data

        // 构建树形结构
        function buildTree(data, parentId) {
          return data
              .filter(area => area.ParentId === parentId) // 筛选出父级为 parentId 的地区
              .map(area => {
                const children = buildTree(data, area.AreaID); // 查找该地区的子地区
                return {
                  value: area.AreaName2,
                  label: area.AreaName,
                  children: children.length > 0 ? children : undefined // 如果有子地区，则继续构建子树
                };
              });
        }

        this.options = buildTree(this.options, 1)

      }

    },
  }
}
</script>

<template>

  <!--  卡片-->
  <el-card class="box-card">

    <div slot="header" class="clearfix">
      <span>差旅申请</span>
    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="申请人" prop="applicant">
        <el-select v-model="ruleForm.applicant" placeholder="请选择申请人" style="width:100%">
          <el-option v-for="v in EmployeeData" :key="v.key"
                     :label="v.account" :value="v.id"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="申请日期" required>
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.created"
                        style="width: 100%;"></el-date-picker>
      </el-form-item>


      <el-form-item label="出差天数" prop="travel_days">
        <el-input-number v-model="ruleForm.travel_days" :min="1" :max="10" label="申请数量"></el-input-number>
      </el-form-item>

      <el-form-item label="报销金额" prop="money">
        <el-input v-model="ruleForm.money"></el-input>
      </el-form-item>

      <!--
      action 直接提交的地址
      on-preview 点击文件列表中已上传的文件时的钩子
      on-remove 删除文件列表中已上传的文件时的钩子
      http-request  覆盖默认的上传行为，可以自定义上传的实现
      limit 最大上传的个数
      multiple 支持多选
      :on-exceed 文件超出个数限制时的钩子
      before-upload上传文件之前的钩子，参数为上传的文件
              -->
      <el-form-item label="上传发票" prop="bill">
        <el-upload
            class="upload-demo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :http-request="uploadFile"
            :limit="1"
            multiple
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="出差城市" prop="destination">
        <el-cascader
            v-model="ruleForm.destination"
            :options="options"></el-cascader>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即申请</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>

  </el-card>

</template>
