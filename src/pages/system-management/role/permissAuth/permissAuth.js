import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
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
    message,
    Transfer,
    Table,
    Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../../../List/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ role, permission, loading }) => ({
    role,
    permission,
    loading: loading.models.role,
}))
@Form.create()
class PermissAuth extends PureComponent {

    state = {
        selectedRowKeys: [],
        selectedRows: [],
    };

    componentDidMount() {
        const { dispatch, roleId } = this.props;
        dispatch({
            type: 'permission/fetch',
            payload: {},
        });
        dispatch({
            type: 'role/permissionAuthGet',
            payload: roleId,
        });
    };

    componentWillReceiveProps() {
        const { role: { rolePermissAuths } } = this.props;
        const selectedRowKeys = [];
        rolePermissAuths.forEach(rolePermiss => {
            selectedRowKeys.push(rolePermiss.id);
        });
        this.setState({
            selectedRowKeys: selectedRowKeys
        });
    };

    handleSubmit = () => {
        const { dispatch, roleId } = this.props;
        const { selectedRows } = this.state;
        const rolePermission = [];
        selectedRows.forEach(row => {
            rolePermission.push({
                roleId: roleId,
                permissionId: row.id,
            })
        });
        dispatch({
            type: 'role/permissionAuth',
            payload: rolePermission,
        });
    };

    handleCancle = () => {
        router.push('/system-management/role/list');
    };

    handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    };

    columns = [
        {
            title: '功能名称',
            dataIndex: 'name',
        },
    ];

    render() {
        const {
            permission: { data },
            loading,
        } = this.props;
        const { selectedRowKeys, selectedRows } = this.state;
        const rowSelection = {
            selectedRowKeys: selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: record.disabled,
            }),
        };
        return (
            <div>
                <div className={styles.tableListOperator}>
                    <Button type="primary" size="large" onClick={() => this.handleSubmit()}>
                        确定授权
                    </Button>
                    <Button type="primary" size="large" onClick={() => this.handleCancle()}>
                        取消
                    </Button>
                </div>
                <Table
                    bordered
                    rowKey="id"
                    size="small"
                    defaultExpandAllRows={true}
                    rowSelection={rowSelection}
                    loading={loading}
                    dataSource={data.list}
                    columns={this.columns}
                />
            </div>
        );
    };
}
export default PermissAuth;
