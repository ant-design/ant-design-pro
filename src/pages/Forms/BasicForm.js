import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
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
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.basic.title" />}
        content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.title.label" />}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.date.label" />}>
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.date.required' }),
                  },
                ],
              })(
                <RangePicker
                  style={{ width: '100%' }}
                  placeholder={[
                    formatMessage({ id: 'form.date.placeholder.start' }),
                    formatMessage({ id: 'form.date.placeholder.end' }),
                  ]}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.goal.label" />}>
              {getFieldDecorator('goal', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.goal.required' }),
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'form.goal.placeholder' })}
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.standard.label" />}>
              {getFieldDecorator('standard', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.standard.required' }),
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'form.standard.placeholder' })}
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <FormattedMessage id="form.client.label" />
                  <em className={styles.optional}>
                    <FormattedMessage id="form.optional" />
                    <Tooltip title={<FormattedMessage id="form.client.label.tooltip" />}>
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('client')(
                <Input placeholder={formatMessage({ id: 'form.client.placeholder' })} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <FormattedMessage id="form.invites.label" />
                  <em className={styles.optional}>
                    <FormattedMessage id="form.optional" />
                  </em>
                </span>
              }
            >
              {getFieldDecorator('invites')(
                <Input placeholder={formatMessage({ id: 'form.invites.placeholder' })} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <FormattedMessage id="form.weight.label" />
                  <em className={styles.optional}>
                    <FormattedMessage id="form.optional" />
                  </em>
                </span>
              }
            >
              {getFieldDecorator('weight')(
                <InputNumber
                  placeholder={formatMessage({ id: 'form.weight.placeholder' })}
                  min={0}
                  max={100}
                />
              )}
              <span className="ant-form-text">%</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form.public.label" />}
              help={<FormattedMessage id="form.public.label.help" />}
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">
                      <FormattedMessage id="form.public.radio.public" />
                    </Radio>
                    <Radio value="2">
                      <FormattedMessage id="form.public.radio.partially-public" />
                    </Radio>
                    <Radio value="3">
                      <FormattedMessage id="form.public.radio.private" />
                    </Radio>
                  </Radio.Group>
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('publicUsers')(
                    <Select
                      mode="multiple"
                      placeholder={formatMessage({ id: 'form.publicUsers.placeholder' })}
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('public') === '2' ? 'block' : 'none',
                      }}
                    >
                      <Option value="1">
                        <FormattedMessage id="form.publicUsers.option.A" />
                      </Option>
                      <Option value="2">
                        <FormattedMessage id="form.publicUsers.option.B" />
                      </Option>
                      <Option value="3">
                        <FormattedMessage id="form.publicUsers.option.C" />
                      </Option>
                    </Select>
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
              <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
