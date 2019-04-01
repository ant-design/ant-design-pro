import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import { getPayload } from './util';
import SelectView from '../SelectView';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ apiCreateModel, loading }) => ({
  submitting: loading.effects['apiCreateModel/submitStepForm'],
  apiService: apiCreateModel.apiService,
}))
@Form.create()
class Step3 extends React.PureComponent {


  render() {
    const { form, apiService, dispatch, submitting } = this.props;
    console.log("apiService.apiServiceBackends:",apiService.apiServiceBackends);
    const data = apiService.apiServiceBackends?apiService.apiServiceBackends[0]:[{}];
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push('/apiGateway/apiCreate/consumer');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        const apiServiceBackend={...data, ...values,};
        const apiServiceBackends=[apiServiceBackend];
        apiService.apiServiceBackends=apiServiceBackends;
        console.log(apiService);
        const apiInfo = getPayload(1,apiService,apiServiceBackends);
        if (!err) {
          dispatch({
            type: 'apiCreateModel/submitStepForm',
            payload: apiInfo,
          });
        }
      });
    };
    // console.log("step3 data:",data);
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="api名称：">
          {apiService.name}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="请求PATH：">
          {apiService.requestUrl}
        </Form.Item>
        <Divider style={{ margin: '24px 0' }} />
        <Form.Item {...formItemLayout} label="后端服务类型">
          {getFieldDecorator('serviceType', {
            initialValue: data.serviceType,
            rules: [{ required: true, message: '请选择后端服务类型' }],
          })(<SelectView javaCode="apiService" javaKey="service_type" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="后端请求地址">
          {getFieldDecorator('url', {
            initialValue: data.url,
            rules: [{ required: true, message: '请输入后端请求地址' }],
          })(<Input placeholder="请输入后端请求地址" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="后端协议">
          {getFieldDecorator('protocol', {
            initialValue: data.protocol,
            rules: [{ required: true, message: '请选择后端协议' }],
          })(<SelectView javaCode="apiService" javaKey="protocol" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="后端服务连接超时">
          {getFieldDecorator('connectTimeout', {
            initialValue: data.connectTimeout,
            rules: [{ required: true, message: '后端服务连接超时' }],
          })(<Input placeholder="请输入后端服务连接超时（ms）" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="后端服务请求超时">
          {getFieldDecorator('socketTimeout', {
            initialValue: data.socketTimeout,
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
          <Button type="primary" onClick={onValidateForm} loading={submitting} htmlType="submit">
            提交
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }} htmlType="button">
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Step3;
