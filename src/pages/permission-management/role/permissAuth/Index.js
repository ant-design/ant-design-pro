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
import PermissAuth from './permissAuth';
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
    };

    componentDidMount() {
    };

    componentWillReceiveProps() {
    };

    render() {
        const { roleId } = this.props.match.params;
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="菜单权限" key="1">
                                <MenuAuth roleId={roleId} />
                            </TabPane>
                            <TabPane tab="功能权限" key="2">
                                <PermissAuth roleId={roleId} />
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    };
}
export default RolePermissAuth;
