### webpack 简单使用例子
- 在webpack.config.js中的entry，使用带有根目录的`./`
- 使用`webpack-dev-server`
- 使用`webpack-dev-server`实现自动刷新

在webpack.config.js中的entry中写上`['webpack/hot/dev-server']`(为啥)
在package.json中添加:
    "dev":"webpack-dev-server --devtool eval --progress --colors --hot --content-base build"

#### 使用模块（ES6，commonJS,AMD）(react推荐使用CommonJS)
- webpack只是一个模块合并器
- 使用Babel来JSX语法