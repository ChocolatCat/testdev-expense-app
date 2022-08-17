const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const publicFolder = path.join(__dirname, 'public');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: [publicFolder],
        compress: true,
        port: 10800,
        https: true,
        open:true,
        historyApiFallback: true
    }
});

// loader