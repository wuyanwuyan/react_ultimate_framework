import React from 'react'
import ReactDOM from 'react-dom';

import './css/index.css';

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


ReactDOM.render(<Ctest />,document.getElementById("react-container"));
