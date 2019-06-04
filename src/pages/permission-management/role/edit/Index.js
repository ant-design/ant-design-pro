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

@connect(({ role, loading }) => ({
  role,
  loading: loading.models.role,
}))
@Form.create()
class roleEdit extends PureComponent {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    const { dispatch } = this.props;
    dispatch({
      type: 'role/get',
      payload: this.props.match.params.id,
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('确认密码不一致!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { dispatch } = this.props;
        values.id = this.props.match.params.id;
        dispatch({
          type: 'role/update',
          payload: values,
        });
      }
    });
  };

  handleCancle = e => {
    router.push('/permission-management/role/list');
  };

  render() {
    const {
      form: { getFieldDecorator },
      role: { role },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit} labelAlign="right">
              <FormItem label="角色编码">
                {getFieldDecorator('roleCode', {
                  initialValue: role.roleCode,
                  rules: [
                    {
                      required: true,
                      message: '请输入角色编码',
                    },
                  ],
                })(<Input placeholder="角色编码" size="large" />)}
              </FormItem>

              <FormItem label="角色名称">
                {getFieldDecorator('roleName', {
                  initialValue: role.roleName,
                  rules: [
                    {
                      required: true,
                      message: '请输入角色名称',
                    },
                  ],
                })(<Input placeholder="角色名称" size="large" />)}
              </FormItem>
              <FormItem label="角色描述">
                {getFieldDecorator('descr', {
                  initialValue: role.descr,
                  rules: [
                    {
                      required: true,
                      message: '请输入角色描述',
                    },
                  ],
                })(<Input placeholder="角色描述" size="large" />)}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" icon="check" size="large">
                  确定
                </Button>
                <Button
                  style={{ marginLeft: 8 }}
                  onClick={this.handleCancle}
                  icon="close"
                  type="danger"
                  size="large"
                >
                  取消
                </Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default roleEdit;
