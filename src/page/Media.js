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
import {API_ugetImages} from '../utils/api';


const prefix = "http://cqaso.oss-cn-shanghai.aliyuncs.com/"

class Media extends React.Component {
    state = {
        allImg: []
    }


    componentDidMount() {
        API_ugetImages().then(allImg => {
            this.setState({allImg});
        })
    }

    _handleImgClick = (v) => () => {
        this.props.openImgDetailDialog({
            url: prefix + v,
            name: v

        });
    }

    _renderImages = (allImg = []) => {
        const ret = allImg.map((v, i) => {
            return (
                <li className={style.image_container} key={i} onClick={this._handleImgClick(v)}>
                    <div className={style.img_inner}>
                        <img src={prefix + v} className={style.img}/>
                    </div>

                </li>
            );
        });

        return ret;
    }

    render() {
        const {allImg} = this.state;
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
                        {this._renderImages(allImg || [])}
                    </ul>
                </div>
            </div>

        )
    }
}

export default LookImgDetail(ImgUpload(Media));