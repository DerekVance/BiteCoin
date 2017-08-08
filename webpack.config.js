var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		main: './js/app.js',
		vendor: ['react','react-dom', 'lodash']
	},
	output: {
	   path: path.join(__dirname, 'static'),
	   filename: '[name].js',
	   publicPath: '/static/'
   },
	module: {
		rules: [
			{
				test: require.resolve('react'),
				use: 'expose-loader?React'
			},
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					query: {
						presets: ['es2015', 'react']
					}
				}]
			},
			{
				test: /\.gif$/,
				use: [{
					loader: 'url-loader?mimetype=image/png'
				}]
			},
			{
				test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
				use: [{
					loader: 'url-loader?mimetype=application/font=woff'
				}]
			},
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				use: [{
					loader: 'file-loader?name=[name].[ext]'
				}]
			},
			{
				test: /\.css$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader" // translates CSS into CommonJS
				}]
			}]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map'
};
