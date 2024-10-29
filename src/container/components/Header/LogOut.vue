<script>
import {getToken, removeToken} from "@/utils/token";
import {logout} from "@/api/api";

export default {

  name: "LogOut",
  data() {
    return {
      // 1.创建变量存储token
      token: ""
    }
  },
  mounted() {
    // 2.获取token
    this.token = getToken();
    console.log("logout token is", this.token)
  },
  methods: {
    // 点击事件
    logOut() {
      // 发送请求
      logout(this.token).then(() => {
        // 移除token
        removeToken(this.token)
        // 跳转路由
        this.$router.push("/login")
      }).catch(error => {
        return console.log(error)
      })


    }
  }
}
</script>

<template>
  <el-button type="danger" @click="logOut" size="mini">退出</el-button>
</template>

<style scoped>

</style>
