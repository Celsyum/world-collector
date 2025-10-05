const path = require ("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./app.ts",
	output: {
		path: path.resolve (__dirname, "../client/public"),
		filename: "app.js"
	},
	devServer: {

    static: './../client/public',

  },
	target: "web",
	
	resolve: {
		alias: {
			"openfl": path.resolve (__dirname, "../../node_modules/openfl/lib/openfl"),
			"motion": path.resolve (__dirname, "../../node_modules/actuate/lib/motion")
		},
		extensions: ['.tsx', '.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				"public"
			]
		})
	],
	performance: {
		hints: false
	}
};