const path = require('path');
//entry -> output
//Path to the project root -> __dirname
const publicFolder = path.join(__dirname, 'public');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: publicFolder,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/, 
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: {
            directory: publicFolder
        },
        compress: true,
        port: 10800,
        https: true,
        open:true,
        historyApiFallback: true
    }
};

// loader
