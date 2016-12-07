var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
//var Remarkable = require('react-remarkable');//引入markdown依赖

/**
 * 挂钩数据模型
 * 使用一些模块化的方法将以下数据传入到CommentList中
 * 使用props来传递
 */
var data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment"},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

/**
 * 创建Comment组件，它将依赖于从父级传来的数据
 * 使用mardown，依赖为remarkable
 * 将父级传入的数据this.props.children包裹在remarkable中，转换其能理解的原始字符串
 */
var Comment = React.createClass({
    /**
         * 保证浏览器能够正确解析markdown过后的字符串
         * 以及保护收受XSS攻击
         */
  //  rawMarkup: function () {
  //      var md = new Remarkable();
  //      var rawMarkup = md.render(this.props.children.toString());
  //      return { __html: rawMarkup };
  //  },

    render: function () {
        return (//在jsx语法中，将javascript表达式放在大括号中
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
});

/**
 * 创建commentList
 */
var CommentList = React.createClass({
    render: function () {
        /**
         * 个人理解：
         * 把data数据挂到props上
         * 然后CommentNodes返回节点组件
         */
        var commentNodes = this.props.data.map(function(comment){
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function () {
        return (
            <div className="commentForm">
            </div>
        );
    }
});


/**
 * 在CommentBox中使用这些组件
 * 在组件中使用可变的this.state私有函数，而不再是不可变的this.props
 * 用简单的轮询来实时更新
 */
var CommentBox = React.createClass({//使用React.createClass来创建一个新的React组件
    loadCommentsFromServer: function() {
        /**
        * 实时更新的关键还是this.setState()的调用
        */
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {//getInitialState()在生命周期里之执行以此，并设置组件的初始状态
        return { data: [] };
    },
    componentDidMount: function() {//执行一个ajax操作来获取数据，这里的componentDidMount是一个当组件被渲染时呗React自动调用的方法
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer,this.props.pollInterval);//simple loop

        // var self = this;
        // var httpRequst = new XMLHttpRequest();
        // httpRequst.onreadystatechange = function() {
        //     if (httpRequst.readyState === XMLHttpRequest.DONE) {
        //         if (httpRequst.status == 200) {
        //             console.log(httpRequst.responseText);
        //             this.setSate({
        //                 data: JSON.parse(httpRequst.responseText)
        //             });
        //         }
        //     }
        // };
        // httpRequst.open('GET', this.props.url);
        // httpRequst.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // httpRequst.send();
    },
    render: function() {
        return (//here is jsx
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>//原生的html元素以小写开头
        );
    }
});

/**
 * 移除数据的props
 * 获取数据使用url来替代
 * 本地模拟加一个json文件
 * 简单配置nginx加载和上面数据一样的一个data.json文件
 * 这里使用url请求数据
 * 它必须重新渲染自己？？？
 * 直到请求从服务器返回，此时该组件或许要渲染一些新的评论？
 * 2000ms轮询以此
 */
ReactDOM.render(
    <CommentBox url="http://localhost:10086/hing/data.json" pollInterval={2000}/>,
    document.getElementById('content')
    );//实例化组件ReactDOM.render