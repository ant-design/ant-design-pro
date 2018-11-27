import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Row, Col } from 'antd';

const FormItem = Form.Item;
const FormItemIconStyle = { color: 'rgba(0,0,0,.25)' };

@connect(({ user, loading }) => ({
  user,
  submitChangePasswordLoading: loading.effects['user/changePasswordFetch'],
}))
@Form.create()
class ChangePasswordForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    const { form } = this.props;
    form.validateFields();
  }

  componentWillUpdate(prevProps) {
    /*
     * 关闭后重置表单
     * */
    const {
      user: { showChangePasswordModal },
    } = prevProps;
    if (!showChangePasswordModal) {
      const { form } = this.props;
      form.resetFields();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'user/changePasswordFetch',
          payload: values,
        });
      }
    });
  }

  compareToFirstPassword(rule, value, callback) {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('您输入的两次密码不一致！');
    } else {
      callback();
    }
  }

  validateToNextPassword(rule, value, callback) {
    const { form } = this.props;
    if (value && form.getFieldsValue(['confirm'])) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched },
      submitChangePasswordLoading,
    } = this.props;

    // 表单布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    // 提交按钮 FormItem
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 12,
          offset: 7,
        },
      },
    };

    // 编辑后才会提示错误信息
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const newPasswordError = isFieldTouched('newPassword') && getFieldError('newPassword');
    const confirmError = isFieldTouched('confirm') && getFieldError('confirm');

    // 检测表单是否含有错误
    function hasErrors(fieldsError) {
      return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem
          label="旧密码"
          validateStatus={passwordError ? 'error' : 'success'}
          help={passwordError || ''}
          {...formItemLayout}
        >
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '必须输入旧密码！',
              },
            ],
          })(
            <Input
              type="password"
              placeholder="请输入旧密码"
              prefix={<Icon type="unlock" style={FormItemIconStyle} />}
            />
          )}
        </FormItem>
        <FormItem
          label="新密码"
          validateStatus={newPasswordError ? 'error' : ''}
          help={newPasswordError || ''}
          {...formItemLayout}
        >
          {getFieldDecorator('newPassword', {
            rules: [
              {
                required: true,
                message: '必须输入新密码！',
              },
              {
                validator: this.validateToNextPassword,
              },
              {
                max: 18,
                min: 6,
                message: '密码长度为6到18位',
              },
            ],
          })(
            <Input
              type="password"
              placeholder="请输入新密码"
              prefix={<Icon type="lock" style={FormItemIconStyle} />}
            />
          )}
        </FormItem>
        <FormItem
          label="确认密码"
          validateStatus={confirmError ? 'error' : ''}
          help={confirmError || ''}
          {...formItemLayout}
        >
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '必须确认新密码！',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input
              type="password"
              label=""
              placeholder="请再次输入新密码"
              prefix={<Icon type="lock" style={FormItemIconStyle} />}
            />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Row>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={submitChangePasswordLoading}
                disabled={hasErrors(getFieldsError())}
              >
                确认修改
              </Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

export default ChangePasswordForm;
