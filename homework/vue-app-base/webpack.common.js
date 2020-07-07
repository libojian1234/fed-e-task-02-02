const path = require('path')
const webpack = require('webpack')

//生成html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    //工作模式 none/development/production,默认production
    //https://webpack.js.org/configuration/mode/
    mode: 'none',
    //指定入口文件 相对路径必须加上 ./
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "js/bundle.[contenthash:8].js"    
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /.css$/,
                //配置多个load，从后往前执行
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ]
            },
            {
                test: /.png|jpe?g|gif$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false, // 这里设置为false,以commonJS方式导出
                        limit: 8 * 1024,  //10KB 以下用url-loader,10KB以上默认file-loader
                        name: "img/[name].[contenthash:8].[ext]" //打包到指定路径
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        //用于生产 index.html
        new HtmlWebpackPlugin({
            title: 'lbj',
            template: './public/index.html'
        }),
        new webpack.DefinePlugin({
            BASE_URL:'"/"'
        })
    ]
}