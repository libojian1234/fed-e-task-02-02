const common = require('./webpack.common')
const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-eval-module-source-map',
    output: {
        filename: "js/bundle.[hash].js"    
    },
    devServer: {
        //额外为开发服务器指定查找资源目录
        contentBase: './public',
        //设置热更新 HMR
        hot: true,
        //处理HRM 的代码报错会导致自动刷新，就无法确定代码是哪里有错误（解决方法：设置hotOnly：true）
        // hotOnly:true,
        proxy: {
            // http://localhost:8080/api/users -> https://api.github.com/api/users
            '/api': 'https://api.github.com',
            // http://localhost:8080/api/users -> https://api.github.com/users
            pathRewrite: {
                '^/api': ''
            },
            // 不能使用 localhost:8080 作为请求 Github 的主机名
            changeOrigin: true
        }
    },
    plugins: [
        //热更新 HMR
        new webpack.HotModuleReplacementPlugin()
    ]

})