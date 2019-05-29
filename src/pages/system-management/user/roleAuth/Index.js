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
    selectedRows: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/fetch',
      payload: {},
    });
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSubmit = () => {
    const { selectedRows } = this.state;
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
      role: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
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
            <StandardTable
              bordered
              rowKey="id"
              size="small"
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
            // onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  };
}

export default UserRoleAuth;
