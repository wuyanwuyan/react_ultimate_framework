import '../css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppBar } from 'react-toolbox/lib/app_bar';
import Logo from './component/Logo.js';

class Home extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <AppBar>
                    <Logo /> App Example
                </AppBar>
            </div>
        )
    }
}

if(__CLIENT__){
    let initState = window.__INITIAL_STATE__ || {};
    ReactDOM.render(<Home {...initState}/>, document.getElementById("react-container"));
}

export default Home;