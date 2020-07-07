#### parcel

````
$ yarn init --yes
$ yarn add parcel-bundler --dev
$ yarn parcel ./src/index.html  //入口文件，parcel会自动启服务
$ yarn parcel build ./src/index.html //打包文件
````

##### 小记

- 官方推荐使用html文件为打包入口
- 自动安装插件
- 完全零配置
- 构建速度更快（比webpack），因为parcel使用的是多进程同时去工作，充分发挥了多核cpu的优势，webpack也可以使用happypack的插件来去实现多进程这点