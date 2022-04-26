const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭 eslint
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' },
      },
      '/mock': {
        target: 'http://127.0.0.1:4523/mock/898860/api',
        pathRewrite: { '^/mock': '' },
      },
    },
  },
})
