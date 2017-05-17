import React from 'react';
import Button from 'react-cqtoolbox/lib/button';
import {ButtonGroup} from 'react-cqtoolbox/lib/button';
import Input from 'react-cqtoolbox/lib/input';
import InputGroup from 'react-cqtoolbox/lib/input_group';
import Checkbox from 'react-cqtoolbox/lib/checkbox';
import Table from 'react-cqtoolbox/lib/table';
import Dialog from 'react-cqtoolbox/lib/dialog';
import {API_getCategorys,API_addCategory,API_deleteCategory} from '../utils/api'
import {observer} from 'mobx-react';
import store from '../store/store';

const EditCategory = Component =>
    class EditCategoryComp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                active: false,
                dataSource: [],
                toBeAdd: ''
            };

            this.actions = [
                {label: '关闭', onClick: this.handleDialogClose}
            ];
        }

        componentDidMount() {

        }

        handleDialogClose = () => {
            this.setState({active: false});
        }

        openEditCategory = () => {
            store.updateCategory();
            this.setState({active: true});
        }

        handleInputChange = (toBeAdd) => {
            this.setState({toBeAdd});
        }

        onAddCatagory = () => {
            var type = this.state.toBeAdd;
            if (!type) return;

            API_addCategory(type).then(data => {
                if(data){
                    store.updateCategory()
                    Dialog.success({
                        content:"添加成功！"
                    })
                }
            })
        }

        deleteCategory = (id) => () => {
            Dialog.confirm({
                content: "确定删除该分类，危险操作⚠️",
                onConfirm: () => {
                    API_deleteCategory(id).then(data => {
                        if(data===true){
                            store.updateCategory()
                            Dialog.success({
                                content:"删除成功！"
                            })
                        }
                    })
                }
            })
        }

        _renderCategory = (data) => {
            data.map((v, i) => {
                v.key = i;
            });
            const dataSource = data;
            const columns = [
                {
                    title: '分类名称',
                    field: 'cata',
                    key: 'cata',
                    render: (field, {type}, index) => (type)
                }, {
                    title: '操作',
                    field: 'op',
                    key: 'op',
                    render: (field, {id}, index) => (<Button label="删除" raised accent onClick={this.deleteCategory(id)}/>)
                }];

            return <Table size="small" hoverable dataSource={dataSource} columns={columns}/>;
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
                        title="编辑分类">
                        <div>
                            <div className="margin-bottom-sm">
                                <InputGroup>
                                    <Input
                                        value={state.toBeAdd}
                                        placeholder="分类名称"
                                        onChange={this.handleInputChange}/>
                                    <Button primary accent label="添加" onClick={this.onAddCatagory}/>
                                </InputGroup>
                            </div>
                            <div>
                                {this._renderCategory(store.category.slice())}
                            </div>
                        </div>
                    </Dialog>
                    <Component
                        {...props}
                        openEditCategory={this.openEditCategory}/>
                </div>
            )
        }
    }

export default EditCategory;
