const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: {
            directory: common.output.path
        },
        compress: true,
        port: 10800,
        https: true,
        open:true,
        historyApiFallback: true
    }
});

// loader