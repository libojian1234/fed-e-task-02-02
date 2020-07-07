const path = require('path')
//自动清理dist目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//生成html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
//复制静态文件的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    //工作模式 none/development/production,默认production
    //https://webpack.js.org/configuration/mode/
    mode:'none',
    //指定入口文件 相对路径必须加上 ./
    entry: './src/main.js',
    output: {
        //指定打包后的文件名称
        filename: 'bundle.js',
        //path必须是绝对路径
        path: path.join(__dirname, 'dist'),
        // publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /.md$/,
                use: [
                    'html-loader',
                    './markdown-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        //用于生产 index.html
        new HtmlWebpackPlugin({
            title: 'Webpack Plugin Sample',
            meta: {
                viewport: 'width-device-width'
            },
            lbj:'libojian',
            template: './src/index.html'
        }),
        //用于生成 about.html
        new HtmlWebpackPlugin({
            title: 'Webpack Plugin Sample about',
            filename: 'about.html'
        }),
        //把public下的所有文件拷贝到dist/public下
        new CopyWebpackPlugin({
            patterns:[{ from: 'public', to: 'public' },]
        }) 
    ]
}