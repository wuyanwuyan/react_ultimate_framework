import React from 'react';
import {header} from './header.scss';
import classNames from 'classnames';
import profile from '../utils/profile';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        if(!profile.get())
            window.location.href = '/login';
    }

    loginOut = () => {
        profile.logout();
        window.location.href = "/login";
    }

    render() {
        return (
            <div className={classNames(header,"flex_center_v","flex-space-between","padding-left-md")}>
                <h1><em>cqaso专栏</em>后台管理系统---111</h1>
                <a className="margin_left_auto" onClick={this.loginOut}>退出</a>
            </div>
        )
    }
}