import '../css/index.css';
import style from './login.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Button, IconButton} from 'react-toolbox/lib/button';
import {Input} from 'react-toolbox/lib/input';
import {Checkbox} from 'react-toolbox/lib/checkbox';

import classNames from 'classnames';

class Login extends Component {

    state = {
        phone: "",
        password: "",
        phoneErrMes: "",
        passwordErrMes: ""
    }

    handlePhoneChange = (phone) => {
        this.setState({phone});
    }

    handlePasswordChange = (password) => {
        this.setState({password});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        window.location = '/';
    }

    render() {
        const {phone, password, phoneErrMes, passwordErrMes} = this.state;
        return (
            <div className={classNames('flex_center_vh', style.loginWrapper)}>
                <form onSubmit={this.handleSubmit} action="submit">
                    <section className={classNames(style.section, "padding-md")}>
                        <Input type='tel' label='Phone' error={phoneErrMes} icon='phone' value={phone}
                               required onChange={this.handlePhoneChange}/>
                        <Input type='password' label='password' error={passwordErrMes} value={password} icon='share'
                               required
                               onChange={this.handlePasswordChange}/>
                        <div className="flex_center_h">
                            <Button type='submit' icon='bookmark' label='登陆' raised primary/>
                        </div>
                    </section>
                </form>
            </div>
        );
    }
}


if (__CLIENT__) {
    let initState = window.__INITIAL_STATE__ || {};
    ReactDOM.render(<Login {...initState}/>, document.getElementById("react-container"));
}

// if (__DEV__ && module.hot) {
//     module.hot.accept();
// }

export default Login;


