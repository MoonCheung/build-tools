const path = require('path');
const glob = require('glob');
const webpack = require('webpack'); // new webpack 自带配置
const UglifyJsPlugins = require('uglifyjs-webpack-plugin'); //js压缩
const HtmlPlugins = require('html-webpack-plugin');  //HTML插件
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css分离文件
const PurifyCSSPlugin = require('purifycss-webpack') //净化无用CSS
const copyWebpackPlugin = require('copy-webpack-plugin');
// const entry = require('./webpack_config/entry_webpack.js'); //个人webpack设置

// console.log( encodeURIComponent(process.env.type) );
if(process.env.type=="build"){
	var website = {
		publicPath:"http://www.salvador23.com:1717/"
	}
}else{
	var website = {
		publicPath:"http://192.168.0.131:1717/"
	}
}


module.exports = {
	// source map只适用于开发阶段
	devtool:'eval-source-map',
	//入口文件的配置项
	entry: {
		entry: './src/entry.js',
		jquery: 'jquery',
		vue: 'vue',
	},
	//出口文件的配置项
	output: {
		path:path.resolve(__dirname,'dist'),
		filename:'[name].js',
		publicPath:website.publicPath
	},
	//模块：例如解读CSS,图片如何转换，压缩
	module: {
		rules: [{
			test: /\.css$/,
			// use: [
			// 	{loader: "style-loader"},
			// 	{loader: "css-loader", options: {modules: true}}
			// ]
			//打包出CSS分离:
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [
					{loader: 'css-loader',options:{importLoaders:1} },
					'postcss-loader'
				]
			})
		},{
			test: /\.(png|jpg|gif)/,
			use: [
				{loader: "url-loader",
				options:{
					limit: 5000,
					outputPath: 'images/'
				}}
			]
		},{
			test: /\.(htm|html)/,
			use: ['html-withimg-loader']
		},{
			test:/\.less$/,
			// use:[
			// 	{loader:"style-loader"},
			// 	{loader:"css-loader"},
			// 	{loader:"less-loader"}
			// ]
			//打包出less分离:
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [
					{loader:"css-loader"},
					{loader:"less-loader"}
				]
			})
		},{
			test:/\.scss$/,
			// use: [
			// 	{loader:"style-loader"},
			// 	{loader:"css-loader"},
			// 	{loader:"sass-loader"}
			// ]
			//打包出scss分离:
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [
					{loader:"css-loader"},
					{loader:"sass-loader"}
				]
			})
		},{
			test:/\.(jsx|js)$/,
			use: {
				loader: 'babel-loader',
			},
			exclude: /node_modules/
		}]
	},
	//插件，用于生产模版和各项功能
	plugins:[
		new webpack.optimize.CommonsChunkPlugin({
			name: ['jquery','vue'],
			filename: 'assets/js/[name].js',
			minChunks: 2
		}),
		new webpack.ProvidePlugin({ //优化第三方类库
			$: "jquery",
			JQuery: "jquery"
		}), 
		//new BannerPlugin插件就是我们的版权或者开发者声明
		new webpack.BannerPlugin('webpack 保护我的版权，测试中!'),
		new webpack.HotModuleReplacementPlugin(),
		//专门为我们作静态资源转移的插件
		new copyWebpackPlugin([{
			from: __dirname+'/src/public',
			to: './public'
		}]),
		// new UglifyJsPlugins() //js压缩
		new HtmlPlugins({
			minify:{
				removeAttributeQuotes: true
			},
			hash: true,
			template: './src/index.html'
		}),
		new ExtractTextPlugin("/css/index.css"),
		new PurifyCSSPlugin({
			paths:glob.sync(path.join(__dirname,'src/*.html')),
		}),
		
	],
	//配置webpack开发服务功能
	devServer:{
		contentBase: path.resolve(__dirname,'dist'),
		host: '192.168.0.131',
		compress: true,
		port: 1717
	},
	watchOptions: {
		//检测修改的时间，以毫秒为单位
		aggregateTimeout: 300,
		//防止重复保存而发生重复编译错误。这里设置的500是半秒内重复保存，不进行打包操作
		poll: 1000,
		//不监听的目录
		ignored:/node_modules/
	}
}