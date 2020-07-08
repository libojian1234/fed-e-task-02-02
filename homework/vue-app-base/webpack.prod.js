const path = require("path");
const common = require('./webpack.common')
const merge = require('webpack-merge')
//自动清理dist目录
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
//复制静态文件的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
//提取css到单个文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//压缩css文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
//压缩js文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(),
            new UglifyJsPlugin()
        ]
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "less-loader",
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        //把public下的所有文件拷贝到dist/public下
        new CopyWebpackPlugin({
            patterns: [{
                from: path.join(__dirname, 'public'),
                // to: ''
            }]
        }),
        new MiniCssExtractPlugin({
            filename: './styles/style.css'
        })
    ],
    //生产环境忽略某些第三方库
    // externals: {
    //     vue: "Vue"
    // }
})