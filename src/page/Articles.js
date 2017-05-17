import React from 'react';
import moment from 'moment';
import Button from 'react-cqtoolbox/lib/button';
import {ButtonGroup} from 'react-cqtoolbox/lib/button';
import Input from 'react-cqtoolbox/lib/input';
import InputGroup from 'react-cqtoolbox/lib/input_group';
import Pagination from 'react-cqtoolbox/lib/pagination';
import {DateRangeSelect} from 'react-cqtoolbox/lib/date_select';
import Table from 'react-cqtoolbox/lib/table';
import Dialog from 'react-cqtoolbox/lib/dialog';
import style from './articleList.scss';
import {API_getArticleByArticleId, API_deleteArticle, API_getCategorys, API_AllgetArticle} from '../utils/api';
import ArticlePreview from '../decorator/ArticlePreview';
import {observer} from 'mobx-react';
import {withRouter} from 'react-router'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import store from '../store/store';
import classNames from 'classnames';

@observer
@withRouter
@ArticlePreview
class ArticleList extends React.Component {
    state = {
        articles: [],
        page: 1,
        total: 0,
        limit: 10
    }

    componentDidMount() {
        this._refreshArticle();
        store.updateCategory();
    }

    _refreshArticle(page = 1) {
        API_AllgetArticle(-1, page, this.state.limit).then(data => {
            data.contents.sort(function (a, b) {
                return b.time - a.time
            });
            this.setState({
                articles: data.contents,
                page: page,
                total: data.total
            })
        });
    }

    _onPageChange = (page) => {
        this.setState({page});
        this._refreshArticle(page);
    }

    _lookArticle = (id) => () => {
        API_getArticleByArticleId(id).then(data => {
            this.props.openPreview(data);
        })
    }

    _editArticle = (id) => () => {
        const props = this.props;
        store.editArticleId = id;
        props.history.push("/write");
        // window.location.href = `/write#${id}`;
    }

    _deleteArticle = (id) => () => {
        Dialog.confirm({
            content: <strong style={{color: "red"}}>确认删除该文章?</strong>,
            onConfirm: () => {
                API_deleteArticle(id).then(data => {
                    if (data === true) {
                        this._refreshArticle();
                    }
                })
            }
        })

    }

    // state 全部：-1 草稿：0 已发布：1
    _renderArticles = (articles = []) => {
        const dataSource = articles.map((v, i) => {
            v.key = i;
            return v;
        });
        const {limit, page} = this.state;
        const STATE = {
            "-1" : "全部",
            "0" : "草稿",
            "1" : "已发布"
        }
        const columns = [
            {
                title: '序号',
                field: 'index',
                key: 'index',
                render: (field, {title, id}, index) => (limit *(page-1) + index +1)

            },
            {
                title: '状态',
                field: 'state',
                key: 'state',
                render: (field, {state}, index) => (STATE[state])

            },
            {
                title: '标题',
                field: 'title',
                key: 'title',
                render: (field, {title, id}, index) => (<a title={id} onClick={this._lookArticle(id)}>{title}</a>)

            }, {
                title: '分类目录',
                field: 'category',
                key: 'category',
                render: (field, {categoryIds}, index) => {
                    var ret = [];
                    for (var cateId of categoryIds) {
                        for (var value of store.category) {
                            if (value.id == cateId) {
                                ret.push(value.type);
                            }
                        }
                    }

                    return ret.join(",");
                }
            }, {
                title: '阅读量',
                field: 'readNum',
                key: 'readNum',
                render: (field, {readNum}, index) => (readNum)
            }, {
                title: '评论',
                field: 'comment',
                key: 'comment',
                render: (field, {categoryIds}, index) => ("0")
            }, {
                title: '日期',
                field: 'time',
                key: 'time',
                render: (field, {time}, index) => (moment(time).format('YYYY-MM-DD HH:mm:ss'))
            }, {
                title: '操作',
                field: 'op',
                key: 'op',
                width: "140px",
                render: (field, {id}, index) => {
                    return (
                        <div>
                            <Button label="编辑" onClick={this._editArticle(id)}/>
                            <Button raised accent label="删除" onClick={this._deleteArticle(id)}/>
                        </div>
                    );
                }
            }];

        return <Table size="small" hoverable dataSource={dataSource} columns={columns}/>;
    }

    render() {
        const {articles, page, total, limit} = this.state;
        return (
            <div>
                <div className={classNames(style.article_list, "flex_center_v", "margin-bottom-sm")}>
                    <h2 className="margin-right-sm">文章列表：共{total}篇</h2>
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
                {this._renderArticles(articles)}

                <div className="flex_center_h">
                    <Pagination
                        currentPage={page}
                        totalPages={Math.max(1, Math.ceil(total / limit))}
                        onChange={this._onPageChange}/>
                </div>

            </div>
        )
    }
}

export default ArticleList;