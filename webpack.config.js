var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack')
//引入插件模块
var cleanWebpackPlugin = require('clean-webpack-plugin');
//初始化两个实例用于两处规则分别加载
// 文件分离
let extractTextPlugin = require('extract-text-webpack-plugin')
let extractCSS = new extractTextPlugin('css/[name]-one.css');
let extractLESS = new extractTextPlugin('css/[name]-two.css');
module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, './src/js/app.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/bundle-[hash].js'
	},
	devServer: {
		port : 3000,
		inline: true
	},
	module: {
		rules: [
			{
				test: /.css$/, //匹配的文件
				exclude: '/node_modules',
				use:extractCSS.extract([
					/*{loader:'style-loader'},*/
					 {loader: 'css-loader',options: {importLoaders:1 } },
					  {loader: 'postcss-loader'}
				]),
			},
			{
				test: /.less$/,
				use:extractLESS.extract( [
					// {
					// 	loader: 'style-loader',
					// },
					{
						loader: 'css-loader',
						options: {importLoaders :1},
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'less-loader'
					}
				])
			},
			//新增规则，编译js
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			// {
			// 	test: /\.(png|jpg|gif|svg)$/,
			// 	exclude: /node_modules/,
			// 	use: [{
			// 		loader: 'file-loader',
			// 		options: {
			// 			name: '[hash].[ext]',
			// 			outputPath: './assets/',
			// 			publicPath: '../assets/',
			// 			useRelativePath: false
			// 		}
			// 	}]
			// }
			{
				test: /\.(png|jpg|gif|svg)$/i,
				exclude: /node_modules/,
				use: [{
						loader: 'url-loader',
						options: {
								limit: 102400,
								outputPath: 'assets/',
								publicPath: '../assets/',
								useRelativePath: true
						}
				},
				{
					loader: 'image-webpack-loader',
					options:{
						mozhpeg: { //设置对jpg格式图片进行压缩
							progressive: true,
							quality: 65
						}
					}
				}]
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: 'index.html'
		}),
		//初始化插件配置项`
		new cleanWebpackPlugin(),
		extractCSS,
		extractLESS,
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			Popper: ['popper.js', 'default'],
		})
	],
}