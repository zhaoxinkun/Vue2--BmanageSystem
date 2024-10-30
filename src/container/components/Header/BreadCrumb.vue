<script>
export default {
  name: "BreadCrumb",
  data() {
    return {
      // 存储路由数据
      RouteData: []
    }
  },
  mounted() {
    // console.log(this.$route.path)  //index,因为重定向了
    // console.log("this.$route.matched",this.$route.matched) //这里其实是两个
    this.RouteData = this.$route.matched  //这里也是,但是第一个没有meta.title
  },
  watch: {
    $route(newVal) {
      // 监听路由的变化
      // console.log("newVal matched is", this.$route.matched)
      this.RouterMatchedHandle(newVal.matched)
    }
  },
  methods: {
    RouterMatchedHandle(info) {
      // console.log("info", info)
      // console.log("info", info[0])

      // 判断是不是首页
      // if (info?.[1].name === "home") {
      //   // 是的话,替换掉他的数据,变为,只有一个
      //   info = [{
      //     path: "/home", name: "home", meta: {
      //       title: "企业首页"
      //     }
      //   }]
      // }
      // 赋值
      this.RouteData = info;
    }

  }
}
</script>

<template>
  <el-breadcrumb separator="/">
    <span> <i class="el-icon-s-home"> </i>当前位置:</span> &nbsp;&nbsp;
    <el-breadcrumb-item v-for="v in RouteData"> {{ v.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>

</style>
