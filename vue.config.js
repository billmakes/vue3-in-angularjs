const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  runtimeCompiler: true,
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule("html")
      .test(/\.html$/)
      .use("html-loader")
      .loader("html-loader");
  },
});
