import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import { getPayload } from './util';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ apiCreate, loading }) => ({
  submitting: loading.effects['apiCreate/submitStepForm'],
  data: apiCreate.step,
}))
@Form.create()
class Step3 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push('/apiGateway/apiCreate/consumer');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        const apiInfo = getPayload({
          ...data,
          ...values,
        });
        console.log('create api commit:', apiInfo);
        if (!err) {
          dispatch({
            type: 'apiCreate/submitStepForm',
            payload: apiInfo,
          });
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="api名称：">
          {data.apiName}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="请求PATH：">
          {data.consumerPath}
        </Form.Item>
        <Divider style={{ margin: '24px 0' }} />
        <Form.Item {...formItemLayout} label="后端服务类型">
          {getFieldDecorator('producerServiceType', {
            initialValue: data.producerServiceType,
            rules: [{ required: true, message: '请选择后端服务类型' }],
          })(
            <Select placeholder="REST">
              <Option value="1">REST</Option>
              <Option value="2">WebService</Option>
              <Option value="3">HTTP</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="后端请求地址">
          {getFieldDecorator('producerUrl', {
            initialValue: data.producerUrl,
            rules: [{ required: true, message: '请输入后端请求地址' }],
          })(<Input placeholder="请输入后端请求地址" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="后端请求path">
          {getFieldDecorator('producerPath', {
            initialValue: data.producerPath,
            rules: [{ required: true, message: '请输入后端请求path' }],
          })(<Input placeholder="请输入后端请求path" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="后端协议">
          {getFieldDecorator('producerProtocol', {
            initialValue: data.producerProtocol,
            rules: [{ required: true, message: '请选择后端协议' }],
          })(
            <Select placeholder="HTTP">
              <Option value="0">HTTP</Option>
              <Option value="1">HTTPS</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="后端服务连接超时">
          {getFieldDecorator('producerConnectTimeout', {
            initialValue: data.producerConnectTimeout,
            rules: [{ required: true, message: '后端服务连接超时' }],
          })(<Input placeholder="请输入后端服务连接超时（ms）" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="后端服务请求超时">
          {getFieldDecorator('producerSocketTimeout', {
            initialValue: data.producerSocketTimeout,
            rules: [{ required: true, message: '后端服务请求超时' }],
          })(<Input placeholder="请输入后端服务请求超时（ms）" />)}
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Step3;
