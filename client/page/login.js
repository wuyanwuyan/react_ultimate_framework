import '../css/index.scss';
import style from './login.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Button, IconButton} from 'react-toolbox/lib/button';
import {Input} from 'react-toolbox/lib/input';
import {Checkbox} from 'react-toolbox/lib/checkbox';

import classNames from 'classnames';


///222

class Login extends Component {

    state ={
        phone:"",
        password:""
    }
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

    handlePhoneChange = (phone) =>{
        this.setState({phone});
    }

    handlePasswordChange = (password) => {
        this.setState({password});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className={classNames(style.loginWrapper, "flex_center_vh")} >
                <img src={require("../../client/assets/img/th.jpeg")} alt="none" />
                <img src={require("../../client/assets/img/small.png")} alt="none" />
                <form onSubmit={this.handleSubmit} action="submit">
                    <section className={classNames(style.section,"padding-md")}>
                        <Input type='tel' label='Phone' name='phone' icon='phone' value={this.state.phone} required onChange={this.handlePhoneChange} />
                        <Input type='password' name="password" value={this.state.password} icon='share' label='password' required onChange={this.handlePasswordChange} />
                        <div className="flex_center_h">
                            <Button type='submit' icon='bookmark' label='登陆' raised primary />
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


