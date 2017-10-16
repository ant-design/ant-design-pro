import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, DatePicker, Select, Button, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

@connect(state => ({
  submitting: state.form.regularFormSubmitting,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 3 },
      },
    };

    return (
      <PageHeaderLayout title="基础表单" content="表单页是向后台提交数据的标准场景。">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 24 }}>
            <FormItem
              {...formItemLayout}
              label="应用类型"
              hasFeedback
            >
              {getFieldDecorator('appType', {
                rules: [{
                  required: true, message: '应用类型',
                }],
              })(
                <Select placeholder="请选择应用类型">
                  <Option value="type1">类型一</Option>
                  <Option value="type2">类型二</Option>
                  <Option value="type3">类型三</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="产品名"
              hasFeedback
            >
              {getFieldDecorator('productName', {
                rules: [{
                  required: true, message: '请输入产品名',
                }],
              })(
                <Input placeholder="产品名" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="应用名"
              hasFeedback
            >
              {getFieldDecorator('appName', {
                rules: [
                  { required: true, message: '请输入应用名' },
                  { pattern: /^[a-zA-Z0-9-]+$/, message: '只能输入英文、数字、中划线' },
                ],
              })(
                <Input placeholder="只能输入英文、数字、中划线" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="中文名"
              hasFeedback
            >
              {getFieldDecorator('appChineseName', {
                rules: [
                  { required: true, message: '请输入应用中文名' },
                  { pattern: /^[\u4e00-\u9fa5]+$/, message: '请输入中文' },
                ],
              })(
                <Input placeholder="应用中文名" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="生效日期"
            >
              {getFieldDecorator('dateRange', {
                rules: [{ type: 'array', required: true, message: '请选择生效日期' }],
              })(
                <RangePicker
                  format="YYYY-MM-DD"
                  placeholder={['开始日期', '结束日期']}
                  style={{ width: '100%' }}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="域名"
            >
              {getFieldDecorator('domain', {
                rules: [{ required: true, message: '请输入域名' }],
              })(
                <Input addonBefore="http://" addonAfter=".com" placeholder="facebook" style={{ width: '100%' }} />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 40 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                新建应用
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
