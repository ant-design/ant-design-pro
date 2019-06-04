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
class UserEdit extends PureComponent {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    const { dispatch } = this.props;
    dispatch({
      type: 'user/get',
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
        values.id = this.props.match.params.id;
        const { dispatch } = this.props;
        dispatch({
          type: 'user/update',
          payload: values,
        });
      }
    });
  };

  handleCancle = e => {
    router.push('/permission-management/user/list');
  };

  render() {
    const {
      form: { getFieldDecorator },
      user: { user },
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
              <FormItem label="账号">
                {getFieldDecorator('userName', {
                  initialValue: user.userName,
                  rules: [
                    {
                      required: true,
                      message: '请输入账号',
                    },
                  ],
                })(<Input placeholder="账号" size="large" disabled />)}
              </FormItem>
              <FormItem label="邮箱">
                {getFieldDecorator('email', {
                  initialValue: user.email,
                  rules: [
                    {
                      type: 'email',
                      message: '请输入正确的邮箱地址',
                    },
                    {
                      required: false,
                      message: '请输入邮箱',
                    },
                  ],
                })(<Input placeholder="邮箱" size="large" />)}
              </FormItem>
              <FormItem label="手机">
                {getFieldDecorator('mobile', {
                  initialValue: user.mobile,
                  rules: [
                    {
                      required: false,
                      message: '请输入手机',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '请输入正确的手机号',
                    },
                  ],
                })(
                  <Input
                    placeholder="手机"
                    addonBefore={prefixSelector}
                    style={{ width: '100%' }}
                    size="large"
                  />
                )}
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

export default UserEdit;
