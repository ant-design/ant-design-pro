import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import { Button, Card, DatePicker, Divider, Dropdown, Form, Icon, Input, Menu, Modal, Popconfirm } from 'antd';
import { connect } from 'dva';
import React, { Fragment, PureComponent } from 'react';
import styles from '../../../List/TableList.less';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            handleAdd(fieldsValue);
        });
    };
    return (
        <Modal
            destroyOnClose
            title="新建字典"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="编码">
                {form.getFieldDecorator('code', {
                    rules: [{ required: true, message: '请输入字典编码' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
                {form.getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入字典名称' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
        </Modal>
    );
});

const UpdateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible, dict } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            fieldsValue.id = dict.id;
            handleAdd(fieldsValue);
        });
    };
    return (
        <Modal
            destroyOnClose
            title="编辑字典"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="编码">
                {form.getFieldDecorator('code', {
                    initialValue: dict.code,
                    rules: [{ required: true, message: '请输入字典编码' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
                {form.getFieldDecorator('name', {
                    initialValue: dict.name,
                    rules: [{ required: true, message: '请输入字典名称' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
        </Modal>
    );
});

const CreateItemForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible, dict } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            fieldsValue.dictId = dict.id;
            handleAdd(fieldsValue);
        });
    };
    return (
        <Modal
            destroyOnClose
            title="新建字典明细"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典值">
                {form.getFieldDecorator('code', {
                    rules: [{ required: true, message: '请输入字典值' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典名">
                {form.getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入字典名称' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
        </Modal>
    );
});

const UpdateItemForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible, dictItem } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            fieldsValue.id = dictItem.id;
            handleAdd(fieldsValue);
        });
    };
    return (
        <Modal
            destroyOnClose
            title="编辑字典明细"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典值">
                {form.getFieldDecorator('code', {
                    initialValue: dictItem.code,
                    rules: [{ required: true, message: '请输入字典值' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典名">
                {form.getFieldDecorator('name', {
                    initialValue: dictItem.name,
                    rules: [{ required: true, message: '请输入字典名称' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
        </Modal>
    );
});

@connect(({ dict, loading }) => ({
    dict,
    loading: loading.models.dict,
}))
@Form.create()
class DictList extends PureComponent {

    state = {
        selectedRows: [],
        expandForm: false,
        modalVisible: false,
        modalItemVisible: false,
        dict: {},
        updateModalVisible: false,
        updateItemModalVisible: false,
        dictItem: {},
    };
    
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'dict/fetch',
            payload: {},
        });
    }

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'role/fetch',
            payload: params,
        });
    };

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    handleModalVisible = flag => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    handleUpdateModalVisible = (flag, record) => {
        this.setState({
            updateModalVisible: !!flag,
            dict: record || {},
        });
    }

    handleUpdateItemModalVisible = (flag, record) => {
        this.setState({
            updateItemModalVisible: !!flag,
            dictItem: record || {},
        });
    }

    handleItemModalVisible = (flag, record) => {
        this.setState({
            modalItemVisible: !!flag,
            dict: record || {},
        });
    };

    handleAdd = values => {
        const { dispatch } = this.props;
        dispatch({
            type: 'dict/add',
            payload: values,
        });
        this.handleModalVisible()
    };

    handleUpdate = values => {
        const { dispatch } = this.props;
        dispatch({
            type: 'dict/update',
            payload: values,
        });
        this.handleUpdateModalVisible()
    }

    handleAddItem = values => {
        const { dispatch } = this.props;
        dispatch({
            type: 'dict/addItem',
            payload: values,
        });
        this.handleItemModalVisible()
    };

    handleUpdateItem = values => {
        const { dispatch } = this.props;
        dispatch({
            type: 'dict/updateItem',
            payload: values,
        });
        this.handleUpdateItemModalVisible()
    }

    handleDelete = record => {
        const { dispatch } = this.props;
        dispatch({
            type: 'dict/delete',
            payload: record.id,
        });
    };

    handleDeleteItem = record => {
        const { dispatch } = this.props;
        dispatch({
            type: 'dict/deleteItem',
            payload: record.id,
        });
    }

    columns = [
        {
            title: '编码',
            dataIndex: 'code',
            editable: true,
        },
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            render: (text, record) => (
                <Fragment>
                    {record.children && (
                        <span>
                            <a onClick={() => this.handleItemModalVisible(true, record)}>新增明细</a>
                            <Divider type="vertical" />
                            <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="你确定要删除此记录吗?"
                                onConfirm={() => this.handleDelete(record)}
                                okText="确定"
                                cancelText="取消"
                            >
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    )}
                    {!record.children && (
                        <span>
                            <a onClick={() => this.handleUpdateItemModalVisible(true, record)}>编辑</a>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="你确定要删除此记录吗?"
                                onConfirm={() => this.handleDeleteItem(record)}
                                okText="确定"
                                cancelText="取消"
                            >
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    )}
                </Fragment>
            ),
        },
    ];

    render() {
        const {
            dict: { data },
            loading,
        } = this.props;
        const { selectedRows, modalVisible, modalItemVisible, updateModalVisible, updateItemModalVisible, dict, dictItem } = this.state;
        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
            </Menu>
        );
        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };
        const parentItemMethods = {
            handleAdd: this.handleAddItem,
            handleModalVisible: this.handleItemModalVisible,
        };
        const parentUpdateMethods = {
            handleAdd: this.handleUpdate,
            handleModalVisible: this.handleUpdateModalVisible,
        };
        const parentUpdateItemMethods = {
            handleAdd: this.handleUpdateItem,
            handleModalVisible: this.handleUpdateItemModalVisible,
        };
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" size="large" onClick={() => this.handleModalVisible(true)}>
                                新增
                            </Button>
                            {selectedRows.length > 0 && (
                                <span>
                                    <Dropdown overlay={menu}>
                                        <Button icon="more" type="primary" size="large">
                                            更多操作 <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </span>
                            )}
                        </div>
                        <StandardTable
                            bordered
                            rowKey="id"
                            size="small"
                            selectedRows={selectedRows}
                            loading={loading}
                            data={data}
                            columns={this.columns}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
                <CreateForm {...parentMethods} modalVisible={modalVisible} />
                <CreateItemForm {...parentItemMethods} modalVisible={modalItemVisible} dict={dict} />
                <UpdateForm {...parentUpdateMethods} modalVisible={updateModalVisible} dict={dict} />
                <UpdateItemForm {...parentUpdateItemMethods} modalVisible={updateItemModalVisible} dictItem={dictItem} />
            </PageHeaderWrapper>
        );
    }
}

export default DictList;
