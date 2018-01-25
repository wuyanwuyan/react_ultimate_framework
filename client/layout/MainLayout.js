import React from "react";
import "./mainLayout.css";

export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <header key="header">
                    <div className="header-top">
                        <div className="flex_center_v layout-width">
                            <span className="flex_center_v"><img src={require('../assets/img/small-phone.png')}
                                                                 alt='small-phone'
                                                                 style={{marginRight: 3}}/>手机客户端</span>
                            <span className="flex_center_v margin_left_auto">
                            官方微信群：CQ_blockchain
                            <img src={require('../assets/img/small-earth.png')} alt='small-earth'
                                 style={{marginLeft: 40, marginRight: 3}}/>
                            官方微信群：简体中文
                        </span>
                        </div>
                    </div>
                    <div className="header-menu">
                        <div className="flex_center_v layout-width">
                            <a href="/" className="flex_center_v">
                                <img src={require('../assets/img/logo_white.png')} alt='' style={{marginRight: 3}}/>
                                <label className="logo-title">CQCOIN</label>
                            </a>
                            <div className="flex_center_v header-menu-ul" style={{marginLeft: 90}}>
                                <li className="flex_center_v menu-item active"><a>行情</a></li>
                                <li className="flex_center_v menu-item"><a>APP下载</a></li>
                            </div>

                            <div className="flex_center_v margin_left_auto">
                                <a href="/register" style={{marginRight: 26, color: '#666666'}}>注册</a>
                                <a href="/login" style={{width: 80, height: 36}} className="button-border">登录</a>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="layout-width" key="body">
                    {this.props.children}
                </section>
                <footer key="footer">
                    <div className="flex_center_v layout-width">
                    <span className="flex_center_v">
                         <img src={require('../assets/img/logo-white.png')} alt='small-white'
                              style={{marginRight: 10}}/>
                        <label className="logo-title">CQCOIN</label>
                    </span>
                        <span className="margin_left_auto contact">
                        <div>
                            <span>访问手机版    |</span>
                            <span style={{marginLeft: 22}}>联系我们</span>
                            <span style={{marginLeft: 22}}>微信群：CQ_blockchain    </span>
                            <span style={{marginLeft: 22}}>邮箱：support@chuangqi.tech</span>
                        </div>
                        <div style={{marginTop: 22, fontSize: '1.2rem'}}>
                            Copyright@2013-2016 闯奇信息科技（上海）有限公司  版权所有
                        </div>
                    </span>
                    </div>
                </footer>
            </div>
        )
    }
}