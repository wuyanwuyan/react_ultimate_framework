import "./trendTable.css";
import React from "react";
import {Button, Icon, Input, Pagination, Select, Table} from "antd";

export default class TrendTable extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        const columns = [
            {title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left'},
            {title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left'},
            {title: 'Column 1', dataIndex: 'address', key: '1'},
            {title: 'Column 2', dataIndex: 'address', key: '2'},
            {title: 'Column 3', dataIndex: 'address', key: '3'},
            {title: 'Column 4', dataIndex: 'address', key: '4'},
            {title: 'Column 5', dataIndex: 'address', key: '5'},
            {title: 'Column 6', dataIndex: 'address', key: '6'},
            {title: 'Column 7', dataIndex: 'address', key: '7'},
            {title: 'Column 8', dataIndex: 'address', key: '8'},
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
        }, {
            key: '3',
            name: 'Jim Green',
            age: 40,
            address: 'London Park',
        }];


        return (
            <section className="section-wrapper trend-table padding-bottom-lg">
                {
                    !__MOBILE__ &&
                    <div className="flex_center_v boxTips">
                        <h3>所有货币</h3>
                        <div className="margin_left_auto search-input">
                            <Input.Search placeholder="输入币名或者交易所搜索"
                                          onSearch={value => console.log(value)}
                            />
                        </div>
                    </div>
                }
                <div className="flex_center_v boxTools">
                    <Button type="primary" className='margin-right-sm'>全部</Button>
                    <Button className='margin-right-sm'>自选</Button>
                    <Select defaultValue="人民币（CNY）" style={{width: 128}} onChange={f => f}>
                        <Select.Option value="CNY">人民币（CNY）</Select.Option>
                    </Select>
                    {__MOBILE__ && <Icon type="search" className="margin_left_auto icon"/>}
                    {!__MOBILE__ && <Button className='margin_left_auto margin-right-sm'>自选</Button>}
                    {!__MOBILE__ && <Pagination defaultCurrent={1} total={80}/>}
                </div>
                <div>
                    {/*<Table columns={columns} dataSource={data} scroll={{x: 700}} pagination={false}/>*/}
                </div>

                {
                    !__MOBILE__ &&
                    <div className="flex_center_v boxTools ">
                        <Button className='margin_left_auto margin-right-sm'>自选</Button>
                        <Pagination defaultCurrent={1} total={80}/>
                    </div>
                }
            </section>
        )
    }
}