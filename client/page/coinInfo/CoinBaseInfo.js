import React from "react";
import {Tabs} from "antd";
import "./CoinBaseInfo.css";
import Chart from "../bitChart/Chart";

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

export default class CoinBaseInfo extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <section id="coinTable" className="section-wrapper">
                <Chart />

                {__MOBILE__ ?
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="聚合数据" key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab="基础信息" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="简介" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs> :
                    <table>
                        <tbody>
                        <tr>
                            <td rowSpan="5" colSpan="2">
                                <div className="flex_center_h">
                                    <img src="" alt="coinImg"/>
                                    <h5>BTC</h5>
                                    <h5>Bitcoin</h5>
                                </div>
                                <div className="flex_center_h">
                                    <em>￥497,205</em>
                                    <label>￥497,205</label>
                                </div>
                                <div>
                                    ≈$111,111(+7.49%)≈1.01BTC(0.00%)
                                </div>
                                <div>
                                    24h最低 ￥500,000 24h最高 ￥500,000
                                </div>
                            </td>
                            <td>项目名：</td>
                            <td colSpan="3">BTC/Bitcoin/比特币</td>
                        </tr>
                        <tr>
                            <td>发行时间：</td>
                            <td>2008-11-01</td>
                            <td>上架交易所：</td>
                            <td>66家</td>
                        </tr>
                        <tr>
                            <td>白皮书：</td>
                            <td colSpan="3"><a>http://bitcoin.org/bitcoin.pdf</a></td>
                        </tr>
                        <tr>
                            <td>项目官网：</td>
                            <td colSpan="3">website1、website2</td>
                        </tr>
                        <tr>
                            <td>区块站：</td>
                            <td colSpan="3">explorer1、explorer2</td>
                        </tr>
                        <tr>
                            <td colSpan="6">
                                <div>比特币简介</div>
                                <div>
                                    比特币（BitCoin）的概念最初由中本聪在2009年提出，根据中本聪的思路设计发布的开源软件以及建构其上的P2P网络。比特币是一种P2P形式的数字货币。点对点的传输意味着一个去中心化的支付系统。与大多数货币不同，比特币不依靠特定货币机构发行，它依据特定算法，通过大量的计算产生，比特币经济使用整个P2P网络……
                                    查看全部
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                }
            </section>
        )
    }
}