import '../css/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={{fontSize:"40px"}}>
                <a href="/login">to login page</a>
            </div>
        )
    }
}

if(__CLIENT__){
    let initState = window.__INITIAL_STATE__ || {};
    ReactDOM.render(<Home {...initState}/>, document.getElementById("react-container"));
}

export default Home;