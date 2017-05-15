import React from 'react';
import Button from 'react-cqtoolbox/lib/button';
import {ButtonGroup} from 'react-cqtoolbox/lib/button';
import Input from 'react-cqtoolbox/lib/input';
import InputGroup from 'react-cqtoolbox/lib/input_group';
import Pagination from 'react-cqtoolbox/lib/pagination';
import {DateRangeSelect} from 'react-cqtoolbox/lib/date_select';
import Select from 'react-cqtoolbox/lib/select';
import Table from 'react-cqtoolbox/lib/table';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import classNames from 'classnames';
import ImgUpload from '../decorator/ImgUpload';
import style from './media.scss';

class Media extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={style.media}>
                <div className="flex_center_v margin-bottom-bg">
                    <h2 className="margin-right-sm">媒体库</h2>
                    <Button icon="book" label="添加" primary onClick={this.props.openImgUploadDialog}></Button>
                </div>

                <div className="flex_center_v">
                    <div>
                        {/*<Select />*/}
                    </div>

                    <div className="margin_left_auto">
                        <InputGroup>
                            <Input placeholder="搜索媒体项目..."/>
                            <Button label="搜索"/>
                        </InputGroup>
                    </div>
                    <div id="img-container">

                    </div>
                </div>

            </div>

        )
    }
}

export default ImgUpload(Media);