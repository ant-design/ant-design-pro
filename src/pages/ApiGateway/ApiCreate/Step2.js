import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import SelectView from '../SelectView';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ apiCreateModel }) => ({
  data: apiCreateModel.step,
}))
@Form.create()
class Step2 extends React.PureComponent {
  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { data, form } = this.props;
    console.log('data:', data);
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = data[key] || null;
      console.log('key:', key, 'currentUser key:', data[key], obj);
      form.setFieldsValue(obj);
    });
  };

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
            payload: values,
          });
          router.push('/apiGateway/apiCreate/producer');
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="服务类型">
            {getFieldDecorator('consumerServiceType', {
              rules: [{ required: true, message: '请选择服务类型' }],
            })(<SelectView javaCode="apiService" javaKey="service_type" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="请求PATH">
            {getFieldDecorator('consumerPath', {
              initialValue: data.consumerPath,
              rules: [{ required: true, message: '请输入请求PATH' }],
            })(<Input placeholder="请输入请求PATH" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="协议">
            {getFieldDecorator('consumerProtocol', {
              rules: [{ required: true, message: '请选择协议' }],
            })(<SelectView javaCode="apiService" javaKey="protocol" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="HTTP Method">
            {getFieldDecorator('consumerMethod', {
              initialValue: data.consumerMethod,
              rules: [{ required: true, message: '请选择HTTP Method' }],
            })(<SelectView javaCode="common" javaKey="req_mothod" />)}
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
            <Button type="primary" onClick={onValidateForm} htmlType="submit">
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
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Step2;
