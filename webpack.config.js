const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './rsk-conversion-utils.js',
    mode: 'production',
    output: {
        path: __dirname + '/build/lib',
		filename: 'rsk-conversion-utils.js',
		libraryTarget: 'var',
		library: 'RSKUtils'
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['css-loader'] },
            { test: /\.css$/, use: ['style', 'css'] }	
        ]
    },
	plugins: [
        new CopyPlugin({
            patterns: [
                { from: './index.html', to: '../index.html' },
			    { from: './lib/jquery-3.1.1.min.js' },
			    { from: './rsk-helper.js' },
			    { from: './css', to: '../css'},
                { from: './img', to: '../img'}
            ],
        }),
	],
};
