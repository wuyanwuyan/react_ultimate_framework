import React from "react";
import {Select,Table} from 'antd';
import "./CoinMarketTrend.css";

export default class CoinBaseInfo extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        const columns = [
            { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
            { title: 'Column 1', dataIndex: 'address', key: '1' },
            { title: 'Column 2', dataIndex: 'address', key: '2' },
            { title: 'Column 3', dataIndex: 'address', key: '3' },
            { title: 'Column 4', dataIndex: 'address', key: '4' },
            { title: 'Column 5', dataIndex: 'address', key: '5' },
            { title: 'Column 6', dataIndex: 'address', key: '6' },
            { title: 'Column 7', dataIndex: 'address', key: '7' },
            { title: 'Column 8', dataIndex: 'address', key: '8' },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: () => <a href="#">action</a>,
            },
        ];

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 40,
            address: 'London Park',
        },{
            key: '3',
            name: 'Jim Green',
            age: 40,
            address: 'London Park',
        }];


        return (
            <section id="coinMarketTrend" className="section-wrapper">
                <div className="flex_center_v trend-header">
                    <h4>BTC市场行情</h4>
                    <label className="margin_left_auto">换算价格</label>
                    <Select defaultValue="人民币（CNY）" style={{ width: 128 }} onChange={f=>f}>
                        <Select.Option value="CNY">人民币（CNY）</Select.Option>
                    </Select>
                </div>
                <Table columns={columns} dataSource={data} scroll={{x:700}}  pagination={false}/>
            </section>
        )
    }
}