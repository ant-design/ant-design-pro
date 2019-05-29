import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import SelectView from '../SelectView';
import RadioView from '../RadioView';



const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

@connect(({ apiCreateModel }) => ({
  data: apiCreateModel.apiService,
}))
@Form.create()
class Step2 extends React.PureComponent {

  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push('/apiGateway/apiCreate/info');
    };
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'apiCreateModel/saveStepFormData',
            payload: {...values},
            stepType:1,
          });
          router.push('/apiGateway/apiCreate/producer');
        }
      });
    };
    // // console.log("step2 data:",data);
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="服务类型">
            {getFieldDecorator('serviceType', {
              initialValue: data.serviceType,
              rules: [{ required: true, message: '请选择服务类型' }],
            })(<RadioView javaCode="apiService" javaKey="service_type" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="请求PATH">
            {getFieldDecorator('requestUrl', {
              initialValue: data.requestUrl,
              rules: [{ required: true, message: '请输入请求PATH' }],
            })(<Input placeholder="请输入请求PATH" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="协议类型">
            {getFieldDecorator('protocol', {
              initialValue: data.protocol,
              rules: [{ required: true, message: '请选择协议' }],
            })(<RadioView javaCode="apiService" javaKey="protocol" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="请求类型">
            {getFieldDecorator('reqMethod', {
              initialValue: data.reqMethod,
              rules: [{ required: true, message: '请选择HTTP Method' }],
            })(<SelectView javaCode="common" javaKey="req_method" />)}
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
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
            <Button onClick={onPrev} style={{ marginLeft: 8 }} htmlType="button">
              上一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>路径</h4>
          <p>
            这个步骤主要是设置对外暴露的路径,外部系统调用的时候需要路径加配合授权的app key进行调用。
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Step2;
