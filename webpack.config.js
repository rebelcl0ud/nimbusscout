const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		// The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
		path: path.resolve(__dirname, './public/js/'),
		filename: 'build.js'
	},
	watch: true
}