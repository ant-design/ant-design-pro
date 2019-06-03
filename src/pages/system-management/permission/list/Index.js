import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import {
    List,
    Card,
    Row,
    Col,
    Radio,
    Input,
    InputNumber,
    Progress,
    Button,
    Icon,
    Dropdown,
    Menu,
    Avatar,
    Modal,
    Form,
    DatePicker,
    Select,
    Badge,
    Popconfirm,
    message,
    Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
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
            title="新建权限"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限名称">
                {form.getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入权限名称' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限编码">
                {form.getFieldDecorator('code', {
                    rules: [{ required: true, message: '请输入权限编码' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限地址">
                {form.getFieldDecorator('url', {
                    rules: [{ required: true, message: '请输入权限地址' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="序号">
                {form.getFieldDecorator('sort', {
                    rules: [{ required: true, message: '请输入序号' }],
                })(<InputNumber size="large" style={{ width: '100%' }} placeholder="请输入" />)}
            </FormItem>
        </Modal>
    );
});

const UpdateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible, permission } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            fieldsValue.id = permission.id;
            handleAdd(fieldsValue);
        });
    };
    return (
        <Modal
            destroyOnClose
            title="编辑权限"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限名称">
                {form.getFieldDecorator('name', {
                    initialValue: permission.name,
                    rules: [{ required: true, message: '请输入权限名称' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限编码">
                {form.getFieldDecorator('code', {
                    initialValue: permission.code,
                    rules: [{ required: true, message: '请输入权限编码' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限地址">
                {form.getFieldDecorator('url', {
                    initialValue: permission.url,
                    rules: [{ required: true, message: '请输入权限地址' }],
                })(<Input size="large" placeholder="请输入" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="序号">
                {form.getFieldDecorator('sort', {
                    initialValue: permission.sort,
                    rules: [{ required: true, message: '请输入序号' }],
                })(<InputNumber size="large" style={{ width: '100%' }} placeholder="请输入" />)}
            </FormItem>
        </Modal>
    );
});

@connect(({ permission, loading }) => ({
    permission,
    loading: loading.models.permission,
}))
@Form.create()
class PermissionList extends PureComponent {
    state = {
        selectedRows: [],
        modalVisible: false,
        updateModalVisible: false,
        permission: {},
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'permission/fetch',
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

    handleUpdateModalVisible = flag => {
        this.setState({
            updateModalVisible: !!flag,
        });
    };

    handleAdd = values => {
        const { dispatch } = this.props;
        dispatch({
            type: 'permission/add',
            payload: values,
        });
        this.handleModalVisible()
    };

    handleUpdate = values => {
        const { dispatch } = this.props;
        dispatch({
            type: 'permission/update',
            payload: values,
        });
        this.handleUpdateModalVisible()
    };

    handleEdit = record => {
        console.log(record);
        this.setState({ permission: record });
        this.handleUpdateModalVisible(true);
    };

    handleDelete = record => {
        const { dispatch } = this.props;
        dispatch({
            type: 'permission/delete',
            payload: record.id,
        });
    };

    handleMenuClick = e => {
        console.log(e);
        const { selectedRows } = this.state;
        if (selectedRows.length === 0) return;
        switch (e.key) {
            case 'permissAuth':
                break;
            default:
                break;
        }
    };

    columns = [
        {
            title: '权限名称',
            dataIndex: 'name',
        },
        {
            title: '权限编码',
            dataIndex: 'code',
        },
        {
            title: '权限地址',
            dataIndex: 'url',
        },
        {
            title: '序号',
            dataIndex: 'sort',
        },
        {
            title: '操作',
            render: (text, record) => (
                <Fragment>
                    <a onClick={() => this.handleEdit(record)}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="你确定要删除此记录吗?"
                        onConfirm={() => this.handleDelete(record)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <a>删除</a>
                    </Popconfirm>
                </Fragment>
            ),
        },
    ];

    render() {
        const {
            permission: { data },
            loading,
        } = this.props;
        const { selectedRows, modalVisible, updateModalVisible, permission } = this.state;
        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };
        const parentUpdateMethods = {
            handleAdd: this.handleUpdate,
            handleModalVisible: this.handleUpdateModalVisible,
        }
        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
            </Menu>
        );
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        {/* <div className={styles.tableListForm}>{this.renderForm()}</div> */}
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
                <UpdateForm {...parentUpdateMethods} modalVisible={updateModalVisible} permission={permission} />
            </PageHeaderWrapper>
        );
    }
}

export default PermissionList;
