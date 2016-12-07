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

#### Finally

终于成功。
- 以前的代码参照[React和Webpack小书](https://www.gitbook.com/book/wohugb/react-webpack-cookbook/details)(最后更新为八个月以前)，有一些东西书中并没有说清楚，比如babel的使用以及一些React的更新
- 在加载babel-loader后，使用无法正确加载的依赖，读取的babel配置文件`.babelrc`，始终为我home目录下的，因为之前全局安装过babel，所以一直提示无法读取到presets
- 在组件中使用`export default class Hello extends React.Component`时，需要加入
```javascript
constructor(props){
    super(props);
}
```
- 在当前的目录下应该加入`.babelrc`文件，并写入
```javascript
{
    ["es2015","react"]
}
```
似的能够正确解析`jsx`以及ES6语法
- 目前仍有一些不明白的地方
