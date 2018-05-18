import React from 'react';
import './AboutUs.css';

export default class AboutUs extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='about-us'>
                <img className='about-us-banner margin-top-md' src='http://www.bitnews360.com/img/banner2.png'
                     alt='banner'/>

                <section className='section'>
                    <div>

                    </div>


                    <div className='about-us-info'>

                        <div className="logoimg2"><img style={{width:80}} src={require('../../assets/logo.png')}/></div>

                        <label>币赢app是一款可以领糖果的区块链快讯平台，读新闻还可领红包，阅读时间越长红包越大。随时随地一键提币，方便快捷。</label>

                        <p>-&nbsp;全球快讯：链圈，币圈新闻实时更新，帮助用户快速入门，快人一步了解行业变化。</p>

                        <p>-&nbsp;全新行情：涵盖全球2000+币种(比特币、以太坊、莱特币、瑞波币等)，全球231个交易平台（火币、OKex、币安），实时跟踪行情数据玩转币圈。</p>

                        <p>-&nbsp;一键加群：特邀币圈大佬、知名媒体大v等为用户免费普及区块链知识、分享经验。语音播报，3分钟听懂区块链。</p>


                    </div>


                    <div>

                    </div>

                </section>
            </div>
        )
    }
}