const path = require('path')

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
        publicPath: 'dist/'
    },
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
    }
}