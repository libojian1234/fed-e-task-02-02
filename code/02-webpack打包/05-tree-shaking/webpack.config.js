module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            // ['@babel/preset-env',{modules:'commonjs'}]
                            ['@babel/preset-env',{modules:false}]
                        ]
                    }
                }
            }
        ]
    },
    optimization: {
        usedExports: true,  //标记没有引用的多余代码
        // minimize: true,       //去除掉没有引用的多余代码
        // concatenateModules: true  //尽可能的将所有模块合并输出到一个函数中，即提升了运行效率，又减少了代码的体积
    }
}