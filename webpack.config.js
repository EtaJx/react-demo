var path = require('path');
var webpack = require('webpack');

var config = {
    entry:path.resolve(__dirname,'app/main.js'), 
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'dundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, //用正则来匹配文件路径
            loader: 'babel-loader', //加载模块"babel"
            include:'/Users/HING/react-demo',
            exclude:/(node_modules|bower_components)/,
            query:{
                presets:['es2015','react']
            }
        }]
    }
};

module.exports = config;
