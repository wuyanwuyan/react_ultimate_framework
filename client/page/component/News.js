import './news.css';
import React from "react";
import moment from "moment";
import {Input,Select,Button,Pagination,Table} from "antd";

export default class News extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {





        return (
            <section className="section-wrapper news-section">
                <div className="flex flex_center_v">
                    <ul className="flex flex1 flex_center_v news-source-web">
                        <li className="active">交易所公告</li>
                        <li>每日新币</li>
                        <li>Twitter</li>
                    </ul>
                    <a className="news-more" href="#">更多</a>
                </div>
                <ul>
                    <li className="news-item">
                        <a className="text-truncate news-title">【AEX】全球首发AELF！同时上全球首发AELF！同时上全球首发AELF！同时上</a>
                        <a className="text-truncate news-desc">https://mp.weixin.qq.com/s/Eg8_l-j9C23123123131sdfasfasfd</a>
                        <div className="flex_center_v" style={{marginTop:12}}>
                            <span className="news-source margin_left_auto">AEX</span>
                            <span className="news-time">{moment().format('YYYY.MM.DD')}</span>
                        </div>
                    </li>
                    <li className="news-item">
                        <a className="text-truncate news-title">【AEX】全球首发AELF！同时上全球首发AELF！同时上全球首发AELF！同时上</a>
                        <a className="text-truncate news-desc">https://mp.weixin.qq.com/s/Eg8_l-j9C23123123131sdfasfasfd</a>
                        <div className="flex_center_v" style={{marginTop:12}}>
                            <span className="news-source margin_left_auto">AEX</span>
                            <span className="news-time">{moment().format('YYYY.MM.DD')}</span>
                        </div>
                    </li>
                    <li className="news-item">
                        <a className="text-truncate news-title">【AEX】全球首发AELF！同时上全球首发AELF！同时上全球首发AELF！同时上</a>
                        <a className="text-truncate news-desc">https://mp.weixin.qq.com/s/Eg8_l-j9C23123123131sdfasfasfd</a>
                        <div className="flex_center_v" style={{marginTop:12}}>
                            <span className="news-source margin_left_auto">AEX</span>
                            <span className="news-time">{moment().format('YYYY.MM.DD')}</span>
                        </div>
                    </li>
                    <li className="news-item">
                        <a className="text-truncate news-title">【AEX】全球首发AELF！同时上全球首发AELF！同时上全球首发AELF！同时上</a>
                        <a className="text-truncate news-desc">https://mp.weixin.qq.com/s/Eg8_l-j9C23123123131sdfasfasfd</a>
                        <div className="flex_center_v" style={{marginTop:12}}>
                            <span className="news-source margin_left_auto">AEX</span>
                            <span className="news-time">{moment().format('YYYY.MM.DD')}</span>
                        </div>
                    </li>
                </ul>
            </section>
        )
    }
}