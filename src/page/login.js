import style from './login.scss';
import React, {Component} from 'react';
import autobind from 'autobind-decorator';
import {API_login} from '../utils/api.js';
import notification from '../decorator/notification.js';
import Profile from '../utils/profile.js';


import {Input} from 'react-cqtoolbox/lib/input';
import {Button} from 'react-cqtoolbox/lib/button';
import {FormItem} from 'react-cqtoolbox/lib/form';
import {Section} from 'react-cqtoolbox/lib/section';
import {Checkbox} from 'react-cqtoolbox/lib/checkbox';
import classNames from 'classnames';
import { withRouter } from 'react-router'
class Login extends Component {

    state = {
        profile: '',
        password: '',
        checked: true,
        showCode: false
    }

    _handleInputChange = (name) => {
        return value => {
            this.setState({[name]: value});
        };
    }

    onEyeClick = () => {
        this.setState({showCode: !this.state.showCode})
    }

    _handleLoginClick = (event) => {
        event.preventDefault();

        const _profile = {
            profile: this.state.profile,
            password: this.state.password,
        };

        API_login(_profile).then(data => {
            if (data.user) {
                this.state.checked ? Profile.login(data) : Profile.loginBySession(data);
                window.location.href = '/articles';
            } else if (data.status === 0) {
                this.props.addNotification('密码错误~', 'error');
            } else if (data.status === -1) {
                this.props.addNotification('账号不存在~', 'error');
            } else {
                this.props.addNotification('密码错误~', 'error');
                this.setState({profileErrorTxt: '密码错误~'});
            }
        });
    }

    _onCheck = (checked) => {
        this.setState({checked});
    }

    render() {
        const state = this.state;

        return (
            <div className={classNames(style.loginWrapper,"flex_center_vh")}>
                <Section title="登陆">

                    <form style={{width: 400}}>

                        <FormItem label="手机号">
                            <Input value={state.profile} onChange={this._handleInputChange('profile')}
                                   placeholder="请输入手机号..."/>
                        </FormItem>

                        <FormItem label="密码">
                            <Input value={state.password}
                                   onChange={this._handleInputChange('password')}
                                   onSuffixClick={this.onEyeClick}
                                   type={this.state.showCode ? "text" : "password"}
                                   placeholder="密码"
                                   suffix={this.state.showCode ? "eye-o" : "eye"}/>
                        </FormItem>

                        <FormItem>
                            <Checkbox checked={state.checked} label="下次自动登录" onChange={this._onCheck }/>
                        </FormItem>

                        <FormItem>
                            <Button fullWidth primary raised label="登录" onClick={this._handleLoginClick}/>
                        </FormItem>

                    </form>

                </Section>
            </div>
        );
    }
}

export default notification(autobind(Login));


