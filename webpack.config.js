const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: './index.js',
	output: {
		path: __dirname + '/dist/',
		filename: './js/canvas.bundle.js'
	},
	module: {
		rules: [{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{ test: /\.(gif|jpg)$/, use: ["file-loader"] },
		]
	},
	plugins: [
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: { baseDir: ['dist'] },
			files: ['./dist/*'],
			notify: false
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html'
		})
	],
	watch: true,
	devtool: 'source-map'
}