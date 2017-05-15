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
import LookImgDetail from '../decorator/lookImgDetail';
import style from './media.scss';

class Media extends React.Component {
    constructor(props) {
        super(props);

    }

    _handleImgClick = (data) => () => {
        this.props.openImgDetailDialog(data);
    }

    _renderImages = (data) => {
        for (var i = 0; i < 100; i++) {
            data[i] = {
                url: "http://growing.cqaso.com/wp-content/uploads/2017/05/timg-9-1.jpg",
                name: Math.random(),
                key: i
            }
        }
        const ret = data.map((v) => {
            return (
                <li className={style.image_container} key={v.key} onClick={this._handleImgClick(v)}>
                    <div className={style.img_inner}>
                        <img src={v.url} className={style.img}/>
                    </div>

                </li>
            );
        });

        return ret;
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

                </div>
                <div className={style.img_container}>
                    <ul className={style.ul}>
                        {this._renderImages([])}
                    </ul>
                </div>
            </div>

        )
    }
}

export default LookImgDetail(ImgUpload(Media));