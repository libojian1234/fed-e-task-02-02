#### 概述

- Rollup与Webpack作用类似
- Rollup更为小巧
- 仅仅是一款ESM打包器
- Rollup中并不支持类似HRM这种高级特性
- Rollup并不是要与Webpack全面竞争
- 初衷是提供一个充分利用ESM各项特性的高效打包器

小记

- 插件是Rollup唯一扩展途径
- Rollup只能通过文件路径的方式导入模块，对于node_modules下面的模块不能喝webpack一样通过模块的名称导入模块，所以官方提供了 rollup-plugin-node-resolve 来解决这个问题
- Rollup设计的是只处理ESM的打包，代码中导入CommonJS模块，默认不支持，但是目前npm很多模块是遵循CommonJS导出成员的，所以官方提供了rollup-plugin-commonjs来解决这个问题

#### Rollup优点

- 输出结果更加扁平
- 自动移除未引用代码
- 打包结果依然完全可读

#### Rollup缺点

- 加载非ESM的第三方模块比较复杂
- 模块最终都被打包到一个函数中，无法实现HRM
- 浏览器环境中，代码拆分功能依赖AMD库

