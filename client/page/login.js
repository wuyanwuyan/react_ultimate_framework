import '../css/index.css';
import style from './login.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

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


