import React from 'react';
import ReactDOM from 'react-dom'
import Hello from './component.jsx';

class App extends React.Component{
    render () {
        return <p>Hello React!!!</p>;
    }
}
ReactDOM.render(<App />,document.getElementById('app'));
