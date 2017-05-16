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
import style from './lookImgDetail.scss';
const LookImgDetail = Component =>
    class Comp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                active: false,
                imgData: {}
            };

            this.actions = [
                {label: '确定', onClick: this.handleDialogClose}
            ];
        }

        handleDialogClose = () => {
            this.setState({active: false});
        }

        openImgDetailDialog = (data) => {
            this.setState({active: true, imgData: data});
        }

        copyImgLink = (url) => () => {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", url);
        }

        delelteImg = (imgData) => () => {
            Dialog.confirm({
                content: <strong style={{color: "red"}}>确认删除该图片?</strong>,
                onConfirm: () => {
                    console.log(imgData);
                }
            })
        }

        render() {
            const props = this.props;
            const {active, imgData} = this.state;
            return (
                <div>
                    <Dialog
                        className="overflowAuto"
                        actions={this.actions}
                        active={active}
                        onEscKeyDown={this.handleDialogClose}
                        onOverlayClick={this.handleDialogClose}>
                        <div className="flex">
                            <div className={style.img_container}>
                                <img src={imgData.url}/>
                            </div>
                            <div className="margin-left-bg" style={{maxWidth:"400px"}}>
                                <div className="margin-bottom-md">
                                    <p><em>文件名： </em>{imgData.name}</p>
                                    <p><em>url： </em>{imgData.url}</p>
                                </div>
                                <div className="flex-column flex_center_h">
                                    <div className="margin-bottom-sm">
                                        <Button raised primary label="复制图片链接" onClick={this.copyImgLink(imgData.url)}/>
                                    </div>
                                    <div className="">
                                        <Button raised accent label="删除图片" onClick={this.delelteImg(imgData)}/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Dialog>
                    <Component
                        {...props}
                        openImgDetailDialog={this.openImgDetailDialog}/>
                </div>
            )
        }
    }

export default LookImgDetail;
