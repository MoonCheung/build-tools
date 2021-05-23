const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

//第一次小白写webpack配置的，如果遇到有配置变化的话切记写入注释：第二次，第三次，第四次等等
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js'
  },
  module: {
    rules: [{
      //第二次写入配置rule
      enforce: 'pre', //指定为前置类型
      test: /\.jsx?$/, //支持js,jsx条件
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }, {
      test: /\.jsx$/, //支持js 和 jsx
      include: [
        path.resolve(__dirname, 'src')
      ],
      use: 'babel-loader',
    }, {
      test: /\.css$/,
      // include: [
      // 	path.resolve(__dirname, 'src'),
      // ],
      // use: [
      // 	'style-loader',
      // 	'css-loader'
      // ]
      // 使用插件
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'less-loader'
        ]
      })
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
      }]
    }],
  },

  //代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules", // 指定当前目录下的 node_modules 优先查找
      path.resolve(__dirname, './node_modules') // 如果有一些类库是放在一些奇怪的地方的，你可以添加自定义的路径或者目录
    ],
    // 这里的顺序代表匹配后缀的优先级，例如对于 index.js 和 index.jsx，会优先选择 index.js
    extensions: [".js", ".json", ".jsx", ".css", ".less"],
    //第二次写入配置alias
    alias: {
      utils: path.resolve(__dirname, './src/utils'), // 这里使用 path.resolve 和 __dirname 来获取绝对路径
      log$: path.resolve(__dirname, './src/utils/log.js') //只能匹配log
    }
  },

  //webpack插件
  plugins: [
    // new UglifyPlugin(), //使用 uglifyjs-webpack-plugin 来压缩 JS 代码
    new HtmlWebpackPlugin({
      filename: 'index.html', //配置输出文件名和路径
      template: './index.html', //配置文件模板
    }),
    //引入插件，配置文件名，这里同样可以使用[hash].css
    new ExtractTextPlugin('[name].css'),
    //第二次写入配置webpack自带DefinePlugin插件
    new webpack.DefinePlugin({
      TWO: '1+1',
      CONSTANTS: {
        APP_VERSIION: JSON.stringify('1.2.3')
      }
    }),
    //第二次写入配置webpack自带ProvidePlugin插件
    //引用某些模块作为应用运行时的变量，从而不必每次都用 require 或者 import
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    //第二次写入配置CopyWebpackPlugin插件
    new CopyWebpackPlugin([
      { from: './src/assets/favicon.ico', to: 'favicon.ico' }, //from 配置来源，to 配置目标路径
    ])
  ],

  // webpack dev server服务器
  devServer: {
    'port': '3000',
    before(app) {
      app.get('/api/test.json', function(req, res) {
        //当访问/api/test.json 路径时，就会返回JSON数据
        res.json({ code: 200, message: 'hello webpack API' })
      })
    }
  }
}