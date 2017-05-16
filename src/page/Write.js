import React from 'react';
import {Button} from 'react-cqtoolbox/lib/button';
import {Select} from 'react-cqtoolbox/lib/select';
import {Input} from 'react-cqtoolbox/lib/input';
import Dialog from 'react-cqtoolbox/lib/dialog';
import {Checkbox} from 'react-cqtoolbox/lib/checkbox';
import Editor from '../component/Editor';
import {observer} from 'mobx-react';
import style from './write.scss';
import ArticlePreview from '../decorator/ArticlePreview';
import EditCategory from '../decorator/EditCategory';
import {API_addArticle, API_getArticle, API_updateArticle} from '../utils/api';
import store from '../store/store';
import classNames from 'classnames';

@observer
@EditCategory
@ArticlePreview
class Write extends React.Component {
    constructor(props) {
        super(props);
        console.log(window.location.hash);
        this.state = {
            title: "",
            content: "",
            isEdit: store.editArticleId,
            articleId: store.editArticleId,
            checkIds: []
        }
    }

    _handleTitleChange = (title) => {
        this.setState({title})
    }

    componentDidMount() {
        const {isEdit, articleId} = this.state;
        if (isEdit) {
            API_getArticle(articleId).then(data => {
                store.editArticleId = undefined;
                this.editor.setValue(data.content);
                this.setState({
                    title: data.title,
                    checkIds:data.categoryIds
                })
            })
        }

        store.updateCategory();
    }

    componentWillUnMount() {
        store.editArticleId = undefined
    }

    _editCatagory = () => {
        this.props.openEditCategory();
    }

    previewArticle = () => {
        const {title} = this.state;
        const content = this.editor.getValue();
        if (!title || !content) {
            Dialog.error({content: "标题或正文不能为空！"})
            return;
        }
        if (this.state.checkIds.length === 0) {
            Dialog.error({content: "请为文章选择一个分类！"})
            return;
        }
        var categoryIds = this.state.checkIds;
        var postData = {
            title, content, categoryIds
        }
        this.props.openPreview(postData, {time: (new Date()).getTime()})
    }

    publishArticle = () => {
        const {title, isEdit, articleId} = this.state;
        const content = this.editor.getValue();
        if (!title || !content) {
            Dialog.error({content: "标题或正文不能为空！"})
            return;
        }
        if (this.state.checkIds.length === 0) {
            Dialog.error({content: "请为文章选择一个分类！"})
            return;
        }
        var categoryIds = this.state.checkIds;
        var postData = {
            title, content, categoryIds
        }

        if (isEdit) {
            postData.id = articleId;
        }

        var API_func = isEdit ? API_updateArticle : API_addArticle;

        Dialog.confirm({
            content: <strong style={{color: "red"}}>确认发布新文章?</strong>,
            onConfirm: () => {
                API_func(postData).then(data => {
                    if (data === true) {
                        Dialog.success({
                            content: "发布成功"
                        })
                    }
                })
            }
        });
    }

    _onCheck = (id) => (checked) => {
        var {checkIds} = this.state;
        var exist = checkIds.indexOf(id) !== -1;
        if (checked) {
            if (!exist) {
                checkIds.push(id);
            }
        } else {
            if (exist) {
                checkIds.splice(checkIds.indexOf(id), 1);
            }
        }
        this.setState({checkIds});
    }

    _renderCatogory = () => {
        var cate = store.category;
        return cate.map((v, i) => {
            return (<Checkbox key={i} checked={this.state.checkIds.indexOf(v.id) !== -1} label={v.type}
                             onChange={this._onCheck(v.id)}/>)
        })

    }

    render() {
        const {title, isEdit, articleId} = this.state;
        return (
            <div className={style.write}>
                <div>
                    <h2 className="padding-bottom-sm">{isEdit ? `正在编辑文章：${title}` : "撰写新文章"}</h2>
                </div>
                <div className="margin-bottom-sm">
                    <Input
                        type='text'
                        size="small"
                        placeholder='标题'
                        value={title}
                        theme={style}
                        onChange={this._handleTitleChange}/>
                </div>
                <div className="flex">
                    <div className="flex1">
                        <Editor ref={editor => this.editor = editor}/>
                    </div>
                    <div className={classNames("margin-left-bg", style.right)}>
                        <section className="section-warpper margin-bottom-md">
                            <div className="section-title flex_center_v flex-space-between">
                                <h2>选择分类</h2>
                                <Button label="编辑分类" onClick={this._editCatagory}/>
                            </div>
                            <div className="padding-left-md">
                                {this._renderCatogory()}
                            </div>

                            <div className="padding-sm">
                            </div>
                        </section>
                        <section className="section-warpper">
                            <div className="section-title">
                                <h2>操作</h2>
                            </div>

                            <div className="padding-sm">
                                <div className="flex-space-between margin-bottom-sm">
                                    <Button label="保存草稿"/>
                                    <Button label="预览" primary onClick={this.previewArticle}/>
                                </div>
                                <div>
                                    <Button label={isEdit ? "再次发布" : "发布"} raised accent onClick={this.publishArticle}/>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Write;