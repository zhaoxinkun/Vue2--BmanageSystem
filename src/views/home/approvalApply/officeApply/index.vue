<template>
  <!--  from表单-->
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <!--card卡片-->
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span>办公申请</span>
      </div>

      <el-form-item label="申请用户" prop="'applicant">
        <el-select v-model="ruleForm.applicant" placeholder="请选择申请人" style="width: 100%">
          <el-option v-for="val in EmployeeData" :key="val.id" :label="val.account" :value="val.id"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="申请时间" prop="created">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.created"
                        style="width: 100%;"></el-date-picker>
      </el-form-item>


      <el-form-item label="申请物品" prop="apply_goods">
        <el-select v-model="ruleForm.apply_goods" placeholder="请选择申请物品" style="width: 100%">
          <!--          模拟静态数据-->
          <el-option v-for="val in apply_goods" :key="val.key" :label="val.goods_name" :value="val.key"></el-option>

        </el-select>
      </el-form-item>


      <el-form-item label="申请数量" prop="apply_goods_num">
        <el-input-number v-model="ruleForm.apply_goods_num" :min="1" :max="50"
                         label="申请数量"></el-input-number>
      </el-form-item>


      <el-form-item label="申请描述" prop="apply_reason">
        <el-input type="textarea" v-model="ruleForm.apply_reason"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm');open1" plain>立即申请</el-button>
        <el-button @click="resetForm('ruleForm')">取消申请</el-button>
      </el-form-item>

    </el-card>

  </el-form>
</template>

<script>
// 导入模拟的静态数据
import {apply_goods} from "@/utils/selectData";

// 导入所有员工二次封装的数据
import {getEmployeeData} from "@/utils/employeeData";

// 导入提交申请的api
import {officeCreate} from "@/api/api";

export default {
  async mounted() {
    await getEmployeeData();
    // try {
    //   this.EmployeeData = await getEmployeeData()
    //   console.log("所有员工用户data发送成功")
    // } catch (error) {
    //   console.log("失败了", error)
    // }
  },
  data() {
    return {
      // 静态的物品数据
      apply_goods,
      // 员工用户数据
      EmployeeData: [],
      // 数据
      ruleForm: {
        // 用户名
        applicant: "",
        // 时间
        created: "",
        // 物品
        apply_goods: "",
        // 数量
        apply_goods_num: "",
        // 原因
        apply_reason: "",

      },
      // 校验规则
      rules: {
        applicant: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
        ],
        created: [
          {type: 'date', required: true, message: '请选择申请时间', trigger: 'blur'}
        ],
        // apply_goods: [
        //   {required: true, message: '请选择申请的物品', trigger: 'blur'}
        // ],
        type: [
          {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'blur'}
        ],
        apply_goods_num: [
          {required: true, message: '请选择申请数量', trigger: 'blur'}
        ],
        apply_reason: [
          {required: true, message: '请填写申请原因', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    // 提交申请
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let response = await officeCreate(this.ruleForm);
          let {code, data} = response.data;
          if (code === 20000) {

            await this.$router.push("/approvalManage/officeManage")
            console.log("提交数据成功了,别看了,提交时间为", data.created)
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消申请
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 消息弹窗
    open1() {
      this.$notify({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success'
      });
    },
  }

}

</script>


<style scoped lang="scss">

</style>
