import '../css/index.scss';
import style from './login.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Button, IconButton} from 'react-toolbox/lib/button';
import classNames from 'classnames';


///222

class Login extends Component {

    // render() {
    //     return (
    //         <div className={style.loginWrapper}>
    //
    //             <em data-store="see" className={style.loginWrapper}>
    //                 loginsssss
    //             </em>
    //
    //         </div>
    //     )
    // }

    render() {
        const state = this.state;
        return (
            <div className={classNames(style.loginWrapper, "flex_center_vh")}>
                <Button icon='bookmark' label='登陆' raised primary />
            </div>
        );
    }
}


if (__CLIENT__) {
    let initState = window.__INITIAL_STATE__ || {};
    ReactDOM.render(<Login {...initState}/>, document.getElementById("react-container"));
}

export default Login;


