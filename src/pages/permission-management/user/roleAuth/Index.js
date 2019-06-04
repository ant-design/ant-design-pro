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

@connect(({ user, role, loading }) => ({
  user,
  role,
  loading: loading.models.user,
}))
@Form.create()
class UserRoleAuth extends PureComponent {

  state = {
    targetKeys: [],
    selectedKeys: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/fetch',
      payload: {},
    });
    dispatch({
      type: 'user/getRoles',
      payload: this.props.match.params.userId,
    });
  };

  componentWillReceiveProps() {
    const { user: { userRoles } } = this.props;
    this.setState({ targetKeys: userRoles.map(item => item.id) });
  };

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  };

  handleSubmit = () => {
    const userId = this.props.match.params.userId;
    const { dispatch } = this.props;
    const { targetKeys } = this.state;
    const userRoles = [];
    targetKeys.forEach(row => {
      userRoles.push({
        userId: userId,
        roleId: row,
      })
    });
    dispatch({
      type: 'user/roleAuth',
      payload: userRoles,
    });
  };

  handleCancle = () => {
    router.push('/system-management/user/list');
  };

  columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
    },
    {
      title: '角色描述',
      dataIndex: 'descr',
    },
  ];

  render() {
    const {
      role: { data: { list } },
      loading,
    } = this.props;
    list.forEach(item => {
      item.key = item.id
    });
    const { targetKeys, selectedKeys } = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button type="primary" size="large" onClick={() => this.handleSubmit()}>
                确定授权
              </Button>
              <Button type="primary" size="large" onClick={() => this.handleCancle()}>
                取消
              </Button>
            </div>
            <Transfer
              dataSource={list}
              titles={['系统角色', '用户角色']}
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              onChange={this.handleChange}
              onSelectChange={this.handleSelectChange}
              render={item => item.roleName}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  };
}

export default UserRoleAuth;
