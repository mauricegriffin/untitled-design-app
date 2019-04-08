const path = require("path");

module.exports = {
  lintOnSave: undefined,
  publicPath: undefined,
  outputDir: undefined,
  assetsDir: 'assets',
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,

  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: `
  //         @import "@/styles/_settings.scss";
  //       `
  //     }
  //   }
  // },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/_settings.scss")]
    }
  },

  // css: {
  //   extract: false
  // },

  pwa: {
    name: 'Untitled: Web Design Inspiration',
    themeColor: '#571018'
  }
}