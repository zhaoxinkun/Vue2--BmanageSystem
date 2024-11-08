<script>
export default {
  name: "index",
  data() {
    // 密码校验
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else {
        if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不同'));
        }
        callback();
      }
    };
    return {
      ruleForm: {
        account: '',
        password: '',
        password2: '',
        role_id: '3',  //员工2 审批管理员 3
        permission: [] ,//审批权限分配  一审  二审  终审
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 18, message: '长度必须在3-18位',trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 18, message: '长度必须在3-18位',trigger: 'blur' },
        ],
        password2: [
          { required: true, validator:validatePass, trigger: 'blur' },
        ],
        role_id:[
          { required: true, message: '请选择权限', trigger: 'change' }
        ]
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<template>
  <el-card class="box-card">

    <div slot="header" class="clearfix">
      <span>卡片名称</span>
    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="用户名" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>


      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="password2">
        <el-input v-model="ruleForm.password2"></el-input>
      </el-form-item>

      <el-form-item label="权限分配" prop="role_id">
        <el-radio-group v-model="ruleForm.role_id" size="medium">
          <el-radio label="2" border>员工</el-radio>
          <el-radio label="3" border>审批管理员</el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item label="审批权限分配" prop="permission" v-show="ruleForm.role_id == 2">
        <el-checkbox-group v-model="ruleForm.permission" size="medium">
          <el-checkbox-button label="one" >一审</el-checkbox-button>
          <el-checkbox-button label="two" >二审</el-checkbox-button>
          <el-checkbox-button label="end" >终审</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>

  </el-card>
</template>

<style scoped>

</style>
