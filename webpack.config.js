const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = {
    entry: './lock.js',
    mode: 'development',
    output:  {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js'
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
            },
        ]
    }
}
if (process.env.NODE_ENV === 'production') {
    config.optimization = {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    minimize: true,
                    compress:{
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            })
        ]
    }
}
module.exports = config