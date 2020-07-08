#### 小记
1. webpack 4 以后，默认入口：`src/index.js`打包到 `dist/main.js`
2. webpack.config.js 是webpack的配置文件，它是运行在node环境上的文件，遵循CommonJS 规范
3. 工作模式 none/development/production,默认production
4. ctrl+k ctrl+0 快速折叠所有代码
5. 打包入口 --> 运行入口（一般是js）
6. 小文件使用 Data URLs,减少请求次数（url-loader）
7. 大文件单独提取存放，提高加载速度（file-loader）
8. 常用加载器分类：编译转换类、文件操作类、代码检查类
9. 因为模块打包需要，所以处理import和export，但并不转换其他es6特性
10. webpack 只是打包工具，加载器可以用来编译转换代码

#### webpack 模块加载方式
- 遵循 ES Modules 标准的 import 声明
- 遵循 CommonJS 标准的 require 函数
- 遵循 AMD 标准的 define 函数和 require 函数
- 样式代码中的@import 指令和url函数
- HTML代码中图片标签的src属性

#### loader
- loader 负责资源文件从输入到输出的转换
- loader 实际上是以个管道的概念，对于同一个资源可以依次使用多个loader
- loader 返回的结果必须是js代码，通常直接返回js代码的字符串或者使用另一个loader返回

#### 插件机制介绍
- 增强webpack 自动化能力
- loader 专注实现资源模块加载，plugin解决其他自动化工作
- 开发插件（通过在生命周期的钩子中挂载函数实现扩展）

#### 理想的开发环境

1. 以HTTP Server 运行
2. 自动编译 + 自动刷新
3. 提供 Source Map 支持

##### 方式1：

###### webpack自动编译

````
$ yarn webpack --watch
````

> serve dist 就可以刷新监听打包了

###### webpack 浏览器自动刷新

````
$ yarn add browser-sync --dev
$ yarn browser-sync dist --files '**/*'
````

> 这种方法需要两个终端，很麻烦，推荐webpack-dev-server

##### 方式2：

###### 自动编译+自动刷新（webpack-dev-server）

````
$ yarn add webpack-dev-server --dev
$ yarn webpack-dev-server --open
````

###### webpack-dev-server静态资源访问

- CopyWebpackPlugin 在开发环境不需要执行，上线打包时执行一次
- devServer 下的 contentBase 额外为开发服务器指定查找资源目录

````
devServer: {
        //额外为开发服务器指定查找资源目录
        contentBase: './public'
    }
````

#### Source Map

- 解决了源代码与运行代码不一致所产生的问题
- Webpack 支持12种不同的方式，每种方式的效率和效果各不相同
- eval 打包速度快，但是只能定位错误代码所在的文件，不能定位错误代码的行列信息
- eval   是否使用eval执行模块代码
- cheap - Source Map 是否包含行信息
- module 是否能够得到Loader处理之前的源代码

#### 热更新HMR 问题

- 样式模块style-loader已经帮我们自动处理了模块热替换逻辑，而JS模块没有
- 因为样式文件修改后，及时替换并覆盖到了页面之中，但是js是没有任何规律的，webpack不知道它进行了什么操作，不知道如何处理更新后的模块，所以我们需要手动处理JS模块更新后的热替换

#### HMR 注意事项

- 处理HRM 的代码报错会导致自动刷新，就无法确定代码是哪里有错误（解决方法：设置hotOnly：true）
- 没启用HMR 的情况下，HMR API 报错（解决方法：if判断module.hot）
- 代码中多了一些与业务无关的代码（无需解决，打包的时候会自动移除掉）

#### Tree Shaking

> mode为production的时候自动开启Tree Shaking

````
$ yarn webpack --mode production
````

下面是手动开启TreeShaking

````javascript
//webpack.config.js
module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    optimization: {
        usedExports: true,  //标记没有引用的多余代码
        minimize: true,		//去除掉没有引用的多余代码并压缩
        concatenateModules: true  //尽可能的将所有模块合并输出到一个函数中，即提升了运行效率，又减少了代码的体积
    }
}
````

- usedExports 负责标记【枯树叶】
- minimize 负责【摇掉】它们
- concatenateModules (Scope Hoisting)

Tree Shaking&babel

1. Tree Shaking 实现的前提是ES Modules，由Webpack打包的代码必须使用ES Modules

2. 但是babel会把ES Module 转换为commonJS，从而导致Tree Shaking失效

3. 最新版本的babel-loader中自动关闭了ES Modules 转换成commonjs的插件，所以Tree Shaking没有失效

````javascript
rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            //babel把ES Module 转换为commonJS，这样会导致Tree Shaking失效
                            // ['@babel/preset-env',{modules:'commonjs'}]
                            //强制使用ES Module（新版本babel-loader默认使用ES Module）
                            ['@babel/preset-env',{modules:false}]
                        ]
                    }
                }
            }
        ]
````

#### Webpack sideEffects(副作用)

副作用：模块执行时除了导出成员之外所做的使用，sideEffects一般用于npm包标记是否有副作用

如果一个js如下（inde.js）导出了很多模块，main.js又只引用了其中一个（如：只引用了Button），webpack在打包的时候会把这个js引入的所用模块都打包进去，这是不合理的，这时，我们就要用到sideEffects，只打包引用到的Button

```javascript
//index.js
export { default as Button } from './button'
export { default as Link } from './link'
export { default as Heading } from './heading'
```

设置如下：

````javascript
//webpack.config.js
module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    optimization: {
        sideEffects: true,
        // usedExports: true,  //标记没有引用的多余代码
        // minimize: true,       //去除掉没有引用的多余代码
        // concatenateModules: true  //尽可能的将所有模块合并输出到一个函数中，即提升了运行效率，又减少了代码的体积
    }
}
````

````json
//package.json
{
  "name": "06-webpack-sideeffects",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"
  },
  "sideEffects": false
}
````

> 设置webpack.config.js中的sideEffects为true，并且同时设置package.json 中的"sideEffects"为 false

##### sideEffects注意

如下代码，extend.js没有导出成员，这个为Number做扩展pad方法的代码就属于extend这个模块的副作用代码，因为package.json中"sideEffects"为 false，忽略了副作用代码，这个pad方法的代码就不会被打包，需要package.json做处理就可以了

````javascript
//extend.js
Number.prototype.pad = function(size){
    let result = this+''
    while(result.length < size){
        result = '0' + result
    }
    return result
}
````

```javascript
//index.js
import './extend'

console.log(8).pad(3)
```

````json
//package.json
{
  "name": "06-webpack-sideeffects",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"
  },
  "sideEffects": [
    "./src/extend.js"
  ]
}
````

````javascript
//webpack.config.js
module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    optimization: {
        sideEffects: true,
        // usedExports: true,  //标记没有引用的多余代码
        // minimize: true,       //去除掉没有引用的多余代码
        // concatenateModules: true  //尽可能的将所有模块合并输出到一个函数中，即提升了运行效率，又减少了代码的体积
    }
}
````

> 设置sideEffects，把副作用代码的文件路径都设置进去就可以了