var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './js/app.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'app.bundle.js'
	},
	module: {
        rules: [
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
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map'
};
