const path = require('path')
//自动清理dist目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//生成html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
//复制静态文件的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { Compiler, compilation } = require('webpack')

const webpack = require('webpack')

//自定义一个移除js打包后文件/** */注释的插件
//通过在生命周期的钩子中挂载函数实现扩展
class MyPlugin {
    apply (compliler) {
        console.log('MyPlugin 启动')

        compliler.hooks.emit.tap('MyPlugin', compilation => {
            // compilation => 可以理解为此次打包的上下文
            for (const name in compilation.assets){
                //打印打包文件的name
                // console.log(name)
                //打印打包文件的内容
                // console.log(compilation.assets[name].source())

                if(name.endsWith('.js')){
                    const contents = compilation.assets[name].source()
                    const withoutComments = contents.replace(/\/\*\*+\*\//g,'')
                    compilation.assets[name] = {
                        source: () => withoutComments,
                        size: () => withoutComments.length
                    }
                }
            }
        })
    }
}

module.exports = (env, argv) => {
    const config = {
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
        devServer: {
            //额外为开发服务器指定查找资源目录
            contentBase: './public',
            //设置热更新 HMR
            // hot: true,
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
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets:['@babel/preset-env']
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
                    test: /.png$/,
                    // use: 'file-loader'
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024  //10KB 以下用url-loader,10KB以上默认file-loader
                        }
                    }
                },
                {
                    test: /.html$/,
                    use: {
                        loader: 'html-loader',
                        options:{
                            //处理其他标签的属性打包的话，需要进行额外的配置
                            //html 在加载的时候对页面的属性的做额外的处理
                            //默认只有 img:src
                            attributes: {
                                list: [
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src'
                                    },
                                    {
                                        tag: 'a',
                                        attribute: 'href',
                                        type: 'src'
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        },
        plugins: [
            // new CleanWebpackPlugin(),
            //用于生产 index.html
            new HtmlWebpackPlugin({
                title: 'Webpack Plugin Sample',
                meta: {
                    viewport: 'width-device-width'
                },
                lbj:'libojian',
                template: './src/index.html'
            }),
            //把public下的所有文件拷贝到dist/public下
            //开发是不需要，上线打包才用
            // new CopyWebpackPlugin({
            //     patterns:[{ from: 'public', to: 'public' },]
            // }),
            new MyPlugin(),
    
            //热更新 HMR
            new webpack.HotModuleReplacementPlugin()
        ]
    }

    if(env === 'production'){
        config.mode = 'production'
        config.devtool = false;
        config.plugins = [
            ...config.plugins,
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns:[{ from: 'public', to: 'public' },]
            }),
        ]
    }

    return config
}