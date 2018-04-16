import React from 'react';
import {Pagination} from "antd";
import {topic} from '../../constant/config';


export default class TopicList extends React.Component {
    constructor(props) {
        super(props);
    }

    _onChangePage = (page) => {
        location.href = `${location.pathname}?page=${page}`;
    }

    _renderTab = (value) => {
        if (value.top) return <span className='put-top'>置顶</span>;
        if(value.good) return <span className='put-top'>精华</span>;

        return <span className='topiclist-tab'>{topic[value.tab]}</span>
    }

    render() {
        const props = this.props;
        return (
            <div>
                <div className='topic_list'>

                    {props.topic_list.data.map(value => {
                        return (
                            <div key={value.id} className='cell flex_center_v'>

                                <a className="user_avatar">
                                    <img src={value.author.avatar_url} title="value.author.loginname"/>
                                </a>

                                <span className="reply_count">
                                                    <span className="count_of_replies" title="回复数">
                                                        {value.reply_count}
                                                    </span>
                                                <span className="count_seperator">/</span>
                                                    <span className="count_of_visits" title="点击数">
                                                        {value.visit_count}
                                                    </span>
                                                </span>
                                {
                                    this._renderTab(value)
                                }
                                <a className="topic_title" href={`/topic/${value.id}`}
                                   title={value.title}>
                                    {value.title}
                                </a>

                            </div>
                        )
                    })}
                </div>

                <div className='padding-sm' style={{background: 'white'}}>
                    <Pagination current={~~props.page} pageSize={40} total={1000}
                                onChange={this._onChangePage}/>
                </div>
            </div>
        )
    }
}