var React = require('react');
var ReactDOM = require('react-dom');
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
 */
var CommentBox = React.createClass({//使用React.createClass来创建一个新的React组件
    render: function () {
        return (//here is jsx
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data} />
                <CommentForm />
            </div>//原生的html元素以小写开头
        );
    }
});

ReactDOM.render(
    <CommentBox data={data} />,
    document.getElementById('content')
    );//实例化组件ReactDOM.render