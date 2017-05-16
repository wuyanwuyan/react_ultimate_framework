import React from 'react';
import {Button} from 'react-cqtoolbox/lib/button';
import {Select} from 'react-cqtoolbox/lib/select';
import {Input} from 'react-cqtoolbox/lib/input';
import Dialog from 'react-cqtoolbox/lib/dialog';

import Editor from '../component/Editor';

import style from './write.scss';
import ArticlePreview from '../decorator/ArticlePreview';
import {API_addArticle} from '../utils/api';
class Write extends React.Component {
    state = {
        title: ""
    }


    _handleTitleChange = (title) => {
        this.setState({title})
    }

    componentDidMount() {

    }

    publishArticle = () => {
        const {title} = this.state;
        const content = this.editor.getValue();
        if (!title || !content) {
            Dialog.error({content: "标题或正文不能为空！"})
            return;
        }
        var categoryId = "1,2,3"
        var postData = {
            title, content, categoryId
        }

        Dialog.confirm({
            content: <strong style={{color: "red"}}>确认发布新文章?</strong>,
            onConfirm: () => {
                API_addArticle(postData).then(data => {
                    if (data === true) {
                        Dialog.success({
                            context:"发布成功"
                        })
                    }
                })
            }
        });
    }

    render() {
        const {title} = this.state;
        return (
            <div className={style.write}>
                <div>
                    <h2>撰写新文章</h2>
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
                    <div className="margin-left-bg">
                        <section className="section-warpper">
                            <div className="section-title border-bottom-line">
                                <h2>操作</h2>
                            </div>

                            <div className="padding-sm">
                                <div className="flex-space-between margin-bottom-sm">
                                    <Button label="保存草稿"/>
                                    <Button label="预览" primary/>
                                </div>
                                <div>
                                    <Button label="发布" raised accent onClick={this.publishArticle}/>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default ArticlePreview(Write);