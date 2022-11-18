const path = require("path");
module.exports = {
  mode: "development",
  // 组件库的起点入口
  entry: {
    main: './src/index.ts'
  },
  output: {
    filename: "zen-im-client-core.umd.js", // 打包后的文件名
    path: path.resolve(__dirname, 'dist'), // 打包后的文件目录：根目录/dist/
    library: 'zen-im-client-core', // 导出的UMD js会在window挂rui，即可以访问window.rui
    libraryTarget: 'umd' // 导出库为UMD形式
  },
  resolve: {
    // webpack 默认只处理js、jsx等js代码
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  externals: {},
  // 模块
  module: {
    // 规则
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
