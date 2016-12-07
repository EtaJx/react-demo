var path = require('path');
var webpack = require('webpack');

var config = {
    entry:['webpack/hot/dev-server',path.resolve(__dirname,'app/comment.js')], 
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, //用正则来匹配文件路径
            loader: 'babel-loader', //加载模块"babel"
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
};

module.exports = config;
