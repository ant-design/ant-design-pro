import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ apiCreate }) => ({
  data: apiCreate.step,
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
            type: 'apiCreate/saveStepFormData',
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
              initialValue: data.consumerServiceType,
              rules: [{ required: true, message: '请选择服务类型' }],
            })(
              <Select placeholder="REST">
                <Option value="1">REST</Option>
                <Option value="2">WebService</Option>
                <Option value="3">HTTP</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="请求PATH">
            {getFieldDecorator('consumerPath', {
              initialValue: data.consumerPath,
              rules: [{ required: true, message: '请输入请求PATH' }],
            })(<Input placeholder="请输入请求PATH" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="协议">
            {getFieldDecorator('consumerProtocol', {
              initialValue: data.consumerProtocol,
              rules: [{ required: true, message: '请选择协议' }],
            })(
              <Select placeholder="HTTP">
                <Option value="0">HTTP</Option>
                <Option value="1">HTTPS</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="HTTP Method">
            {getFieldDecorator('consumerMethod', {
              initialValue: data.consumerMethod,
              rules: [{ required: true, message: '请选择HTTP Method' }],
            })(
              <Select placeholder="POST">
                <Option value="0">GET</Option>
                <Option value="1">POST</Option>
              </Select>
            )}
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
            <Button onClick={onPrev} style={{ marginLeft: 8 }}>
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
