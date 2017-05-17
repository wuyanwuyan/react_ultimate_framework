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
const ImgUpload = Component =>
    class ImgUploadComp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                active: false,
            };

            this.actions = [
                {label: '上传', onClick: this.handleSubmit},
                {label: '取消', onClick: this.handleDialogClose}
            ];
        }

        handleDialogClose = () => {
            this.setState({active: false});
        }

        openImgUploadDialog = () => {
            this.setState({active: true});
        }

        handleSubmit = () => {
            const files = this.refs.file.files;
            var formData = new FormData();
            if (files.length === 0) return;
            for (var i = 0; i < files.length; i++) {
                formData.append('image', files[i]);
            }

            API_uploadImage(formData).then(data => {

                window.location.reload();

            })
            // window.fetch("upload",{
            //     method:"post",
            //     body:formData
            // });


            // var x = new XMLHttpRequest();
            // x.open('POST', "/upload");
            // x.send(formData);

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

                            <form>
                                <input ref='file' multiple type="file" name='upload' accept="image/*"></input>
                            </form>

                        </div>
                    </Dialog>
                    <Component
                        {...props}
                        openImgUploadDialog={this.openImgUploadDialog}/>
                </div>
            )
        }
    }

export default ImgUpload;
