const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // dev配置
  devServer: {
    open: true,
    port: 8080,
    host: 'localhost',
  }
  // 使用scss
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       additionalData: `@import "~@/styles/index.scss";`
  //     },
  //   },
  // },
})
