import React from 'react';
import Button from 'react-cqtoolbox/lib/button';
import {ButtonGroup} from 'react-cqtoolbox/lib/button';
import Input from 'react-cqtoolbox/lib/input';
import InputGroup from 'react-cqtoolbox/lib/input_group';
import Pagination from 'react-cqtoolbox/lib/pagination';
import {DateRangeSelect} from 'react-cqtoolbox/lib/date_select';
import Table from 'react-cqtoolbox/lib/table';
import style from './articleList.scss';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import classNames from 'classnames';
export default class ArticleList extends React.Component {
    constructor(props) {
        super(props);
    }

    _onPageChange = () => {

    }

    _renderArticles(articles = []){
        articles.map((v, i) => {
            v.key = i
        });
        const dataSource = articles;
        const columns = [
            {
                title: '标题',
                field: 'title',
                key: 'title',

            }, {
                title: '分类目录',
                field: 'category',
                key: 'category',
            }, {
                title: '评论',
                field: 'comment',
                key: 'comment',
            }, {
                title: '日期',
                field: 'time',
                key: 'time',
            }];

        return <Table size="small" hoverable dataSource={dataSource} columns={columns} />;
    }

    render() {
        // const {articles} = this.state;
        return (
            <div>
                <div className={classNames(style.article_list, "flex_center_v", "margin-bottom-sm")}>
                    <h2 className="margin-right-sm">文章列表</h2>
                    <Link to="/write"><Button icon="book" label="写文章" primary></Button></Link>
                </div>
                <div className="flex_center_v">
                    <ButtonGroup size="small">
                        <Button primary raised label="全部"/>
                        <Button primary label="已发布"/>
                        <Button primary label="草稿"/>
                    </ButtonGroup>
                    <div className="margin_left_auto">
                        <InputGroup>
                            <Input placeholder=""/>
                            <Button label="搜索"/>
                        </InputGroup>
                    </div>
                </div>
                {this._renderArticles()}

                <div className="flex_center_h">
                    <Pagination
                        currentPage={1}
                        totalPages={2}
                        onChange={this._onPageChange}/>
                </div>

            </div>

        )
    }
}