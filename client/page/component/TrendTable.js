import "./trendTable.css";
import React from "react";
import {Button, Icon, Input, Pagination, Select, Table} from "antd";

export default class TrendTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchActive: false
        }

    }

    toggleSearch = () => {
        this.setState({
            searchActive: !this.state.searchActive
        })
    }

    render() {
        const {searchActive} = this.state;

        const tableProp = __MOBILE__ ? {
            style: {width: '100vw'},
            scroll:{x:window.innerWidth+260}
        } : {};

        const columns = [
            {title: '排名', width: 60, dataIndex: 'age', key: 'name', fixed: 'left'},
            {title: '名称', width: 100, dataIndex: 'address', key: 'age', fixed: 'left'},
            {title: '价格', dataIndex: 'address', key: '1'},
            {title: '成交额24h', dataIndex: 'address', key: '2', sorter: true},
            {title: '流通供给量 ', dataIndex: 'age', key: '3'},
            {title: '流通市值', dataIndex: 'address', key: '4'},
            {title: '波动24h', dataIndex: 'address', key: '5'},
            {title: '自选状态', dataIndex: 'address', key: '6'}
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
                    {!searchActive && <Button type="primary" className='margin-right-sm'>全部</Button> }
                    {!searchActive && <Button className='margin-right-sm'>自选</Button>}
                    {!searchActive && <Select defaultValue="人民币（CNY）" style={{width: 128}} onChange={f => f}>
                        <Select.Option value="CNY">人民币（CNY）</Select.Option>
                    </Select>}
                    {
                        !__MOBILE__ ? null : (
                            !searchActive ?
                                <Icon type="search" className="margin_left_auto icon" onClick={this.toggleSearch}/> :
                                <Input.Search placeholder="输入币名或者交易所搜索"
                                              onSearch={value => console.log(value)}/>
                        )
                    }
                    {!__MOBILE__ && <Button className='margin_left_auto margin-right-sm'>自选</Button>}
                    {!__MOBILE__ && <Pagination defaultCurrent={1} total={80}/>}
                </div>
                <div>
                    <Table columns={columns} dataSource={data} pagination={false} size='small' {...tableProp}/>
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