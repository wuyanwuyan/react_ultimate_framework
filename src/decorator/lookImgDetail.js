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
import {uploadFile} from '../utils/api';
import $ from 'jquery';
const LookImgDetail = Component =>
    class Comp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                active: false,
                imgData:{}
            };

            this.actions = [
                {label: '确定', onClick: this.handleSubmit},
                {label: '取消', onClick: this.handleDialogClose}
            ];
        }

        handleDialogClose = () => {
            this.setState({active: false});
        }

        openImgDetailDialog = (data) => {
            this.setState({active: true,imgData:data});
        }

        handleSubmit = () => {
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
                        onOverlayClick={this.handleDialogClose}>
                        <div>
                            <img src={state.imgData.url} />
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
