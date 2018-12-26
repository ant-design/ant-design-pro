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
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'apiCreate/saveStepFormData',
            payload: values,
          });
          router.push('/apiGateway/apiCreate/consumer');
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="分组">
            {getFieldDecorator('groupId', {
              initialValue: data.groupId,
              rules: [{ required: true, message: '请选择分组' }],
            })(
              <Select placeholder="语音识别">
                <Option value="0">语音识别</Option>
                <Option value="1">OCR识别</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Api名称">
            {getFieldDecorator('apiName', {
              initialValue: data.apiName,
              rules: [{ required: true, message: '请输入Api名称' }],
            })(<Input placeholder="请输入Api名称" />)}
          </Form.Item>
          <Form.Item
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
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>配置说明</h4>
          <p>第一步配置基础信息，第二步配置请求信息，第三步配置后端服务信息。</p>
        </div>
      </Fragment>
    );
  }
}

export default Step1;
