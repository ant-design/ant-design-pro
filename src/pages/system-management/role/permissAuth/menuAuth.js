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
    Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../../../List/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ role, menu, loading }) => ({
    role,
    menu,
    loading: loading.models.role,
}))
@Form.create()
class MenuAuth extends PureComponent {

    state = {
        selectedRows: [],
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'menu/fetch',
            payload: {},
        });
    };

    componentWillReceiveProps() {
    };

    handleSubmit = () => {
        // const roleId = this.props.match.params.roleId;
        const { dispatch,roleId } = this.props;
        const { selectedRows } = this.state;
        const roleMenus = [];
        selectedRows.forEach(row => {
            roleMenus.push({
                roleId: roleId,
                menuId: row.id,
            })
        });
        dispatch({
            type: 'role/menuAuth',
            payload: roleMenus,
        });
    };

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    handleCancle = () => {
        router.push('/system-management/role/list');
    };

    columns = [
        {
            title: '菜单名称',
            dataIndex: 'name',
        },
    ];

    render() {
        const {
            menu: { data },
            loading,
        } = this.props;
        const { selectedRows } = this.state;
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
                <StandardTable
                    bordered
                    rowKey="id"
                    size="small"
                    defaultExpandAllRows={true}
                    selectedRows={selectedRows}
                    loading={loading}
                    data={data}
                    columns={this.columns}
                    onSelectRow={this.handleSelectRows}
                />
            </div>
        );
    };
}
export default MenuAuth;
