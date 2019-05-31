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
    Tabs,
    Transfer,
    Divider,
} from 'antd';
const { TabPane } = Tabs;
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MenuAuth from './menuAuth';
import styles from '../../../List/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ role, menu, loading }) => ({
    role,
    menu,
    loading: loading.models.role,
}))
@Form.create()
class RolePermissAuth extends PureComponent {

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
        const roleId = this.props.match.params.roleId;
        const { dispatch } = this.props;
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
        const {roleId} = this.props.match.params.roleId;
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="菜单权限" key="1">
                                <MenuAuth roleId={roleId}/>
                            </TabPane>
                            <TabPane tab="功能权限" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    };
}
export default RolePermissAuth;
