import React from 'react';
import Button from 'react-cqtoolbox/lib/button';
import {ButtonGroup} from 'react-cqtoolbox/lib/button';
import Input from 'react-cqtoolbox/lib/input';
import InputGroup from 'react-cqtoolbox/lib/input_group';
import Pagination from 'react-cqtoolbox/lib/pagination';
import {DateRangeSelect} from 'react-cqtoolbox/lib/date_select';
import Select from 'react-cqtoolbox/lib/select';
import Table from 'react-cqtoolbox/lib/table';
import Dialog from 'react-cqtoolbox/lib/dialog';
import {API_uploadImage} from '../utils/api';
import $ from 'jquery';
import ArticleContent from '../component/ArticleContent';

const ArticlePreview = Component =>
    class ArticlePreviewComp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                active: false,
                article:{}
            };

            this.actions = [
                {label: '关闭', onClick: this.handleDialogClose}
            ];
        }

        handleDialogClose = () => {
            this.setState({active: false});
        }

        openPreview = (data,option = {}) => {
            var article = Object.assign(data,option);
            this.setState({article,active:true});
        }

        render() {
            const props = this.props;
            const state = this.state;
            return (
                <div>
                    <Dialog
                        className="overflowAuto"
                        actions={this.actions}
                        active={state.active}
                        onEscKeyDown={this.handleDialogClose}
                        onOverlayClick={this.handleDialogClose}
                        title="预览">
                        <div>
                           <ArticleContent {...state.article} />
                        </div>
                    </Dialog>
                    <Component
                        {...props}
                        openPreview={this.openPreview}/>
                </div>
            )
        }
    }

export default ArticlePreview;
