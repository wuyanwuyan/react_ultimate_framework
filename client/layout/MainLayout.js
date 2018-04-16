import React from "react";
import "./mainLayout.css";
import {NavLink} from "react-router-dom";
import {Input} from "antd";

const Search = Input.Search;


export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header>
                    <div className='flex_center_v'>
                        <a className="margin-right-md brand" href="/">
                            <img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" />
                        </a>
                        <Search
                            onSearch={value => console.log(value)}
                            style={{ width: 200}}
                        />

                        <ul className="margin_left_auto flex_center_v nav">
                            <li><a href="/">首页</a></li>

                            <li>
                                <a href="/my/messages">
                                    未读消息
                                </a>
                            </li>

                            <li><a href="/getstart">新手入门</a></li>
                            <li><a href="/api">API</a></li>

                            <li><a href="/about" target="">关于</a></li>


                            <li><a href="/setting">设置</a></li>
                            <li>
                                <a href="/signout" data-method="post" rel="nofollow">退出</a>
                            </li>

                        </ul>
                    </div>


                </header>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}


