import React from 'react';
import ReactDOM from 'react-dom'
import Hello form './component.jsx';

class Main extends React.Conponent{
    constructor(props){
        super(props)
    }
    render(){
        return <Hello/>
    }
}
ReactDOM.render(<Main/>,document.getElementById('app'));
