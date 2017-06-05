import './css/reset.css';
import './css/index.scss';
import './css/utilities.scss';
import 'simditor/styles/simditor.css';
import './css/simditor.css';

import React from 'react'
import ReactDOM from 'react-dom';
import Login from './page/login';
import Layout from './layout/Layout';


class Ctest extends React.Component{
    constructor(props){
        super(props);
        let a = 1;
        a = 342221221;
        console.log(a);
    }

    render(){
        return <div style={{color:"red"}}>hello!</div>
    }
}

ReactDOM.render(<Layout />,document.getElementById("react-container"));
