var path = require('path');

var config = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, './app/main.js')],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'dundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, //用正则来匹配文件路径
            loader: 'babel' //加载模块"babel"
        }]
    }
};

module.exports = config;