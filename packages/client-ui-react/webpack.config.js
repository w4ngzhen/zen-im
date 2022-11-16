const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: "development",
  // 组件库的起点入口
  entry: {
    main: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
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
      },
      {
        test: /\.less$/,
        use: [
          // webpack中的顺序是【从后向前】链式调用的
          // 所以对于less先交给less-loader处理，转为css
          // 再交给css-loader
          // 所以注意loader的配置顺序
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'public', 'index.html'),
      inject: "body"
    })
  ],
  devServer: {
    port: 8080
  }
};
