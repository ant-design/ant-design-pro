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
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../../../List/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
@Form.create()
class UserRoleAuth extends PureComponent {
  state = {
  };

  componentDidUpdate() {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'user/roleAuth',
          payload: values,
        });
      }
    });
  };

  handleCancle = e => {
    router.push('/system-management/user/list');
  };

  render() {
    
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  };
}

export default UserRoleAuth;
