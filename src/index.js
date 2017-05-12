import React from 'react'
import ReactDOM from 'react-dom';
import BasicExample from './page/BasicExample';
import './css/reset.css';

import './page/test.scss';

class Ctest extends React.Component{
    constructor(props){
        super(props);
        let a = 1;
        a = 34;
        console.log(a);
    }

    render(){
        return <div>hello ooo222oo!</div>
    }
}


ReactDOM.render(<BasicExample />,document.getElementById("react-container"));
