# 一、简答题

## 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

- yarn init --yes   生成package.json文件
- yarn add webpack webpack-cli --dev  安装webpack模块
- 新建index.js 、webpack.congig.js
- 配置webpack.config.js文件
- 设置entry/output
- 配置loader（style-loader、css-loader、file-loader、babel-loader等等）
- 安装插件（CleanWebpackPlugin、HtmlWebpackPlugin等等）
- 配置开发环境和生产环境的source map
- 开启HMR热更新功能
- 安装webpack-dev-serve ，配置devServer
- 配置不同环境下的配置文件

## 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

#### loader

- loader 负责资源文件从输入到输出的转换
- loader 实际上是以个管道的概念，对于同一个资源可以依次使用多个loader
- loader 返回的结果必须是js代码，通常直接返回js代码的字符串或者使用另一个loader返回

````javascript
//markdown-loader.js
const marked = require('marked')

module.exports = source => {
    //loader 返回的结果必须是js代码，通常直接返回js代码的字符串或者使用另一个loader返回
    const html = marked(source)
    // return `module.exports = ${JSON.stringify(html)}`
    //返回 html 字符串交给下一个 loader 处理
    return html
}
````



#### 插件机制介绍

- 增强webpack 自动化能力
- loader 专注实现资源模块加载，plugin解决其他自动化工作
- 开发插件（通过在生命周期的钩子中挂载函数实现扩展）

````javascript
const { Compiler, compilation } = require('webpack')
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

module.exports = {
	//.....
    plugins: [
		//.....
        new MyPlugin() //使用创建的清除注释插件
    ]
}
````



# 二、编程题

## 1、使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：
